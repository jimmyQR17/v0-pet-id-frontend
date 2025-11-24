"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OwnerHeader } from "@/components/owner-header"

interface Mascota {
  id: number
  nombre: string
  especie: string
  raza: string
  fechaNacimiento: string
  sexo: string
  foto?: string
  codigoNFC: string
}

export default function MisMascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchMascotas()
  }, [])

  const fetchMascotas = async () => {
    try {
      // TODO: Replace with actual API call using owner's token
      // Simulated data
      setMascotas([
        {
          id: 1,
          nombre: "Max",
          especie: "Perro",
          raza: "Labrador",
          fechaNacimiento: "2020-05-15",
          sexo: "Macho",
          codigoNFC: "PET-MAX-2024-001",
        },
        {
          id: 2,
          nombre: "Luna",
          especie: "Gato",
          raza: "Siamés",
          fechaNacimiento: "2021-03-20",
          sexo: "Hembra",
          codigoNFC: "PET-LUNA-2024-002",
        },
      ])
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching mascotas:", err)
      setLoading(false)
    }
  }

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
          <p className="text-muted-foreground">Gestiona la información de tus compañeros peludos</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Cargando tus mascotas...</p>
          </div>
        ) : mascotas.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No tienes mascotas registradas</h3>
            <p className="text-muted-foreground mb-6">Comienza registrando a tu primera mascota</p>
            <Button onClick={() => router.push("/mis-mascotas/agregar")} className="btn-accent">
              Agregar Mi Primera Mascota
            </Button>
          </Card>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <Button onClick={() => router.push("/mis-mascotas/agregar")} className="btn-accent">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar Mascota
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mascotas.map((mascota) => (
                <Card
                  key={mascota.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/mis-mascotas/${mascota.id}`)}
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {mascota.foto ? (
                      <img
                        src={mascota.foto || "/placeholder.svg"}
                        alt={mascota.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-24 h-24 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 6C18 4.3431 16.6569 3 15 3C13.3431 3 12 4.3431 12 6C12 7.6569 13.3431 9 15 9C16.6569 9 18 7.6569 18 6Z" />
                        <path d="M6 6C6 4.3431 7.3431 3 9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3431 9 6 7.6569 6 6Z" />
                        <path d="M21 10C21 8.8954 20.1046 8 19 8C17.8954 8 17 8.8954 17 10C17 11.1046 17.8954 12 19 12C20.1046 12 21 11.1046 21 10Z" />
                        <path d="M5 8C3.89543 8 3 8.89543 3 10C3 11.1046 3.89543 12 5 12C6.10457 12 7 11.1046 7 10C7 8.89543 6.10457 8 5 8Z" />
                        <path d="M12 11C9.7909 11 8 12.7909 8 15V19C8 20.1046 8.89543 21 10 21H14C15.1046 21 16 20.1046 16 19V15C16 12.7909 14.2091 11 12 11Z" />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{mascota.nombre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mascota.raza} • {calcularEdad(mascota.fechaNacimiento)} años
                        </p>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">{mascota.especie}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Nacimiento: {new Date(mascota.fechaNacimiento).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Código: {mascota.codigoNFC}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/mis-mascotas/${mascota.id}/historial`)
                        }}
                      >
                        Historial
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/mis-mascotas/${mascota.id}/collar`)
                        }}
                      >
                        Collar Digital
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
