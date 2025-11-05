const rateLimits = new Map<string, number[]>()

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now()
  const timestamps = rateLimits.get(key) || []
  
  const validTimestamps = timestamps.filter(t => now - t < windowMs)
  
  if (validTimestamps.length >= maxRequests) {
    return false
  }
  
  validTimestamps.push(now)
  rateLimits.set(key, validTimestamps)
  return true
}

export function clearRateLimit(key: string): void {
  rateLimits.delete(key)
}

export function getRateLimitStatus(key: string, maxRequests: number, windowMs: number): {
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const timestamps = rateLimits.get(key) || []
  const validTimestamps = timestamps.filter(t => now - t < windowMs)
  
  const remaining = Math.max(0, maxRequests - validTimestamps.length)
  const resetAt = validTimestamps.length > 0 
    ? validTimestamps[0] + windowMs 
    : now
  
  return { remaining, resetAt }
}
