'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  MapPin,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Target,
  Shield,
  TrendingUp,
  Phone,
} from 'lucide-react'

export interface ProtestDetail {
  id: string
  title: string
  location: string
  status: 'CRITICAL' | 'ACTIVE' | 'UPCOMING'
  daysActive: number | string
  focus: string
  description: string
  participants: string
  upcomingDate?: string
  demands: string[]
  keyFigures: { name: string; role: string }[]
  updates: { time: string; text: string }[]
  helplineOrContact?: string
  mapArea?: string
}

const statusConfig = {
  CRITICAL: { text: 'text-red-400', bg: 'bg-red-950/60', border: 'border-red-800/50', dot: 'bg-red-500 animate-blink', label: 'Critical' },
  ACTIVE:   { text: 'text-emerald-400', bg: 'bg-emerald-950/50', border: 'border-emerald-800/40', dot: 'bg-emerald-500', label: 'Active' },
  UPCOMING: { text: 'text-amber-400', bg: 'bg-amber-950/50', border: 'border-amber-800/40', dot: 'bg-amber-400', label: 'Upcoming' },
}

interface Props {
  protest: ProtestDetail | null
  onClose: () => void
}

export default function ProtestDetailModal({ protest, onClose }: Props) {
  if (!protest) return null
  const cfg = statusConfig[protest.status]

  return (
    <AnimatePresence>
      {protest && (
        <>
          {/* Backdrop */}
          <motion.div
            key="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Slide-in panel */}
          <motion.div
            key="detail-panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl z-50 flex flex-col bg-[#0e0e0e] border-l border-[#1e1e1e] shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[#1e1e1e] p-5 flex items-start gap-4 z-10">
              <div className="flex-1 min-w-0">
                <div className={`inline-flex items-center gap-1.5 ${cfg.bg} border ${cfg.border} rounded-full px-2.5 py-1 mb-2`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${cfg.text}`}>{cfg.label}</span>
                </div>
                <h2 className="text-xl font-extrabold text-white leading-tight">{protest.title}</h2>
              </div>
              <button
                id="detail-modal-close"
                onClick={onClose}
                className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#1a1a1a] border border-[#252525] text-neutral-400 hover:text-white hover:border-[#333] transition-colors mt-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-5 space-y-6">

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: protest.location },
                  { icon: <Users className="w-4 h-4" />, label: 'Participants', value: protest.participants },
                  {
                    icon: <Calendar className="w-4 h-4" />,
                    label: protest.status === 'UPCOMING' ? 'Scheduled' : 'Duration',
                    value: protest.status === 'UPCOMING' ? protest.upcomingDate! : `Day ${protest.daysActive}`,
                  },
                  { icon: <Target className="w-4 h-4" />, label: 'Focus Area', value: protest.focus },
                ].map((item) => (
                  <div key={item.label} className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-neutral-500 text-xs mb-1">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <p className="text-white text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Overview</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{protest.description}</p>
              </div>

              {/* Key Demands */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Key Demands</h3>
                </div>
                <ul className="space-y-2">
                  {protest.demands.map((demand, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-950/60 border border-indigo-900/40 text-indigo-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {demand}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Figures */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Key Figures</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {protest.keyFigures.map((person) => (
                    <div key={person.name} className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-3 py-2">
                      <p className="text-sm font-semibold text-white">{person.name}</p>
                      <p className="text-[11px] text-neutral-500">{person.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Updates */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Recent Updates</h3>
                </div>
                <div className="relative space-y-0">
                  {protest.updates.map((update, i) => (
                    <div key={i} className="flex gap-3 pb-4 relative">
                      {i < protest.updates.length - 1 && (
                        <div className="absolute left-[7px] top-4 bottom-0 w-px bg-[#222]" />
                      )}
                      <div className="shrink-0 w-3.5 h-3.5 rounded-full bg-[#222] border border-[#333] mt-1 z-10" />
                      <div>
                        <span className="text-[10px] text-neutral-600 font-mono">{update.time}</span>
                        <p className="text-sm text-neutral-300 leading-relaxed">{update.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map area */}
              {protest.mapArea && (
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-900/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Protest Zone</p>
                    <p className="text-sm text-white font-medium">{protest.mapArea}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(protest.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View Map <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Helpline */}
              {protest.helplineOrContact && (
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-900/40 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Ground Contact / Helpline</p>
                    <p className="text-sm text-white font-medium">{protest.helplineOrContact}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="sticky bottom-0 bg-[#0e0e0e]/95 backdrop-blur-md border-t border-[#1e1e1e] p-4">
              <a
                href="#contribute"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Support This Movement <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
