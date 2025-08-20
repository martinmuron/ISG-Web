import { NextRequest, NextResponse } from 'next/server';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoUrl: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId');

  if (!channelId) {
    return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
  }

  try {
    let actualChannelId = channelId;
    
    // If it's a handle (starts with @), we need to resolve it to a channel ID
    if (channelId.startsWith('@')) {
      actualChannelId = await resolveChannelHandle(channelId);
    }
    
    console.log(`Original channelId: ${channelId}, resolved: ${actualChannelId}`);
    
    // Try multiple RSS feed URLs - different formats for different channel types
    const cleanId = actualChannelId.replace('@', '');
    const rssUrls = [
      `https://www.youtube.com/feeds/videos.xml?channel_id=${actualChannelId}`,
      `https://www.youtube.com/feeds/videos.xml?user=${cleanId}`,
      // Try with @handle format for newer YouTube channels
      `https://www.youtube.com/feeds/videos.xml?channel_id=@${cleanId}`,
    ];
    
    let rssText = '';
    let lastError = null;
    
    for (const rssUrl of rssUrls) {
      try {
        console.log(`Trying RSS URL: ${rssUrl}`);
        
        // Use a CORS proxy to fetch the RSS feed
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(proxyUrl, {
          next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (response.ok) {
          rssText = await response.text();
          console.log(`Successfully fetched RSS (${rssText.length} chars)`);
          break;
        } else {
          console.log(`RSS URL failed with status: ${response.status}`);
          lastError = new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.log(`RSS URL failed with error:`, error);
        lastError = error;
      }
    }
    
    if (!rssText) {
      throw lastError || new Error('All RSS feed URLs failed');
    }
    
    // Log a snippet of the RSS for debugging
    console.log('RSS snippet:', rssText.substring(0, 500));
    
    // Parse the RSS XML to extract video information
    const videos = parseYouTubeRSS(rssText);
    
    console.log(`Parsed ${videos.length} videos`);

    return NextResponse.json({
      videos: videos.slice(0, 6), // Return only the latest 6 videos
      lastUpdated: new Date().toISOString(),
      debug: {
        channelId: actualChannelId,
        rssLength: rssText.length,
        videosFound: videos.length
      }
    });

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch videos',
        details: error instanceof Error ? error.message : 'Unknown error',
        channelId: channelId
      },
      { status: 500 }
    );
  }
}

async function resolveChannelHandle(handle: string): Promise<string> {
  // For @czechrealestate, we'll use a known working approach
  // Try multiple methods to get the channel ID
  
  const cleanHandle = handle.replace('@', '');
  
  // Method 1: Try to resolve via a different approach
  try {
    // Use YouTube's oEmbed API to get channel info
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/@${cleanHandle}&format=json`;
    const oembedResponse = await fetch(oembedUrl);
    
    if (oembedResponse.ok) {
      const oembedData = await oembedResponse.json();
      console.log('oEmbed data:', oembedData);
      
      // Extract channel ID from author_url if available
      if (oembedData.author_url) {
        const channelMatch = oembedData.author_url.match(/\/channel\/([^/?]+)/);
        if (channelMatch) {
          console.log('Found channel ID via oEmbed:', channelMatch[1]);
          return channelMatch[1];
        }
      }
    }
  } catch (error) {
    console.log('oEmbed method failed:', error);
  }
  
  // Method 2: For czechrealestate specifically, let's try the handle in RSS directly
  // Some channels support handle-based RSS feeds
  console.log(`Trying handle directly: ${handle}`);
  return handle;
}

function parseYouTubeRSS(rssText: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  
  console.log('Starting RSS parsing...');
  
  // Check if this is a valid RSS feed
  if (!rssText.includes('<feed') && !rssText.includes('<rss')) {
    console.error('Not a valid RSS/Atom feed');
    return videos;
  }
  
  // Simple XML parsing - extract entry elements (Atom format) or item elements (RSS format)
  let entries = rssText.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  
  if (entries.length === 0) {
    // Try RSS format instead of Atom
    entries = rssText.match(/<item>[\s\S]*?<\/item>/g) || [];
    console.log(`Found ${entries.length} RSS items`);
  } else {
    console.log(`Found ${entries.length} Atom entries`);
  }
  
  entries.forEach((entry, index) => {
    try {
      // Extract video ID from multiple possible link formats
      let videoId = '';
      
      // Try Atom format first
      let linkMatch = entry.match(/<link\s+href="https:\/\/www\.youtube\.com\/watch\?v=([^"&]+)"/);
      if (!linkMatch) {
        // Try RSS format
        linkMatch = entry.match(/<link>https:\/\/www\.youtube\.com\/watch\?v=([^<&]+)<\/link>/);
      }
      if (!linkMatch) {
        // Try yt:videoId format
        linkMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      }
      
      videoId = linkMatch ? linkMatch[1] : '';
      
      // Extract title - handle CDATA
      const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
      let title = titleMatch ? titleMatch[1] : '';
      title = title.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim();
      
      // Extract description - handle CDATA
      let descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
      if (!descMatch) {
        descMatch = entry.match(/<description>([\s\S]*?)<\/description>/);
      }
      let description = descMatch ? descMatch[1] : '';
      description = description.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim();
      
      // Extract published date
      let pubMatch = entry.match(/<published>(.*?)<\/published>/);
      if (!pubMatch) {
        pubMatch = entry.match(/<pubDate>(.*?)<\/pubDate>/);
      }
      const publishedAt = pubMatch ? pubMatch[1] : new Date().toISOString();
      
      // Extract thumbnail - try multiple formats
      const thumbMatch = entry.match(/<media:thumbnail\s+url="([^"]+)"/);
      const thumbnail = thumbMatch ? thumbMatch[1] : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      console.log(`Entry ${index}: videoId=${videoId}, title="${title.substring(0, 50)}..."`);
      
      if (videoId && title) {
        videos.push({
          id: videoId,
          title: title,
          description: description,
          thumbnail,
          publishedAt,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        });
      }
    } catch (error) {
      console.error(`Error parsing entry ${index}:`, error);
    }
  });
  
  console.log(`Successfully parsed ${videos.length} videos`);
  return videos;
}