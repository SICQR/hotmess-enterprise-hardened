export interface AffiliateStats {
  userId: string
  username: string
  tier: 'iron' | 'bronze' | 'silver' | 'gold'
  totalScans: number
  totalClicks: number
  totalConversions: number
  totalRevenue: number
  rank: number
}

export interface ScanEvent {
  shortlink: string
  destination: string
  timestamp: string
  userAgent?: string
  affiliateId?: string
}

const MOCK_LEADERBOARD: AffiliateStats[] = [
  {
    userId: '1',
    username: 'alpha_wolf',
    tier: 'gold',
    totalScans: 1247,
    totalClicks: 989,
    totalConversions: 247,
    totalRevenue: 12450,
    rank: 1
  },
  {
    userId: '2',
    username: 'street_king',
    tier: 'silver',
    totalScans: 876,
    totalClicks: 654,
    totalConversions: 156,
    totalRevenue: 7800,
    rank: 2
  },
  {
    userId: '3',
    username: 'night_rider',
    tier: 'bronze',
    totalScans: 534,
    totalClicks: 398,
    totalConversions: 89,
    totalRevenue: 4450,
    rank: 3
  },
  {
    userId: '4',
    username: 'urban_legend',
    tier: 'iron',
    totalScans: 234,
    totalClicks: 167,
    totalConversions: 34,
    totalRevenue: 1700,
    rank: 4
  },
  {
    userId: '5',
    username: 'shadow_runner',
    tier: 'bronze',
    totalScans: 445,
    totalClicks: 312,
    totalConversions: 67,
    totalRevenue: 3350,
    rank: 5
  }
]

export async function getLeaderboard(): Promise<AffiliateStats[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return MOCK_LEADERBOARD
}

export async function getUserStats(userId: string): Promise<AffiliateStats | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return MOCK_LEADERBOARD.find(u => u.userId === userId) || null
}

export async function trackScan(event: ScanEvent): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 100))
  console.log('[Analytics] Scan tracked:', event)
}

export function getTierColor(tier: AffiliateStats['tier']): string {
  switch (tier) {
    case 'gold':
      return 'text-gold'
    case 'silver':
      return 'text-gray-300'
    case 'bronze':
      return 'text-orange-400'
    case 'iron':
      return 'text-gray-500'
  }
}

export function getTierIcon(tier: AffiliateStats['tier']): string {
  switch (tier) {
    case 'gold':
      return '👑'
    case 'silver':
      return '⚡'
    case 'bronze':
      return '🔥'
    case 'iron':
      return '⚙️'
  }
}
