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
    
    // Try direct fetch first (works in server-side environment)
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${actualChannelId}`;
    
    let rssText = '';
    let lastError = null;
    
    try {
      console.log(`Trying direct fetch: ${rssUrl}`);
      
      const response = await fetch(rssUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ISG Real Estate Bot/1.0)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        }
      });

      if (response.ok) {
        rssText = await response.text();
        console.log(`Successfully fetched RSS directly (${rssText.length} chars)`);
      } else {
        console.log(`Direct fetch failed with status: ${response.status}`);
        lastError = new Error(`HTTP ${response.status} direct fetch`);
      }
    } catch (error) {
      console.log(`Direct fetch failed with error:`, error);
      lastError = error;
    }
    
    // If direct fetch fails, try CORS proxy as backup
    if (!rssText) {
      try {
        console.log(`Trying CORS proxy fallback`);
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(proxyUrl, {
          next: { revalidate: 300 },
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
          }
        });

        if (response.ok) {
          rssText = await response.text();
          console.log(`Successfully fetched RSS via proxy (${rssText.length} chars)`);
        } else {
          console.log(`Proxy failed with status: ${response.status}`);
          lastError = new Error(`HTTP ${response.status} from proxy`);
        }
      } catch (error) {
        console.log(`Proxy failed with error:`, error);
        lastError = error;
      }
    }
    
    if (!rssText) {
      console.error('All proxies failed, using fallback videos');
      // Fallback to static video data if RSS fails
      const fallbackVideos = getFallbackVideos();
      return NextResponse.json({
        videos: fallbackVideos,
        lastUpdated: new Date().toISOString(),
        debug: {
          channelId: actualChannelId,
          fallback: true,
          error: (lastError instanceof Error ? lastError.message : String(lastError)) || 'All proxies failed'
        }
      });
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

function getFallbackVideos(): YouTubeVideo[] {
  // Fallback videos from Czech Real Estate channel in case RSS fails
  return [
    {
      id: "sample1",
      title: "June 2025 Czech Real Estate Market Review | ISG | Czech Real Estate",
      description: "Latest market analysis and trends in Czech real estate market",
      thumbnail: "https://img.youtube.com/vi/sample1/hqdefault.jpg",
      publishedAt: "2025-06-08T00:00:00Z",
      videoUrl: "https://www.youtube.com/@czechrealestate"
    },
    {
      id: "sample2", 
      title: "Buyer's Guide to Czech Real Estate | Tips & Insights",
      description: "Essential guide for property buyers in the Czech Republic",
      thumbnail: "https://img.youtube.com/vi/sample2/hqdefault.jpg",
      publishedAt: "2025-05-15T00:00:00Z",
      videoUrl: "https://www.youtube.com/@czechrealestate"
    },
    {
      id: "sample3",
      title: "Prague Property Investment Opportunities 2025",
      description: "Explore the best investment opportunities in Prague real estate",
      thumbnail: "https://img.youtube.com/vi/sample3/hqdefault.jpg", 
      publishedAt: "2025-04-22T00:00:00Z",
      videoUrl: "https://www.youtube.com/@czechrealestate"
    }
  ];
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
      
      // Extract thumbnail - use standard YouTube thumbnail URL format
      const thumbMatch = entry.match(/<media:thumbnail\s+url="([^"]+)"/);
      let thumbnail = thumbMatch ? thumbMatch[1] : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      // Ensure we use the high quality thumbnail format
      if (videoId) {
        thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
      
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