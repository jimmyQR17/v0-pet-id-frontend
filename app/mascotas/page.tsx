"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Mascota {
  id: number
  nombre: string
  especie: string
  raza: string
  fechaNacimiento: string
  sexo: string
  color: string
  estado: "ACTIVE" | "INACTIVE" | "DELETED"
  duenoNombre: string
}

export default function MascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const duenoId = searchParams.get("duenoId")

  useEffect(() => {
    fetchMascotas()
  }, [duenoId])

  const fetchMascotas = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulated data
      setMascotas([
        {
          id: 1,
          nombre: "Max",
          especie: "Perro",
          raza: "Labrador",
          fechaNacimiento: "2020-05-15",
          sexo: "Macho",
          color: "Amarillo",
          estado: "ACTIVE",
          duenoNombre: "Juan Pérez",
        },
        {
          id: 2,
          nombre: "Luna",
          especie: "Gato",
          raza: "Siamés",
          fechaNacimiento: "2021-03-20",
          sexo: "Hembra",
          color: "Blanco",
          estado: "ACTIVE",
          duenoNombre: "María García",
        },
      ])
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching mascotas:", err)
      setLoading(false)
    }
  }

  const filteredMascotas = mascotas.filter(
    (mascota) =>
      mascota.nombre.toLowerCase().includes(search.toLowerCase()) ||
      mascota.especie.toLowerCase().includes(search.toLowerCase()) ||
      mascota.raza.toLowerCase().includes(search.toLowerCase()),
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
            <h1 className="text-3xl font-bold text-foreground mb-2">{duenoId ? "Mascotas del Dueño" : "Mascotas"}</h1>
            <p className="text-muted-foreground">Gestiona la información de las mascotas</p>
          </div>
          <Button
            onClick={() => router.push(`/mascotas/nueva${duenoId ? `?duenoId=${duenoId}` : ""}`)}
            className="btn-accent"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Mascota
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <Input
              placeholder="Buscar por nombre, especie o raza..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Cargando mascotas...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Especie</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Raza</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Sexo</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Color</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Dueño</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-hover">
                  {filteredMascotas.map((mascota) => (
                    <tr key={mascota.id} className="border-b border-border">
                      <td className="py-3 px-4">
                        <div className="font-medium">{mascota.nombre}</div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{mascota.especie}</td>
                      <td className="py-3 px-4 text-muted-foreground">{mascota.raza}</td>
                      <td className="py-3 px-4 text-muted-foreground">{mascota.sexo}</td>
                      <td className="py-3 px-4 text-muted-foreground">{mascota.color}</td>
                      <td className="py-3 px-4 text-muted-foreground">{mascota.duenoNombre}</td>
                      <td className="py-3 px-4">
                        <Badge className={getEstadoBadge(mascota.estado)}>{mascota.estado}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/mascotas/${mascota.id}`)}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/mascotas/${mascota.id}/editar`)}
                          >
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
