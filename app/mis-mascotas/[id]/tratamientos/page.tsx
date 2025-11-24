"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OwnerHeader } from "@/components/owner-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Tratamiento {
  id: number
  nombre: string
  tipo: "medicamento" | "terapia" | "dieta" | "suplemento"
  dosis: string
  frecuencia: string
  horarios: string[]
  fechaInicio: string
  fechaFin?: string
  notas?: string
  activo: boolean
}

interface RegistroTratamiento {
  id: number
  tratamientoId: number
  fecha: string
  hora: string
  administrado: boolean
  notas?: string
}

export default function TratamientosPage() {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([])
  const [registros, setRegistros] = useState<RegistroTratamiento[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewTratamientoDialog, setShowNewTratamientoDialog] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "medicamento" as const,
    dosis: "",
    frecuencia: "",
    horarios: "",
    fechaInicio: "",
    fechaFin: "",
    notas: "",
  })
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    fetchTratamientos()
    fetchRegistros()
  }, [])

  const fetchTratamientos = async () => {
    try {
      setTratamientos([
        {
          id: 1,
          nombre: "Antibiótico Amoxicilina",
          tipo: "medicamento",
          dosis: "250mg",
          frecuencia: "Cada 12 horas",
          horarios: ["08:00", "20:00"],
          fechaInicio: "2024-11-20",
          fechaFin: "2024-11-30",
          notas: "Tomar con comida",
          activo: true,
        },
        {
          id: 2,
          nombre: "Suplemento vitamínico",
          tipo: "suplemento",
          dosis: "1 tableta",
          frecuencia: "Una vez al día",
          horarios: ["09:00"],
          fechaInicio: "2024-11-01",
          notas: "Puede mezclarse con la comida",
          activo: true,
        },
      ])
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching tratamientos:", err)
      setLoading(false)
    }
  }

  const fetchRegistros = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]
      setRegistros([
        {
          id: 1,
          tratamientoId: 1,
          fecha: today,
          hora: "08:00",
          administrado: true,
        },
        {
          id: 2,
          tratamientoId: 1,
          fecha: today,
          hora: "20:00",
          administrado: false,
        },
        {
          id: 3,
          tratamientoId: 2,
          fecha: today,
          hora: "09:00",
          administrado: true,
        },
      ])
    } catch (err) {
      console.log("[v0] Error fetching registros:", err)
    }
  }

  const handleSaveTratamiento = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const horariosArray = formData.horarios.split(",").map((h) => h.trim())

      const nuevoTratamiento: Tratamiento = {
        id: Math.max(...tratamientos.map((t) => t.id), 0) + 1,
        nombre: formData.nombre,
        tipo: formData.tipo as "medicamento" | "terapia" | "dieta" | "suplemento",
        dosis: formData.dosis,
        frecuencia: formData.frecuencia,
        horarios: horariosArray,
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin || undefined,
        notas: formData.notas || undefined,
        activo: true,
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const token = localStorage.getItem("token")

      setTratamientos([...tratamientos, nuevoTratamiento])

      const today = new Date().toISOString().split("T")[0]
      const nuevosRegistros = horariosArray.map((hora, idx) => ({
        id: Math.max(...registros.map((r) => r.id), 0) + 1 + idx,
        tratamientoId: nuevoTratamiento.id,
        fecha: today,
        hora: hora,
        administrado: false,
      }))

      setRegistros([...registros, ...nuevosRegistros])

      setSuccessMessage(`Tratamiento "${formData.nombre}" registrado exitosamente!`)
      setTimeout(() => setSuccessMessage(""), 3000)

      setFormData({
        nombre: "",
        tipo: "medicamento",
        dosis: "",
        frecuencia: "",
        horarios: "",
        fechaInicio: "",
        fechaFin: "",
        notas: "",
      })
      setShowNewTratamientoDialog(false)
    } catch (err) {
      console.log("[v0] Error saving tratamiento:", err)
    }
  }

  const getTodayRegistros = () => {
    const today = new Date().toISOString().split("T")[0]
    return registros.filter((r) => r.fecha === today)
  }

  const toggleRegistro = (registroId: number) => {
    setRegistros((prev) => prev.map((r) => (r.id === registroId ? { ...r, administrado: !r.administrado } : r)))
  }

  const getTratamientoById = (id: number) => {
    return tratamientos.find((t) => t.id === id)
  }

  const tipoIcons = {
    medicamento: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    terapia: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    dieta: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    suplemento: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  }

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.push(`/mis-mascotas/${params.id}`)} className="mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tratamientos Médicos</h1>
          <p className="text-muted-foreground">Gestiona medicamentos y tratamientos diarios</p>
        </div>

        {successMessage && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Hoy</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>

              <div className="space-y-3">
                {getTodayRegistros().length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No hay tratamientos programados para hoy
                  </p>
                ) : (
                  getTodayRegistros().map((registro) => {
                    const tratamiento = getTratamientoById(registro.tratamientoId)
                    if (!tratamiento) return null

                    return (
                      <div
                        key={registro.id}
                        className={`border rounded-lg p-3 transition-all ${
                          registro.administrado ? "bg-green-50 border-green-200" : "bg-background border-border"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={registro.administrado}
                            onCheckedChange={() => toggleRegistro(registro.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{registro.hora}</span>
                              {registro.administrado && (
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <p className="text-sm font-medium">{tratamiento.nombre}</p>
                            <p className="text-xs text-muted-foreground">{tratamiento.dosis}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <Button className="w-full mt-6 btn-accent" onClick={() => setShowNewTratamientoDialog(true)}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Tratamiento
              </Button>
            </Card>
          </div>

          {/* Active Treatments */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Tratamientos Activos</h3>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : tratamientos.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No hay tratamientos registrados</p>
              ) : (
                <div className="space-y-4">
                  {tratamientos
                    .filter((t) => t.activo)
                    .map((tratamiento) => (
                      <div key={tratamiento.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              {tipoIcons[tratamiento.tipo]}
                            </div>
                            <div>
                              <h4 className="font-semibold">{tratamiento.nombre}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{tratamiento.tipo}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-500 text-white">Activo</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Dosis</p>
                            <p className="text-sm font-medium">{tratamiento.dosis}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Frecuencia</p>
                            <p className="text-sm font-medium">{tratamiento.frecuencia}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-2">Horarios</p>
                          <div className="flex flex-wrap gap-2">
                            {tratamiento.horarios.map((hora) => (
                              <Badge key={hora} variant="outline" className="bg-background">
                                {hora}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Inicio:</span>{" "}
                            {new Date(tratamiento.fechaInicio).toLocaleDateString()}
                          </div>
                          {tratamiento.fechaFin && (
                            <div>
                              <span className="font-medium">Fin:</span>{" "}
                              {new Date(tratamiento.fechaFin).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        {tratamiento.notas && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-xs text-muted-foreground">{tratamiento.notas}</p>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Finalizar
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* New Treatment Dialog */}
        <Dialog open={showNewTratamientoDialog} onOpenChange={setShowNewTratamientoDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nuevo Tratamiento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveTratamiento} className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre del tratamiento</Label>
                <Input
                  placeholder="Ej: Antibiótico Amoxicilina"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) => setFormData({ ...formData, tipo: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicamento">Medicamento</SelectItem>
                    <SelectItem value="suplemento">Suplemento</SelectItem>
                    <SelectItem value="terapia">Terapia</SelectItem>
                    <SelectItem value="dieta">Dieta especial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Dosis</Label>
                  <Input
                    placeholder="Ej: 250mg"
                    value={formData.dosis}
                    onChange={(e) => setFormData({ ...formData, dosis: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Frecuencia</Label>
                  <Input
                    placeholder="Ej: Cada 12 horas"
                    value={formData.frecuencia}
                    onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Horarios (separados por coma)</Label>
                <Input
                  placeholder="Ej: 08:00, 20:00"
                  value={formData.horarios}
                  onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha inicio</Label>
                  <Input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fecha fin (opcional)</Label>
                  <Input
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notas adicionales</Label>
                <Textarea
                  placeholder="Instrucciones especiales..."
                  rows={3}
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full btn-primary">
                Crear Tratamiento
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
