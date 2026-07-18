import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
}

/** Extract og:image URL from raw HTML */
function extractOgImage(html: string, baseUrl: string): string | null {
  // og:image
  const ogMatch = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  ) ?? html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
  )
  if (ogMatch?.[1]) return resolveUrl(ogMatch[1], baseUrl)

  // twitter:image fallback
  const twMatch = html.match(
    /<meta[^>]+(?:name|property)=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
  ) ?? html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']twitter:image["']/i
  )
  if (twMatch?.[1]) return resolveUrl(twMatch[1], baseUrl)

  return null
}

function resolveUrl(src: string, base: string): string {
  if (src.startsWith('http')) return src
  try { return new URL(src, base).href } catch { return src }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const pageUrl = searchParams.get('url')

  if (!pageUrl) {
    return new NextResponse('Missing url param', { status: 400 })
  }

  try {
    // 1. Fetch the news article page
    const pageRes = await fetch(pageUrl, {
      headers: BROWSER_HEADERS,
      redirect: 'follow',
    })

    if (!pageRes.ok) {
      return new NextResponse(`Page fetch failed: ${pageRes.status}`, { status: 502 })
    }

    // Only read the first 50 KB — og:image is always in <head>
    const reader = pageRes.body?.getReader()
    let html = ''
    if (reader) {
      let bytes = 0
      while (bytes < 50_000) {
        const { done, value } = await reader.read()
        if (done) break
        html += new TextDecoder().decode(value)
        bytes += value?.length ?? 0
      }
      reader.cancel()
    }

    const imageUrl = extractOgImage(html, pageUrl)

    if (!imageUrl) {
      return new NextResponse('No og:image found', { status: 404 })
    }

    // 2. Proxy the actual image
    const imgRes = await fetch(imageUrl, {
      headers: {
        ...BROWSER_HEADERS,
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: new URL(pageUrl).origin,
      },
    })

    if (!imgRes.ok) {
      return new NextResponse(`Image fetch failed: ${imgRes.status}`, { status: 502 })
    }

    const contentType = imgRes.headers.get('content-type') ?? 'image/jpeg'
    const body = await imgRes.arrayBuffer()

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache aggressively — news images don't change
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    })
  } catch (err) {
    console.error('[og-image]', err)
    return new NextResponse('Proxy error', { status: 502 })
  }
}
