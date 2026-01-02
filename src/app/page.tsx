import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  // 1. If you already have a session (are logged in), go directly to the Dashboard.
  if (session) {
    redirect('/dashboard')
  }

  // 2. If you are not logged in, please be redirected to the login page.
  redirect('/login')

  // There's no need to return JSX because it's already redirected.
}