import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/issues">
        <a>Alle henvendelser</a>
      </Link>
      <Link href="/issues/create">
        <a>Ny henvendelse</a>
      </Link>
    </nav>
  )
}
