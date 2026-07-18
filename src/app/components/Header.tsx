"use client";

import { Clock } from "lucide-react";

export default function Header() {
	return (
		<header className="w-full bg-zinc-950 border-b border-zinc-800 z-50">
			{/* Main Brand Header */}
			<div className="py-8 px-4 sm:px-6 lg:px-8 text-center bg-zinc-950">
				<div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
					<p className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase font-sans">
						Independent Civic Record
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-50">
						Frontline Link
					</h1>
					<p className="font-serif italic text-xs sm:text-sm text-zinc-400 max-w-md mt-1 border-t border-zinc-800 pt-2 w-full max-w-lg">
						A real-time record of civic movements across India
					</p>
				</div>
			</div>

			{/* Static Important Alert (Replaces Gimmicky Marquee Ticker) */}
			<div className="bg-zinc-900 border-t border-zinc-800 px-4 sm:px-6 lg:px-8 py-2 text-xs font-sans text-zinc-300 flex items-center justify-center gap-2">
				<span className="font-bold text-red-500 tracking-wider text-[10px] uppercase">
					LATEST UPDATE:
				</span>
				<span className="truncate">
					Ink attack on CJP founder Abhijeet Dipke at Jantar Mantar — Police
					detain assailant.
				</span>
			</div>
		</header>
	);
}
