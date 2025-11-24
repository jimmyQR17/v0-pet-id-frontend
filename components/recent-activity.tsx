import { Card } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      type: "Nuevo Dueño",
      name: "Carlos Rodríguez",
      time: "Hace 10 minutos",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "bg-primary/10 text-primary",
    },
    {
      type: "Nueva Mascota",
      name: "Rocky - Perro Pastor Alemán",
      time: "Hace 25 minutos",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
      ),
      color: "bg-accent/10 text-accent",
    },
    {
      type: "Actualización",
      name: "Información de Luna actualizada",
      time: "Hace 1 hora",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      color: "bg-secondary/10 text-secondary",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Actividad Reciente</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`${activity.color} p-2 rounded-lg`}>{activity.icon}</div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{activity.type}</p>
              <p className="text-sm text-muted-foreground">{activity.name}</p>
            </div>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
