// src\app\(dashboard)\dashboard\layout.tsx
import Dashboard from "@/components/Dashboard"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Dashboard>{children}</Dashboard>
    )
}