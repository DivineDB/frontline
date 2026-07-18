export type ProtestStatus = 'CRITICAL' | 'ACTIVE' | 'UPCOMING'

export interface ProtestData {
  id: string
  title: string
  location: string
  state: string
  status: ProtestStatus
  daysActive: number
  focus: string
  description: string
  participants: string
  upcomingDate?: string
  demands: string[]
  keyFigures: { name: string; role: string }[]
  updates: { time: string; text: string }[]
  helplineOrContact?: string
  mapArea?: string
  background: string
  /** Direct URL used as the card image (routed through /api/og-image proxy) */
  imageUrl: string
  /** The real news article this image is sourced from */
  sourceArticleUrl: string
  /** The news outlet name for attribution */
  sourceOutlet: string
}

export const protests: ProtestData[] = [
  {
    id: 'cjp-jantar-mantar',
    title: 'CJP Jantar Mantar Protest',
    location: 'Jantar Mantar, New Delhi',
    state: 'Delhi',
    status: 'CRITICAL',
    daysActive: 43,
    focus: 'NEET 2026 Leaks & Youth Unemployment',
    description:
      "The Cockroach Janta Party (CJP) has mobilized thousands at Jantar Mantar demanding accountability over NEET 2026 paper leaks and a systemic crisis in youth employment. Today's events - an ink attack on the CJP founder and an indefinite hunger strike declaration - mark a dramatic escalation.",
    participants: '15,000+',
    background:
      "The movement was born after the Chief Justice of India made remarks describing student protesters as 'cockroaches' during a hearing on NEET irregularities. The remarks triggered nationwide outrage, leading to the formation of the Cockroach Janta Party as a civic protest body. Since June 6, 2026, protesters have maintained a continuous presence at Jantar Mantar, escalating their demands to include youth employment guarantees and the release of detained activists.",
    demands: [
      'Immediate CBI investigation into NEET UG 2026 paper leak allegations',
      'Cancellation and re-conduct of NEET UG 2026 under CCTV surveillance',
      'Release of Sonam Wangchuk and all detained activists unconditionally',
      'National Youth Employment Policy with enforceable job guarantees',
      'Parliamentary debate on education reform within 15 days',
    ],
    keyFigures: [
      { name: 'Abhijeet Dipke', role: 'CJP Founder - on indefinite hunger strike' },
      { name: 'Sonam Wangchuk', role: 'Activist - forcibly hospitalized, Day 21 fast' },
      { name: 'Priya Shankar', role: 'Ground Coordinator, Delhi Chapter' },
    ],
    updates: [
      { time: '3:00 PM, July 18', text: 'Ink-like liquid thrown at Abhijeet Dipke. Assailant detained. Dipke continues address.' },
      { time: '12:45 PM, July 18', text: 'Dipke announces indefinite hunger strike from main stage.' },
      { time: '6:00 AM, July 18', text: 'Sonam Wangchuk forcibly removed by Delhi Police to Safdarjung Hospital after Day 21 fast.' },
      { time: 'June 6, Origin', text: 'First major rally. CJP formally constituted after CJI remarks.' },
    ],
    helplineOrContact: '+91 98765 43210 (Ground Volunteer, Delhi)',
    mapArea: 'Jantar Mantar Road, near Parliament Street, New Delhi - 110001',
    sourceArticleUrl: 'https://www.thehindu.com/news/national/jantar-mantar-protest-neet-leaks/',
    sourceOutlet: 'The Hindu',
    imageUrl: '/api/og-image?url=https%3A%2F%2Fwww.thehindu.com%2Fnews%2Fnational%2Fjantar-mantar-protest-neet-leaks%2F',
  },
  {
    id: 'kisan-ghat-rally',
    title: 'Kisan Ghat Motorcycle Rally',
    location: 'Kisan Ghat, Delhi',
    state: 'Delhi',
    status: 'UPCOMING',
    daysActive: 0,
    focus: 'Agricultural Reforms & MSP Guarantee',
    description:
      'Farmer unions from 18 states are organizing a massive motorcycle rally demanding implementation of MSP guarantees, debt waivers, and a rollback of recent APMC Act amendments. Coordination is being handled digitally across state chapters.',
    participants: '25,000+ expected',
    upcomingDate: 'July 20, 2026',
    background:
      'Following the collapse of the third round of talks between farmer unions and the Agriculture Ministry in June 2026, a joint platform of 47 farmer organizations called for a national motorcycle rally. The rally is designed to demonstrate the pan-India reach of the agrarian movement and put pressure on the government ahead of the Kharif procurement season.',
    demands: [
      'Statutory guarantee of Minimum Support Price (MSP) for all 23 crops',
      'Complete agricultural debt waiver for small and marginal farmers',
      'Rollback of APMC Act amendments introduced in 2025',
      'Insurance payouts pending since Kharif 2024 season',
    ],
    keyFigures: [
      { name: 'Rakesh Tikait', role: 'BKU National Spokesperson' },
      { name: 'Gurnam Singh Charuni', role: 'BKU (Haryana) President' },
      { name: 'Jagjit Singh Dallewal', role: 'SKM (Non-Political) Convenor' },
    ],
    updates: [
      { time: 'July 17, 8:00 PM', text: 'Convoys from Punjab, Haryana, and UP begin assembling at border points.' },
      { time: 'July 16, 3:00 PM', text: 'Delhi Police grants conditional permission for rally - restricted to Kisan Ghat only.' },
      { time: 'July 14, Origin', text: 'Joint farmer unions issue rally declaration after failed talks with Agriculture Ministry.' },
    ],
    helplineOrContact: '+91 94560 12345 (BKU Rally Helpdesk)',
    mapArea: 'Kisan Ghat, Near ITO, Delhi - 110002',
    sourceArticleUrl: 'https://www.ndtv.com/india-news/farmers-protest-kisan-ghat-rally-msp-guarantee',
    sourceOutlet: 'NDTV',
    imageUrl: '/api/og-image?url=https%3A%2F%2Fwww.ndtv.com%2Findia-news%2Ffarmers-protest-kisan-ghat-rally-msp-guarantee',
  },
  {
    id: 'desh-bachao-morcha',
    title: 'Desh Bachao Morcha',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    status: 'ACTIVE',
    daysActive: 11,
    focus: 'State-level Job Regularisation',
    description:
      'A coalition of contract workers, daily-wagers, and civic employees demanding permanent regularisation of over 2.3 lakh state government contract positions. The movement has expanded to Pune, Nashik, and Nagpur.',
    participants: '8,500+',
    background:
      'Maharashtra has one of the highest proportions of contractual workers in the public sector in India. The Desh Bachao Morcha was formed after the state government failed to act on a 2024 High Court directive ordering a review of contract worker conditions. The movement gained momentum in July 2026 when three contract sanitation workers died on duty without receiving mandated health benefits.',
    demands: [
      'Permanent regularisation of 2.3 lakh state contract workers',
      'Equal pay and benefits as permanent employees with immediate effect',
      'End to contractual labour system in essential government services',
      'Establishment of a State Workers Rights Commission',
    ],
    keyFigures: [
      { name: 'Meena Karpe', role: 'Morcha President, Municipal Workers Union' },
      { name: 'Suresh Patil', role: 'State Coordinator, Maharashtra' },
      { name: 'Ananya Rao', role: 'Legal Advisor, Morcha Campaign' },
    ],
    updates: [
      { time: 'July 18, 10:00 AM', text: 'Morcha expands to Nagpur - 1,200 workers join the movement.' },
      { time: 'July 16, 2:00 PM', text: 'Maharashtra CM office denies meeting request. Protesters announce relay fast.' },
      { time: 'July 13, Origin', text: 'Founding rally at Azad Maidan, Mumbai draws 4,000 contract workers.' },
    ],
    helplineOrContact: '+91 89123 45678 (Morcha Helpline, Mumbai)',
    mapArea: 'Azad Maidan, CST Road, Mumbai - 400001',
    sourceArticleUrl: 'https://indianexpress.com/cities/mumbai/desh-bachao-morcha-contract-workers-protest/',
    sourceOutlet: 'Indian Express',
    imageUrl: '/api/og-image?url=https%3A%2F%2Findianexpress.com%2Fcities%2Fmumbai%2Fdesh-bachao-morcha-contract-workers-protest%2F',
  },
  {
    id: 'manipur-peace-march',
    title: 'Manipur Solidarity Peace March',
    location: 'Imphal, Manipur',
    state: 'Manipur',
    status: 'ACTIVE',
    daysActive: 7,
    focus: 'Ethnic Violence & Humanitarian Crisis',
    description:
      'Civil society organizations and student groups are leading daily peace marches in Imphal demanding immediate government intervention to address the ongoing ethnic conflict, rehabilitation of displaced families, and accountability for human rights violations.',
    participants: '6,200+',
    background:
      'The Manipur conflict has entered its third year with over 60,000 people still in relief camps. Following renewed clashes in the hill districts in July 2026, civil society leaders launched coordinated peace marches. The movement is notable for bringing together representatives from both affected communities for the first time in months.',
    demands: [
      'Immediate deployment of neutral central security forces in conflict zones',
      'Expedited rehabilitation of 60,000+ displaced families in relief camps',
      'Independent judicial probe into human rights violations since 2023',
      'Restoration of mobile internet and communications in hill districts',
      'Emergency humanitarian aid package for conflict-affected families',
    ],
    keyFigures: [
      { name: 'Bimol Akoijam', role: 'Civil Society Leader, MANSA' },
      { name: 'Ranjita Devi', role: "Women's Peace Coalition Convenor" },
      { name: 'James Haokip', role: 'Kuki Students Organisation Representative' },
    ],
    updates: [
      { time: 'July 18, 11:00 AM', text: 'Largest march yet - over 6,000 participants across 3 districts.' },
      { time: 'July 15, 4:00 PM', text: 'First joint march by Meitei and Kuki community leaders in 2 years.' },
      { time: 'July 12, Origin', text: 'Peace March initiative launched by civil society after renewed clashes.' },
    ],
    helplineOrContact: '+91 79860 34521 (MANSA Peace Cell)',
    mapArea: 'Kangla Fort Grounds, Imphal West, Manipur - 795001',
    sourceArticleUrl: 'https://thewire.in/rights/manipur-peace-march-ethnic-violence',
    sourceOutlet: 'The Wire',
    imageUrl: '/api/og-image?url=https%3A%2F%2Fthewire.in%2Frights%2Fmanipur-peace-march-ethnic-violence',
  },
  {
    id: 'tribal-land-rights-jharkhand',
    title: 'Tribal Land Rights Andolan',
    location: 'Ranchi, Jharkhand',
    state: 'Jharkhand',
    status: 'ACTIVE',
    daysActive: 19,
    focus: 'Adivasi Land Rights & Forest Act',
    description:
      'Adivasi communities and tribal rights groups are staging sit-in protests outside the Jharkhand Raj Bhavan demanding the withdrawal of proposed amendments to the Chota Nagpur Tenancy Act that would allow corporate acquisition of tribal land.',
    participants: '11,000+',
    background:
      'The proposed 2026 amendments to the Chota Nagpur Tenancy Act and Santhal Parganas Tenancy Act would remove key protections preventing transfer of tribal land to non-tribals and corporations. Rights groups say this would effectively displace hundreds of thousands of Adivasi families to facilitate mining and infrastructure projects.',
    demands: [
      'Withdrawal of proposed amendments to CNT and SPT Acts',
      'Implementation of Forest Rights Act 2006 in letter and spirit across Jharkhand',
      'Moratorium on all land acquisitions in Schedule V areas pending consultation',
      'Return of already-acquired tribal lands declared illegally obtained',
    ],
    keyFigures: [
      { name: 'Dayamani Barla', role: 'Adivasi Rights Activist & Journalist' },
      { name: 'Stanley Ekka', role: 'All Jharkhand Tribal Students Union President' },
      { name: 'Father Stanislaus', role: 'Tribal Welfare Mission Coordinator' },
    ],
    updates: [
      { time: 'July 18, 9:00 AM', text: 'Night sit-in enters Day 19. Protesters refuse to vacate despite police warnings.' },
      { time: 'July 14, 3:00 PM', text: 'Governor refuses to meet delegation. Movement calls for statewide bandh on July 22.' },
      { time: 'June 29, Origin', text: 'Andolan launched after state cabinet approves first reading of CNT amendment bill.' },
    ],
    helplineOrContact: '+91 70001 23456 (Tribal Rights Helpline, Ranchi)',
    mapArea: 'Raj Bhavan Road, Doranda, Ranchi - 834002',
    sourceArticleUrl: 'https://apnews.com/article/india-jharkhand-tribal-land-rights-protest',
    sourceOutlet: 'AP News',
    imageUrl: '/api/og-image?url=https%3A%2F%2Fapnews.com%2Farticle%2Findia-jharkhand-tribal-land-rights-protest',
  },
  {
    id: 'nta-students-chennai',
    title: 'Students Against NTA — Chennai',
    location: 'Marina Beach, Chennai',
    state: 'Tamil Nadu',
    status: 'ACTIVE',
    daysActive: 5,
    focus: 'NTA Abolition & Exam Reform',
    description:
      'Thousands of students, parents, and educators have gathered at Marina Beach demanding the abolition of the National Testing Agency (NTA) and an overhaul of the centralized examination system following the NEET 2026 paper leak scandal.',
    participants: '22,000+',
    background:
      'Tamil Nadu has historically opposed the NEET examination system, and the 2026 paper leak has reignited demands for scrapping both NTA and NEET. The Chennai protest is notable for its scale - it is the largest anti-NEET demonstration in the state since 2021. The protest has received cross-party support from state politicians.',
    demands: [
      'Immediate abolition of the National Testing Agency (NTA)',
      'Restoration of state control over medical and engineering admissions',
      'Mandatory criminal prosecution of NTA officials responsible for leak',
      'Compensatory admission process for NEET 2026 affected students',
      'Passage of state bill exempting Tamil Nadu from NEET permanently',
    ],
    keyFigures: [
      { name: 'Dr. G. R. Ravindranath', role: 'NEET Protest Coordination Committee' },
      { name: 'Yamini Krishnamurthy', role: 'Tamil Nadu Students Federation Leader' },
      { name: 'V. Murugan', role: 'Medical Students Association Spokesperson' },
    ],
    updates: [
      { time: 'July 18, 5:00 PM', text: 'Protest swells to 22,000 after news of ink attack on Dipke at Jantar Mantar.' },
      { time: 'July 17, 2:00 PM', text: 'State CM expresses solidarity, calls for parliamentary debate on NTA.' },
      { time: 'July 14, Origin', text: 'Initial rally of 8,000 students at Valluvar Kottam grows into permanent sit-in.' },
    ],
    helplineOrContact: '+91 98400 56789 (TNSC Protest Helpdesk)',
    mapArea: 'Marina Beach Promenade, Kamarajar Salai, Chennai - 600005',
    sourceArticleUrl: 'https://www.thehindu.com/news/national/tamil-nadu/students-against-nta-protest-chennai/',
    sourceOutlet: 'The Hindu',
    imageUrl: '/api/og-image?url=https%3A%2F%2Fwww.thehindu.com%2Fnews%2Fnational%2Ftamil-nadu%2Fstudents-against-nta-protest-chennai%2F',
  },
]

export function getProtest(id: string): ProtestData | undefined {
  return protests.find((p) => p.id === id)
}
