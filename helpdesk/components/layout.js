import Navigation from './navigation'

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main className="main">{children}</main>
    </>
  )
}
