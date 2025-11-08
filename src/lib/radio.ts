/**
 * Functions to interact with our radio providers. The primary source
 * is RadioKing; if that fails or returns an error we fallback to
 * AzuraCast. Both API URLs are configured via environment variables.
 */

interface Track {
  title: string
  artist: string
  cover?: string | null
}

const radioKingBase = import.meta.env.VITE_RADIOKING_BASE || 'https://api.radioking.io'
const radioKingSlug = import.meta.env.VITE_RADIOKING_SLUG
const azuraBase = import.meta.env.VITE_AZURACAST_API_BASE
const azuraKey = import.meta.env.VITE_AZURACAST_API_KEY

/**
 * Fetch the current track information from RadioKing. Returns null if
 * the request fails or if required environment variables are missing.
 */
async function fetchFromRadioKing(): Promise<Track | null> {
  if (!radioKingSlug) return null
  const url = `${radioKingBase}/widget/radio/${radioKingSlug}/track/current?format=json`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return {
      title: data.title as string,
      artist: data.artist as string,
      cover: data.cover,
    }
  } catch {
    return null
  }
}

/**
 * Fetch the current track from AzuraCast. Requires API base and key.
 */
async function fetchFromAzuraCast(): Promise<Track | null> {
  if (!azuraBase || !azuraKey) return null
  try {
    const res = await fetch(`${azuraBase}/nowplaying`, {
      headers: { 'X-API-Key': azuraKey },
    })
    if (!res.ok) return null
    const data = await res.json()
    const now = data.now_playing || data.current || {}
    return {
      title: now.song?.title || '',
      artist: now.song?.artist || '',
      cover: now.song?.art || null,
    }
  } catch {
    return null
  }
}

export async function getCurrentTrack(): Promise<Track | null> {
  const king = await fetchFromRadioKing()
  if (king) return king
  return await fetchFromAzuraCast()
}

// Additional exports for compatibility with other components
export type NowPlaying = Track
export type Show = { title: string; time: string; host?: string }

export const getNowPlaying = getCurrentTrack
export async function getSchedule(): Promise<Show[]> {
  return []
}

export const STREAM_URL = 'https://mock.stream.url'
export const FALLBACK_STREAMS = [STREAM_URL]
