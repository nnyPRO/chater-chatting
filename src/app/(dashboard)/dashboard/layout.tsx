// src\app\(dashboard)\dashboard\layout.tsx
import Dashboard from "@/components/Dashboard"
import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"


export default async function DashboardLayout({ children, }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const unseenRequestCount = (
        (await fetchRedis(
            'smembers',
            `user:${session.user.id}:incoming_friend_requests`
        )) as User[]
    ).length

    return (
        <Dashboard requestCount={unseenRequestCount}>{children}</Dashboard>
    )
}