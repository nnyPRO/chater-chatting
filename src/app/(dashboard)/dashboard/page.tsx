import { redirect } from "next/navigation";

// Because Next.js has a rule that says "I will find a default export to display as a web page."
export default function DashboardPage() {
    redirect('/dashboard/chat')
}