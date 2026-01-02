// src\app\(dashboard)\dashboard\layout.tsx
import Dashboard from "@/components/Dashboard"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    if (!session) notFound()
    return (
        <Dashboard>{children}</Dashboard>
    )
}