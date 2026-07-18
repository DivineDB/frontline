'use client'

import { X, GitFork } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 px-4 sm:px-6 lg:px-8 mt-auto bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Disclaimer in a highly polished, clean sans-serif layout */}
        <p className="font-sans text-[10px] tracking-wider text-zinc-500 text-center sm:text-left max-w-xl leading-relaxed uppercase">
          Frontline Link is an independent civic record. Content is aggregated from
          dispatch wire services &amp; independent ground correspondents.
          All registered rights and data reserved &copy; 2026.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            aria-label="X (formerly Twitter)"
            className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-850
                       text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors duration-200"
          >
            <X className="w-3.5 h-3.5" />
          </a>
          <a
            href="#"
            aria-label="GitHub Repository"
            className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-850
                       text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors duration-200"
          >
            <GitFork className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </footer>
  )
}
