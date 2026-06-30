import { page } from '@/lib/page-styles'

type PageHeaderProps = {
  title: string
  description: string
  accent?: 'orange' | 'grey'
}

export default function PageHeader({ title, description, accent = 'orange' }: PageHeaderProps) {
  return (
    <header style={page.hero}>
      <div style={page.heroInner}>
        <div style={{ ...page.accent, background: accent === 'grey' ? '#8C8C8C' : '#F5830A' }} />
        <h1 style={page.h1}>{title}</h1>
        <p style={page.lead}>{description}</p>
      </div>
    </header>
  )
}
