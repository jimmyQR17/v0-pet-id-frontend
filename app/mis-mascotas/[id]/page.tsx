"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OwnerHeader } from "@/components/owner-header"

interface Mascota {
  id: number
  nombre: string
  especie: string
  raza: string
  fechaNacimiento: string
  sexo: string
  color: string
  peso: string
  microchip?: string
  codigoNFC: string
  foto?: string
  observaciones?: string
}

export default function DetalleMascotaPage() {
  const [mascota, setMascota] = useState<Mascota | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("historial")
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    fetchMascota()
  }, [])

  const fetchMascota = async () => {
    try {
      setMascota({
        id: 1,
        nombre: "Max",
        especie: "Perro",
        raza: "Labrador",
        fechaNacimiento: "2020-05-15",
        sexo: "Macho",
        color: "Amarillo",
        peso: "25 kg",
        microchip: "123456789012345",
        codigoNFC: "PET-MAX-2024-001",
        observaciones: "Muy juguetón y amigable con otros perros",
      })
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching mascota:", err)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <OwnerHeader />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!mascota) {
    return (
      <div className="min-h-screen bg-background">
        <OwnerHeader />
        <div className="text-center py-12">
          <p>Mascota no encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.push("/mis-mascotas")} className="mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  {mascota.foto ? (
                    <img
                      src={mascota.foto || "/placeholder.svg"}
                      alt={mascota.nombre}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg className="w-16 h-16 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 11C9.7909 11 8 12.7909 8 15V19C8 20.1046 8.89543 21 10 21H14C15.1046 21 16 20.1046 16 19V15C16 12.7909 14.2091 11 12 11Z" />
                    </svg>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-1">{mascota.nombre}</h2>
                <p className="text-muted-foreground mb-4">
                  {mascota.raza} • {calcularEdad(mascota.fechaNacimiento)} años
                </p>

                <Badge className="bg-secondary text-secondary-foreground mb-6">{mascota.especie}</Badge>

                <div className="space-y-3 text-left">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Sexo</span>
                    <span className="font-medium">{mascota.sexo}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Color</span>
                    <span className="font-medium">{mascota.color}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Peso</span>
                    <span className="font-medium">{mascota.peso}</span>
                  </div>
                  {mascota.microchip && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Microchip</span>
                      <span className="font-medium text-xs">{mascota.microchip}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full btn-primary"
                    onClick={() => router.push(`/mis-mascotas/${mascota.id}/editar`)}
                  >
                    Editar Información
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push(`/mis-mascotas/${mascota.id}/tratamientos`)}
                  >
                    Ver Tratamientos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push(`/mis-mascotas/${mascota.id}/collar`)}
                  >
                    Ver Collar Digital
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="historial">Historial Médico</TabsTrigger>
                <TabsTrigger value="vacunas">Vacunas</TabsTrigger>
                <TabsTrigger value="info">Información</TabsTrigger>
              </TabsList>

              <TabsContent value="historial" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Historial Médico</h3>
                    <Button onClick={() => router.push(`/mis-mascotas/${mascota.id}/historial/agregar`)}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Agregar Registro
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">Consulta General</h4>
                          <p className="text-sm text-muted-foreground">15 de Marzo, 2024</p>
                        </div>
                        <Badge>Consulta</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Chequeo rutinario. Mascota en buen estado de salud. Peso: 25kg.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Dr. Juan Pérez - Clínica Veterinaria Central</p>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">Vacunación Anual</h4>
                          <p className="text-sm text-muted-foreground">20 de Enero, 2024</p>
                        </div>
                        <Badge className="bg-secondary text-secondary-foreground">Vacuna</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Vacuna múltiple (Parvovirus, Distemper, Hepatitis)
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Dra. María García - Veterinaria San Juan</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="vacunas" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Control de Vacunas</h3>

                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Vacuna Múltiple</h4>
                        <Badge className="bg-secondary text-secondary-foreground">Al día</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Última aplicación: 20/01/2024</p>
                      <p className="text-sm text-muted-foreground">Próxima dosis: 20/01/2025</p>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Antirrábica</h4>
                        <Badge className="bg-secondary text-secondary-foreground">Al día</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Última aplicación: 15/02/2024</p>
                      <p className="text-sm text-muted-foreground">Próxima dosis: 15/02/2025</p>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Desparasitación</h4>
                        <Badge className="bg-accent text-accent-foreground">Próxima</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Última aplicación: 10/03/2024</p>
                      <p className="text-sm font-medium text-accent">Próxima dosis: 10/06/2024 (Vencida)</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="info" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Información Adicional</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Código NFC/QR</h4>
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <code className="text-sm font-mono flex-1">{mascota.codigoNFC}</code>
                        <Button size="sm" variant="ghost">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    {mascota.observaciones && (
                      <div>
                        <h4 className="font-medium mb-2">Observaciones</h4>
                        <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">{mascota.observaciones}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Fecha de Nacimiento</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(mascota.fechaNacimiento).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
