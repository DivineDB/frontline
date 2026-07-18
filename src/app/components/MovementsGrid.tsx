'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Users, TrendingUp, Newspaper, ArrowRight } from 'lucide-react'
import { protests, type ProtestData, type ProtestStatus } from '@/app/data/protests'

const statusConfig: Record<ProtestStatus, { label: string; textClass: string; badgeClass: string }> = {
  CRITICAL: {
    label: 'Urgent',
    textClass: 'text-red-500',
    badgeClass: 'bg-red-500/10 border-red-500/20 text-red-400',
  },
  ACTIVE: {
    label: 'Active',
    textClass: 'text-zinc-400',
    badgeClass: 'bg-zinc-800/40 border-zinc-700/30 text-zinc-300',
  },
  UPCOMING: {
    label: 'Upcoming',
    textClass: 'text-zinc-400',
    badgeClass: 'bg-zinc-800/40 border-zinc-700/30 text-zinc-300',
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] },
  }),
}

function ProtestCard({ protest, index }: { protest: ProtestData; index: number }) {
  const cfg = statusConfig[protest.status]
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className="h-full"
    >
      <Link
        href={`/protest/${protest.id}`}
        className="flex flex-col bg-zinc-900/20 border border-zinc-800/80 hover:border-zinc-700
                   transition-all duration-300 h-full group"
      >
        {/* ── Header Image ── */}
        <div className="relative w-full h-52 overflow-hidden bg-zinc-900 shrink-0 border-b border-zinc-800/80">
          {/* Loading Skeleton */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
          )}

          {/* Fallback image if loading fails */}
          {imgError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-900">
              <Newspaper className="w-6 h-6 text-zinc-700" />
              <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest">
                Image Unavailable
              </span>
            </div>
          )}

          {/* News image parsed via proxy */}
          {!imgError && (
            <img
              src={protest.imageUrl}
              alt={protest.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true) }}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]
                          ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          {/* Simple subtle bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

          {/* Media outlet badge */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-zinc-950/90 border border-zinc-800/80 px-2 py-0.5 text-[9px] font-sans font-medium uppercase tracking-wider text-zinc-400">
            {protest.sourceOutlet}
          </span>
        </div>

        {/* ── Card Content ── */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Metadata line */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className={`inline-flex items-center border px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider ${cfg.badgeClass}`}>
              {cfg.label}
            </span>

            {protest.status === 'UPCOMING' && protest.upcomingDate ? (
              <span className="font-sans text-[11px] text-zinc-400 font-medium">{protest.upcomingDate}</span>
            ) : (
              <span className="font-sans text-[11px] text-zinc-500">
                Active <span className="font-semibold text-zinc-300">{protest.daysActive}d</span>
              </span>
            )}
          </div>

          {/* Kicker */}
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
            {protest.state}
          </span>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-zinc-100 group-hover:text-white transition-colors duration-200 leading-snug mb-2.5">
            {protest.title}
          </h3>

          {/* Primary Issue Kicker */}
          <span className="self-start font-sans text-[10px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 mb-3 uppercase tracking-wide">
            {protest.focus}
          </span>

          {/* Description summary */}
          <p className="font-sans text-[12px] text-zinc-400 leading-relaxed flex-1 mb-5 line-clamp-3">
            {protest.description}
          </p>

          {/* Footer stats */}
          <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-zinc-800/80 mt-auto font-sans text-[11px] text-zinc-500">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              <span className="truncate">{protest.location}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-zinc-400 font-medium">
              <Users className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              <span>{protest.participants}</span>
            </div>
          </div>

          {/* Sleek CTA */}
          <div className="flex items-center gap-1 mt-4 font-sans text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200">
            Read Dispatch <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function MovementsGrid() {
  return (
    <section className="py-2 px-0">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8 border-b border-zinc-800 pb-4"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingUp className="w-4 h-4 text-zinc-400" />
          <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Aggregated Records
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
          Ongoing Civic Mobilizations
        </h2>
        <p className="mt-2 font-sans text-[12px] text-zinc-400 max-w-xl leading-relaxed">
          Verified feeds from ongoing student, agricultural, and worker assemblies. Click on any record to view details, contacts, and legal documentation.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {protests.map((protest, i) => (
          <ProtestCard key={protest.id} protest={protest} index={i} />
        ))}
      </div>
    </section>
  )
}
