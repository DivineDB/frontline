import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProtest, protests } from '@/app/data/protests'
import ProtestPageClient from './ProtestPageClient'

export async function generateStaticParams() {
  return protests.map((p) => ({ id: p.id }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const protest = getProtest(id)
  if (!protest) return {}
  return {
    title: `${protest.title} | Frontline Link`,
    description: protest.description,
  }
}

export default async function ProtestPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const protest = getProtest(id)
  if (!protest) notFound()

  return <ProtestPageClient protest={protest} />
}
