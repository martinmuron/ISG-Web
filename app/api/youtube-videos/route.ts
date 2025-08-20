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
    
    // Using YouTube RSS feed - no API key required
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${actualChannelId}`;
    
    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const rssText = await response.text();
    
    // Parse the RSS XML to extract video information
    const videos = parseYouTubeRSS(rssText);

    return NextResponse.json({
      videos: videos.slice(0, 6), // Return only the latest 6 videos
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

async function resolveChannelHandle(handle: string): Promise<string> {
  try {
    // Remove @ if present
    const cleanHandle = handle.replace('@', '');
    
    // Try to fetch the channel page to extract the channel ID
    const channelUrl = `https://www.youtube.com/@${cleanHandle}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(channelUrl)}`;
    
    const response = await fetch(proxyUrl);
    const html = await response.text();
    
    // Look for channel ID in the HTML
    const channelIdMatch = html.match(/["']channelId["']:\s*["']([^"']+)["']/);
    if (channelIdMatch) {
      return channelIdMatch[1];
    }
    
    // Alternative patterns
    const externalIdMatch = html.match(/["']externalId["']:\s*["']([^"']+)["']/);
    if (externalIdMatch) {
      return externalIdMatch[1];
    }
    
    // If we can't resolve it, try using the handle directly
    console.warn(`Could not resolve channel ID for handle: ${handle}`);
    return handle;
    
  } catch (error) {
    console.error(`Error resolving channel handle ${handle}:`, error);
    return handle; // Fall back to using the handle as-is
  }
}

function parseYouTubeRSS(rssText: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  
  // Simple XML parsing - extract entry elements
  const entries = rssText.match(/<entry>(.*?)<\/entry>/gs) || [];
  
  entries.forEach((entry, index) => {
    try {
      // Extract video ID from link
      const linkMatch = entry.match(/<link\s+href="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)"/);
      const videoId = linkMatch ? linkMatch[1] : '';
      
      // Extract title
      const titleMatch = entry.match(/<title>(.*?)<\/title>/s);
      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1') : '';
      
      // Extract description
      const descMatch = entry.match(/<media:description>(.*?)<\/media:description>/s);
      const description = descMatch ? descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1') : '';
      
      // Extract published date
      const pubMatch = entry.match(/<published>(.*?)<\/published>/);
      const publishedAt = pubMatch ? pubMatch[1] : new Date().toISOString();
      
      // Extract thumbnail
      const thumbMatch = entry.match(/<media:thumbnail\s+url="([^"]+)"/);
      const thumbnail = thumbMatch ? thumbMatch[1] : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      if (videoId && title) {
        videos.push({
          id: videoId,
          title: title.trim(),
          description: description.trim(),
          thumbnail,
          publishedAt,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        });
      }
    } catch (error) {
      console.error(`Error parsing entry ${index}:`, error);
    }
  });
  
  return videos;
}