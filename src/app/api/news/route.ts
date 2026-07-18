import { NextResponse } from 'next/server'

export const runtime = 'edge'

interface NewsItem {
  id: string
  timestamp: string
  relativeTime: string
  headline: string
  description: string
  source: string
  sourceUrl: string
  sourceType: 'print' | 'wire' | 'social' | 'stream'
  severity: 'breaking' | 'high' | 'medium' | 'origin'
  isNew?: boolean
}

// Full pool of news items — rotated in based on time
const newsPool: NewsItem[] = [
  {
    id: 'ink-attack',
    timestamp: 'July 18, 2026 · 3:00 PM',
    relativeTime: 'just now',
    headline: 'Security Breach: Ink-like Liquid Hurled at CJP Founder During Address',
    description:
      'An unidentified woman forced through the security cordon at Jantar Mantar and hurled an ink-like liquid at CJP founder Abhijeet Dipke mid-speech. Delhi Police have detained the individual. Dipke resumed his address minutes later.',
    source: 'The Hindu',
    sourceUrl: 'https://www.thehindu.com',
    sourceType: 'print',
    severity: 'breaking',
  },
  {
    id: 'hunger-strike',
    timestamp: 'July 18, 2026 · 12:45 PM',
    relativeTime: '2h ago',
    headline: 'Dipke Announces Indefinite Hunger Strike from Protest Stage',
    description:
      'Following the early morning police crackdown, CJP founder Abhijeet Dipke officially declared an indefinite hunger strike from the main stage at Jantar Mantar, citing the forced hospitalization of Sonam Wangchuk.',
    source: 'X / Live Stream',
    sourceUrl: 'https://x.com',
    sourceType: 'stream',
    severity: 'high',
  },
  {
    id: 'crowd-swells',
    timestamp: 'July 18, 2026 · 4:15 PM',
    relativeTime: 'just now',
    headline: 'Crowd at Jantar Mantar Swells to 15,000 After Ink Attack — Police Reinforce Barricades',
    description:
      'Following news of the ink attack on Dipke, solidarity gatherings across Delhi have converged on Jantar Mantar. Police have erected additional barricades. No clashes reported yet.',
    source: 'NDTV',
    sourceUrl: 'https://www.ndtv.com',
    sourceType: 'wire',
    severity: 'breaking',
  },
  {
    id: 'minister-response',
    timestamp: 'July 18, 2026 · 3:45 PM',
    relativeTime: '32m ago',
    headline: 'Education Ministry Spokesperson Calls for "Calm and Dialogue"',
    description:
      'A Ministry of Education spokesperson issued a brief statement calling the protest "unfortunate" and urging "all stakeholders to maintain calm and engage in constructive dialogue." No concrete commitments made.',
    source: 'PTI',
    sourceUrl: 'https://www.ptinews.com',
    sourceType: 'wire',
    severity: 'medium',
  },
  {
    id: 'wangchuk-detained',
    timestamp: 'July 18, 2026 · 6:00 AM',
    relativeTime: '9h ago',
    headline: 'Delhi Police Forcibly Remove Sonam Wangchuk After 21-Day Fast',
    description:
      'In a pre-dawn operation, Delhi Police forcibly removed Ladakhi activist Sonam Wangchuk, who had been on a fast-unto-death for 21 days, and transported him to Safdarjung Hospital against his will.',
    source: 'AP News',
    sourceUrl: 'https://apnews.com',
    sourceType: 'wire',
    severity: 'high',
  },
  {
    id: 'medics-deployed',
    timestamp: 'July 18, 2026 · 4:50 PM',
    relativeTime: 'just now',
    headline: 'Volunteer Medical Team Sets Up Emergency Station at Protest Site',
    description:
      'Doctors For Democracy, a volunteer collective, has deployed a 12-member emergency medical team at Jantar Mantar amid concerns about hunger strikers and heat exhaustion among protesters.',
    source: 'The Wire',
    sourceUrl: 'https://thewire.in',
    sourceType: 'print',
    severity: 'medium',
  },
  {
    id: 'opposition-support',
    timestamp: 'July 18, 2026 · 5:10 PM',
    relativeTime: 'just now',
    headline: 'Three Opposition MPs Arrive at Jantar Mantar in Show of Solidarity',
    description:
      'MPs from the INDIA bloc arrived at the protest site and met with CJP leadership, demanding a floor discussion in Parliament on the NEET 2026 crisis. A press briefing is expected at 6:00 PM.',
    source: 'Hindustan Times',
    sourceUrl: 'https://www.hindustantimes.com',
    sourceType: 'print',
    severity: 'high',
  },
  {
    id: 'first-mobilization',
    timestamp: 'June 6, 2026 · Origin',
    relativeTime: '42 days ago',
    headline: 'Thousands Gather for First Major Mobilization at Jantar Mantar',
    description:
      'Following the CJI\'s controversial remarks describing student protesters as "cockroaches," thousands gathered for the first major mobilization at Jantar Mantar, marking the birth of the CJP movement.',
    source: 'BBC News',
    sourceUrl: 'https://www.bbc.com/news',
    sourceType: 'print',
    severity: 'origin',
  },
]

// Returns a rotating "live" slice based on current minute
// Simulates new items appearing over time
export async function GET() {
  const now = new Date()
  const minute = now.getMinutes()

  // Rotate a "breaking" item every 2 minutes to simulate live updates
  const rotatingIndex = Math.floor(minute / 2) % 3
  const breakingIds = ['crowd-swells', 'opposition-support', 'medics-deployed']
  const currentBreaking = newsPool.find((n) => n.id === breakingIds[rotatingIndex])!

  // Build live feed: always show current breaking first, then fixed items
  const feed: NewsItem[] = [
    { ...currentBreaking, relativeTime: 'just now', isNew: true },
    newsPool.find((n) => n.id === 'ink-attack')!,
    newsPool.find((n) => n.id === 'minister-response')!,
    newsPool.find((n) => n.id === 'hunger-strike')!,
    newsPool.find((n) => n.id === 'wangchuk-detained')!,
    newsPool.find((n) => n.id === 'first-mobilization')!,
  ]

  return NextResponse.json({
    updatedAt: now.toISOString(),
    items: feed,
  })
}
