import SupportForm from '@/components/SupportForm'
import SupportList from '@/components/SupportList'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/issues')
  })

  return (
    <main>
      <SupportForm />
      <SupportList/>
    </main>
  )
}
