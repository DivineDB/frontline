# Frontline

A real-time protest and social movement tracking dashboard for India. Frontline provides live updates on ongoing protests, citizen movements, and grassroots campaigns across the country.

## Overview

Frontline is a web application that aggregates and displays information about active social movements, protests, and citizen campaigns in India. It features:

- **Live Movement Tracking**: Real-time updates on ongoing protests with status indicators (CRITICAL, ACTIVE, UPCOMING)
- **Detailed Movement Profiles**: In-depth information including demands, key figures, participant counts, and historical background
- **News Integration**: Headline feeds and source attribution from major news outlets
- **Interactive Dashboard**: Clean, responsive UI with movement grids, contribution matrices, and detailed modal views
- **Location-Based Organization**: Movements organized by state and location with map integration

## Features

### Movement Cards
- Visual status indicators (CRITICAL, ACTIVE, UPCOMING)
- Participant counts and days active tracking
- Quick access to detailed movement information
- Image integration via proxy API for reliable news source images

### Detailed Movement Pages
- Complete background and context
- List of demands and key figures
- Timeline of updates and events
- Contact information and helplines
- Map area references
- Source article attribution

### Dashboard Components
- **Headlines Feed**: Latest news and updates from tracked movements
- **Movements Grid**: Overview of all active movements
- **Contribution Matrix**: Ways to support and contribute
- **Responsive Design**: Optimized for desktop and mobile viewing

## Tech Stack

- **Framework**: Next.js 16.2.10 (App Router)
- **UI**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd frontline
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── news/          # News API route
│   │   └── og-image/      # Image proxy for news sources
│   ├── components/
│   │   ├── Header.tsx     # Navigation header
│   │   ├── HeadlinesFeed.tsx    # News headlines component
│   │   ├── MovementsGrid.tsx    # Main movements grid
│   │   ├── ContributionMatrix.tsx  # Contribution ways
│   │   ├── Footer.tsx     # Footer component
│   │   └── ProtestDetailModal.tsx  # Detailed protest view
│   ├── data/
│   │   └── protests.ts    # Movement data and types
│   ├── protest/
│   │   └── [id]/          # Dynamic protest detail pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## Data Management

Movement data is currently managed in `src/app/data/protests.ts`. The data structure includes:

- **Protest Status**: CRITICAL, ACTIVE, UPCOMING
- **Location Details**: State, city, specific venue
- **Movement Info**: Focus area, participant counts, days active
- **Background**: Historical context and origins
- **Demands**: List of movement demands
- **Key Figures**: Leadership and spokespersons
- **Updates**: Timeline of events and developments
- **Contact Info**: Helplines and coordination contacts
- **Source Attribution**: News article URLs and outlet names

## API Routes

### `/api/news`
News aggregation endpoint for movement-related headlines.

### `/api/og-image`
Proxy endpoint for fetching and serving news source images, handling CORS and reliability issues with external image sources.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/new)
3. Deploy with default settings

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:

- Railway
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contributing

Contributions are welcome! Areas for improvement:

- **Real-time Data Integration**: Connect to live news APIs for automatic updates
- **User Authentication**: Allow users to submit movement updates
- **Map Integration**: Interactive maps showing protest locations
- **Mobile App**: React Native or Flutter companion app
- **Notifications**: Push notifications for critical updates
- **Multi-language Support**: Regional language support for movements across India

## License

This project is open source and available under the MIT License.

## Acknowledgments

- News sources: The Hindu, NDTV, Indian Express, The Wire, AP News
- Movement data compiled from public sources and official statements
- Built with modern web technologies for fast, accessible information delivery
