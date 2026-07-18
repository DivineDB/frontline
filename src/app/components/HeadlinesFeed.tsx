'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, RefreshCw, Clock } from 'lucide-react'

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

const severityLabel: Record<NewsItem['severity'], { label: string; cls: string }> = {
  breaking: { label: 'Breaking',  cls: 'text-red-400 border-red-500/30 bg-red-500/10' },
  high:     { label: 'Urgent',    cls: 'text-zinc-300 border-zinc-600/40 bg-zinc-800/40' },
  medium:   { label: 'Update',    cls: 'text-zinc-400 border-zinc-700/40 bg-zinc-900/40' },
  origin:   { label: 'Origin',    cls: 'text-zinc-400 border-zinc-700/40 bg-zinc-900/40' },
}

export default function HeadlinesFeed() {
  const [headlines, setHeadlines] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchHeadlines() {
    try {
      const res = await fetch('/api/news', { cache: 'no-store' })
      if (res.ok) setHeadlines((await res.json()).items ?? [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    fetchHeadlines()
    const t = setInterval(fetchHeadlines, 120_000)
    return () => clearInterval(t)
  }, [])

  if (loading) {
    return (
      <div className="border border-zinc-800 bg-zinc-950 p-5 space-y-4 animate-pulse">
        <div className="h-3 bg-zinc-800 rounded w-1/3" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-2.5 bg-zinc-800 rounded w-full" />
            <div className="h-2.5 bg-zinc-800 rounded w-4/5" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="border border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
        <h3 className="font-sans text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          Live Wire
        </h3>
        <button
          onClick={fetchHeadlines}
          title="Refresh"
          className="w-6 h-6 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Feed */}
      <div className="divide-y divide-zinc-800/60">
        <AnimatePresence mode="popLayout">
          {headlines.map((item, i) => {
            const cfg = severityLabel[item.severity]
            const isImportant = item.severity === 'breaking' || item.severity === 'high'
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-4 space-y-2"
              >
                {/* Meta */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`border px-1.5 py-px font-sans text-[9px] font-semibold uppercase tracking-wider ${cfg.cls}`}>
                    {cfg.label}
                  </span>
                  <span className="flex items-center gap-1 font-sans text-[10px] text-zinc-500">
                    <Clock className="w-2.5 h-2.5" />
                    {item.relativeTime}
                  </span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-0.5 font-sans text-[10px] text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {item.source} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Headline */}
                <p className={`font-serif text-[13px] leading-snug text-zinc-100 ${isImportant ? 'font-semibold' : 'font-normal'}`}>
                  {item.headline}
                </p>

                {/* Blurb */}
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 px-5 py-2.5 flex items-center gap-1.5 font-sans text-[10px] text-zinc-600">
        <Clock className="w-3 h-3" />
        <span>Auto-refreshes every 2 min</span>
      </div>
    </div>
  )
}
