"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Dueno {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  estado: "ACTIVE" | "INACTIVE" | "DELETED"
}

export default function DuenosPage() {
  const [duenos, setDuenos] = useState<Dueno[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchDuenos()
  }, [])

  const fetchDuenos = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulated data
      setDuenos([
        {
          id: 1,
          nombre: "Juan",
          apellido: "Pérez",
          email: "juan@email.com",
          telefono: "123456789",
          direccion: "Calle 123",
          estado: "ACTIVE",
        },
        {
          id: 2,
          nombre: "María",
          apellido: "García",
          email: "maria@email.com",
          telefono: "987654321",
          direccion: "Avenida 456",
          estado: "ACTIVE",
        },
      ])
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching duenos:", err)
      setLoading(false)
    }
  }

  const filteredDuenos = duenos.filter(
    (dueno) =>
      `${dueno.nombre} ${dueno.apellido}`.toLowerCase().includes(search.toLowerCase()) ||
      dueno.email.toLowerCase().includes(search.toLowerCase()),
  )

  const getEstadoBadge = (estado: string) => {
    const variants = {
      ACTIVE: "bg-secondary text-secondary-foreground",
      INACTIVE: "bg-muted text-muted-foreground",
      DELETED: "bg-destructive text-destructive-foreground",
    }
    return variants[estado as keyof typeof variants] || variants.ACTIVE
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dueños</h1>
            <p className="text-muted-foreground">Gestiona la información de los dueños de mascotas</p>
          </div>
          <Button onClick={() => router.push("/duenos/nuevo")} className="btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Dueño
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <Input
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Cargando dueños...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Teléfono</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Dirección</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-hover">
                  {filteredDuenos.map((dueno) => (
                    <tr key={dueno.id} className="border-b border-border">
                      <td className="py-3 px-4">
                        <div className="font-medium">
                          {dueno.nombre} {dueno.apellido}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{dueno.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{dueno.telefono}</td>
                      <td className="py-3 px-4 text-muted-foreground">{dueno.direccion}</td>
                      <td className="py-3 px-4">
                        <Badge className={getEstadoBadge(dueno.estado)}>{dueno.estado}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/mascotas?duenoId=${dueno.id}`)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                              />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/duenos/${dueno.id}/editar`)}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
