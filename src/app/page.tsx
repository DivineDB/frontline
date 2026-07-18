import Header from './components/Header'
import HeadlinesFeed from './components/HeadlinesFeed'
import MovementsGrid from './components/MovementsGrid'
import ContributionMatrix from './components/ContributionMatrix'
import Footer from './components/Footer'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Main feed */}
          <div className="lg:col-span-2">
            <MovementsGrid />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5 lg:border-l lg:border-zinc-800 lg:pl-10">
            <HeadlinesFeed />
            <ContributionMatrix />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
