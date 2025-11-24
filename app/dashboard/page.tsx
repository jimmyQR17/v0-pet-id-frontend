import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  // TODO: Check authentication
  // const token = cookies().get('token')
  // if (!token) redirect('/login')

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido al sistema de gestión PetID</p>
        </div>

        <StatsCards />

        <div className="mt-8">
          <RecentActivity />
        </div>
      </main>
    </div>
  )
}
