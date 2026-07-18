'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowLeft, MapPin, Users, Calendar, Shield, Target,
  TrendingUp, Phone, ExternalLink, AlertTriangle, CheckCircle, Clock, Play
} from 'lucide-react'
import type { ProtestData } from '@/app/data/protests'

const statusConfig = {
  CRITICAL: {
    label: 'Urgent',
    cls: 'text-red-400 border-red-500/30 bg-red-500/10',
    dot: 'bg-red-500',
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  ACTIVE: {
    label: 'Active',
    cls: 'text-zinc-300 border-zinc-600/40 bg-zinc-800/40',
    dot: 'bg-zinc-400',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  UPCOMING: {
    label: 'Upcoming',
    cls: 'text-zinc-300 border-zinc-600/40 bg-zinc-800/40',
    dot: 'bg-zinc-400',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
}

function MediaPlaceholder() {
  return (
    <div className="mt-4 border border-zinc-800 bg-zinc-900/40 aspect-video flex flex-col items-center
                    justify-center gap-3 group cursor-pointer hover:border-zinc-600 transition-colors">
      <div className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center
                      group-hover:border-zinc-500 transition-colors">
        <Play className="w-4 h-4 text-zinc-400 fill-zinc-400 ml-0.5" />
      </div>
      <div className="text-center">
        <p className="font-sans text-sm font-medium text-zinc-300">Watch Live Feed</p>
        <p className="font-sans text-xs text-zinc-500 mt-0.5">Ground coverage · Jantar Mantar</p>
      </div>
    </div>
  )
}

export default function ProtestPageClient({ protest }: { protest: ProtestData }) {
  const cfg = statusConfig[protest.status]
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs text-zinc-500 hover:text-zinc-200
                     transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        {/* ── Article Header ── */}
        <div className="border-b border-zinc-800 pb-7 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-sans text-xs font-medium ${cfg.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.icon} {cfg.label}
            </span>
            <span className="font-sans text-[11px] text-zinc-500 uppercase tracking-wider">
              {protest.state}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 leading-tight mb-4">
            {protest.title}
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
            {protest.description}
          </p>
        </div>

        {/* ── Hero Image ── */}
        <div className="mb-10">
          <div className="relative w-full h-[280px] sm:h-[400px] bg-zinc-900 overflow-hidden border border-zinc-800">
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
            )}
            {!imgError && (
              <img
                src={protest.imageUrl}
                alt={protest.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => { setImgError(true); setImgLoaded(true) }}
                className={`w-full h-full object-cover transition-all duration-700 hover:scale-[1.01]
                            ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>
          <div className="flex items-center justify-between mt-2 font-sans text-[10px] text-zinc-600 uppercase tracking-wider">
            <span>Photo</span>
            <span>Verified Gathering · {protest.sourceOutlet}</span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Left: Narrative */}
          <div className="md:col-span-2 space-y-10">

            {/* Background */}
            <section>
              <h2 className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Background
              </h2>
              <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                {protest.background}
              </p>
            </section>

            {/* Demands */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-zinc-500" />
                <h2 className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Demands
                </h2>
              </div>
              <ol className="space-y-3">
                {protest.demands.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 border-l-2 border-zinc-800 pl-4 py-0.5">
                    <span className="shrink-0 font-sans text-xs font-bold text-zinc-600 mt-0.5 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-sm text-zinc-300 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Timeline */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-zinc-500" />
                <h2 className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  What Happened
                </h2>
              </div>
              <div className="relative pl-5 border-l border-zinc-800 space-y-5">
                {protest.updates.map((u, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-zinc-950" />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      {u.time}
                    </p>
                    <p className="font-sans text-sm text-zinc-300 leading-relaxed">{u.text}</p>
                    {i === 0 && protest.id === 'cjp-jantar-mantar' && <MediaPlaceholder />}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">

            {/* Fact sheet */}
            <div className="border border-zinc-800 bg-zinc-900/30">
              <div className="border-b border-zinc-800 px-4 py-3">
                <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-500">Details</h3>
              </div>
              <div className="p-4 space-y-4 font-sans text-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Location</span>
                  <div className="flex items-start gap-1.5 text-zinc-200">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{protest.location}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">People Present</span>
                  <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                    <Users className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{protest.participants}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">How Long</span>
                  <div className="flex items-center gap-1.5 text-zinc-200">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{protest.status === 'UPCOMING' ? 'Rally Scheduled' : `${protest.daysActive} days active`}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Focus</span>
                  <div className="flex items-center gap-1.5 text-zinc-200">
                    <Target className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{protest.focus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key figures */}
            <div className="border border-zinc-800 bg-zinc-900/30">
              <div className="border-b border-zinc-800 px-4 py-3">
                <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-500">Key Spokespersons</h3>
              </div>
              <div className="p-4 divide-y divide-zinc-800/60">
                {protest.keyFigures.map(p => (
                  <div key={p.name} className="py-2.5 first:pt-0 last:pb-0">
                    <p className="font-sans text-sm font-semibold text-zinc-200">{p.name}</p>
                    <p className="font-sans text-xs text-zinc-500 mt-0.5">{p.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            {protest.mapArea && (
              <div className="border border-zinc-800 bg-zinc-900/30 p-4">
                <span className="block font-sans text-[10px] uppercase tracking-wider text-zinc-500 mb-2">Where</span>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed mb-3">{protest.mapArea}</p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(protest.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  View on Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Helpline */}
            {protest.helplineOrContact && (
              <div className="border border-zinc-800 bg-zinc-900/30 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-zinc-500">Helpline</span>
                </div>
                <p className="font-sans text-sm font-semibold text-zinc-200">{protest.helplineOrContact}</p>
              </div>
            )}

            {/* CTA */}
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-zinc-100 hover:bg-white
                         text-zinc-900 font-sans font-semibold py-3.5 text-sm transition-colors"
            >
              Help from Home <ExternalLink className="w-3.5 h-3.5" />
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}
