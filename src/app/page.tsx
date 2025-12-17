// src/app/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' // ต้อง import authOptions ของคุณมา
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  // 1. ถ้ามี session แล้ว (Login แล้ว) ให้ไปหน้า Dashboard เลย
  if (session) {
    redirect('/dashboard')
  }

  // 2. ถ้ายังไม่ Login ให้ดีดไปหน้า Login
  redirect('/login')

  // ไม่ต้อง return JSX อะไร เพราะมัน redirect ไปก่อนแล้ว
}