'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, FileText, Mail, X, QrCode, Send, ChevronRight } from 'lucide-react'

type ModalType = 'vendor' | 'rti' | 'email' | null

interface Action {
  id: Exclude<ModalType, null>
  icon: React.ReactNode
  label: string
  sub: string
  description: string
}

const actions: Action[] = [
  {
    id: 'vendor',
    icon: <ShoppingBag className="w-4 h-4" />,
    label: 'Send Supplies',
    sub: 'Direct Vendor Support',
    description: 'Buy water and medical supplies from local shops near Jantar Mantar. Ground volunteers collect and verify.',
  },
  {
    id: 'rti',
    icon: <FileText className="w-4 h-4" />,
    label: 'File an RTI',
    sub: 'Right to Information',
    description: 'Auto-draft a formal RTI grievance to the Ministry of Education in under 60 seconds.',
  },
  {
    id: 'email',
    icon: <Mail className="w-4 h-4" />,
    label: 'Write to the Ministry',
    sub: 'Public Advocacy',
    description: 'Send a ready-made email to the Education Minister — no experience needed.',
  },
]

// ─── Modals ───────────────────────────────────────────────────────────────

function VendorModal() {
  return (
    <div className="space-y-5">
      <p className="font-sans text-sm text-zinc-400 leading-relaxed">
        Scan the QR below to transfer funds directly to{' '}
        <strong className="text-zinc-100">Ramesh Provision Store</strong>, near Jantar Mantar Gate 2.
        Local volunteers collect and log provisions.
      </p>
      <div className="flex justify-center">
        <div className="bg-zinc-100 p-3 w-36 h-36 flex items-center justify-center relative">
          <QrCode className="w-24 h-24 text-zinc-900" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-100 flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 text-zinc-100" />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-zinc-800 divide-y divide-zinc-800 text-sm font-sans">
        {[['Store', 'Ramesh Provisions'], ['UPI ID', 'ramesh.provisions@upi'], ['Recommended', '₹200 – ₹500']].map(
          ([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-2.5">
              <span className="text-zinc-500 text-xs uppercase tracking-wide">{k}</span>
              <span className="text-zinc-200 font-medium text-xs">{v}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function RTIModal() {
  const [step, setStep] = useState(1)
  const [concern, setConcern] = useState('')
  const draft = `To,
The Secretary,
Ministry of Education, Govt. of India
Shastri Bhawan, New Delhi – 110001

Subject: RTI Application — NEET UG 2026 Paper Leak

Sir/Madam,

Under the Right to Information Act 2005, I request:

1. All internal communications between the Ministry and NTA regarding NEET UG 2026 irregularities (January 2026 to date).
2. Names of officials responsible for examination security during NEET UG 2026.
3. Copies of any FIRs registered in connection with the paper leak.

My concern: ${concern || '[Your concern will appear here]'}

I certify this request is made in the public interest.

Yours sincerely,
[Your Name & Address]`

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <>
          <p className="font-sans text-sm text-zinc-400">Add your personal concern to personalise the petition.</p>
          <textarea
            id="rti-concern-input"
            className="w-full bg-zinc-900 border border-zinc-700 p-3 font-sans text-sm text-zinc-200
                       placeholder:text-zinc-600 resize-none focus:outline-none focus:border-zinc-500 transition-colors"
            rows={3}
            value={concern}
            onChange={e => setConcern(e.target.value)}
            placeholder="Describe your concern here..."
          />
          <button
            onClick={() => setStep(2)}
            className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white
                       text-zinc-900 font-sans font-semibold py-2.5 text-sm transition-colors"
          >
            Generate Draft <ChevronRight className="w-4 h-4" />
          </button>
        </>
      ) : (
        <>
          <pre className="bg-zinc-900 border border-zinc-800 p-4 text-xs text-zinc-400 font-sans leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
            {draft}
          </pre>
          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 font-sans text-sm font-medium text-zinc-400 border border-zinc-700 py-2 hover:border-zinc-500 transition-colors"
            >
              Edit
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 font-sans font-semibold py-2 text-sm transition-colors">
              <Send className="w-3.5 h-3.5" /> Submit RTI
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function EmailModal() {
  const [copied, setCopied] = useState(false)
  const template = `Subject: Please Address the NEET 2026 Crisis

Respected Shri Dharmendra Pradhan ji,
Minister of Education, Government of India,

I write as a concerned citizen regarding the ongoing NEET UG 2026 controversy and the situation at Jantar Mantar, New Delhi.

Thousands of students have lost faith in the examination system. The government's continued silence has forced them onto the streets.

I urge you to:
1. Order an immediate CBI inquiry into NEET 2026 paper leak allegations.
2. Ensure the safety and rights of peaceful protesters at Jantar Mantar.
3. Engage directly with student representatives within 72 hours.

Democracy demands accountability.

Sincerely,
A Concerned Citizen of India`

  const handleCopy = () => {
    navigator.clipboard.writeText(template)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const mailtoLink = `mailto:minister.education@gov.in,secy.educ@nic.in?subject=${encodeURIComponent(
    'Please Address the NEET 2026 Crisis'
  )}&body=${encodeURIComponent(template.replace('Subject: Please Address the NEET 2026 Crisis\n\n', ''))}`

  return (
    <div className="space-y-4">
      <pre className="bg-zinc-900 border border-zinc-800 p-4 text-xs text-zinc-400 font-sans leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
        {template}
      </pre>
      <div className="border border-zinc-800 px-4 py-2.5 flex gap-2 items-center text-xs font-sans text-zinc-500">
        <Mail className="w-3.5 h-3.5 shrink-0" />
        <span>To: <strong className="text-zinc-300">minister.education@gov.in</strong> &amp; <strong className="text-zinc-300">secy.educ@nic.in</strong></span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 font-sans text-sm font-medium
                     text-zinc-400 border border-zinc-700 py-2.5 hover:border-zinc-500 transition-colors"
        >
          {copied ? 'Copied ✓' : 'Copy Body'}
        </button>
        <a
          href={mailtoLink}
          className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-white
                     text-zinc-900 font-sans font-semibold py-2.5 text-sm transition-colors"
        >
          <Send className="w-3.5 h-3.5" /> Send Email
        </a>
      </div>
    </div>
  )
}

const modalDefs: Record<Exclude<ModalType, null>, { title: string; body: React.ReactNode }> = {
  vendor: { title: 'Send Supplies',           body: <VendorModal /> },
  rti:    { title: 'File an RTI Request',     body: <RTIModal /> },
  email:  { title: 'Write to the Ministry',   body: <EmailModal /> },
}

// ─── Main ─────────────────────────────────────────────────────────────────

export default function ContributionMatrix() {
  const [active, setActive] = useState<ModalType>(null)

  return (
    <div className="border border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-3.5">
        <h3 className="font-sans text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          Take Action
        </h3>
      </div>

      {/* Action list */}
      <div className="divide-y divide-zinc-800/60">
        {actions.map(action => (
          <button
            key={action.id}
            id={`action-btn-${action.id}`}
            onClick={() => setActive(action.id)}
            className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-zinc-900/50
                       transition-colors duration-200 group"
          >
            <div className="shrink-0 w-9 h-9 flex items-center justify-center border border-zinc-700 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-500 transition-colors">
              {action.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                {action.label}
              </p>
              <p className="font-sans text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                {action.description}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-zinc-950/90 z-50"
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-zinc-950 border border-zinc-700 w-full max-w-md shadow-2xl pointer-events-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-800">
                  <h2 className="font-serif text-base font-bold text-zinc-100">
                    {modalDefs[active].title}
                  </h2>
                  <button
                    id="modal-close-btn"
                    onClick={() => setActive(null)}
                    className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-5">{modalDefs[active].body}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
