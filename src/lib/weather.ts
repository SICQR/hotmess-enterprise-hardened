/**
 * Weather helper fetches temperature and conditions using the Open‑Meteo
 * API. The base URL can be overridden via VITE_WEATHER_API_BASE.
 *
 * Usage: call getCurrentWeather with latitude and longitude. Returns
 * temperature and description.
 */

const base = import.meta.env.VITE_WEATHER_API_BASE || 'https://api.open-meteo.com'

export interface Weather {
  temperature: number
  description: string
}

export async function getCurrentWeather(lat: number, lon: number): Promise<Weather | null> {
  try {
    const url = `${base}/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    const temp = data.current_weather?.temperature
    // description is not included in open-meteo; derive simple descriptor
    const code = data.current_weather?.weathercode
    const desc = codeToDescription(code)
    return { temperature: temp, description: desc }
  } catch {
    return null
  }
}

function codeToDescription(code: number): string {
  const mapping: Record<number, string> = {
    0: 'Clear',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    51: 'Drizzle',
    61: 'Rain',
    71: 'Snow',
    80: 'Rain showers',
    95: 'Thunderstorm',
  }
  return mapping[code] || 'Unknown'
}