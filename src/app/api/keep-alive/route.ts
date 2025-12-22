import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // บังคับไม่ให้ cache

export async function GET() {
    try {
        // สั่งเขียนข้อมูลเล็กๆ ลง Redis เพื่อบอกว่า "ฉันยังอยู่นะ"
        await db.set('keep-alive-ping', new Date().toISOString())

        return NextResponse.json({ message: 'Redis pinged successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to ping Redis' }, { status: 500 })
    }
}