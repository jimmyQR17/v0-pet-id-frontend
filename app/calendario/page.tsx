"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OwnerHeader } from "@/components/owner-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Cita {
  id: number
  mascotaId: number
  mascotaNombre: string
  titulo: string
  fecha: string
  hora: string
  tipo: "consulta" | "vacuna" | "cirugia" | "control" | "otro"
  veterinario?: string
  clinica?: string
  notas?: string
  estado: "pendiente" | "confirmada" | "completada" | "cancelada"
}

const tipoColors = {
  consulta: "bg-blue-500",
  vacuna: "bg-green-500",
  cirugia: "bg-red-500",
  control: "bg-purple-500",
  otro: "bg-gray-500",
}

export default function CalendarioPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [showNewCitaDialog, setShowNewCitaDialog] = useState(false)
  const [newCita, setNewCita] = useState({
    mascota: "",
    titulo: "",
    fecha: "",
    hora: "",
    tipo: "consulta",
    veterinario: "",
    clinica: "",
    notas: "",
  })
  const router = useRouter()

  useEffect(() => {
    fetchCitas()
  }, [])

  const fetchCitas = async () => {
    try {
      setCitas([
        {
          id: 1,
          mascotaId: 1,
          mascotaNombre: "Max",
          titulo: "Chequeo anual",
          fecha: "2024-11-28",
          hora: "10:00",
          tipo: "consulta",
          veterinario: "Dr. Juan Pérez",
          clinica: "Veterinaria Central",
          estado: "confirmada",
        },
        {
          id: 2,
          mascotaId: 2,
          mascotaNombre: "Luna",
          titulo: "Vacuna antirrábica",
          fecha: "2024-11-30",
          hora: "15:30",
          tipo: "vacuna",
          veterinario: "Dra. María García",
          clinica: "Clínica San Juan",
          estado: "pendiente",
        },
        {
          id: 3,
          mascotaId: 1,
          mascotaNombre: "Max",
          titulo: "Control post-operatorio",
          fecha: "2024-12-05",
          hora: "11:00",
          tipo: "control",
          veterinario: "Dr. Juan Pérez",
          clinica: "Veterinaria Central",
          estado: "pendiente",
        },
      ])
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching citas:", err)
      setLoading(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)

  const getCitasForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return citas.filter((cita) => cita.fecha === dateStr)
  }

  const getCitasTitles = (citasForDay: Cita[]) => {
    if (citasForDay.length === 0) return []
    return citasForDay.slice(0, 2).map((cita) => ({
      titulo: cita.titulo,
      hora: cita.hora,
      tipo: cita.tipo,
    }))
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const getUpcomingCitas = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return citas
      .filter((cita) => new Date(cita.fecha) >= today && cita.estado !== "cancelada" && cita.estado !== "completada")
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, 3)
  }

  const handleAddCita = () => {
    if (newCita.mascota && newCita.titulo && newCita.fecha && newCita.hora) {
      const nuevaCita: Cita = {
        id: citas.length + 1,
        mascotaId: Number.parseInt(newCita.mascota),
        mascotaNombre: newCita.mascota === "1" ? "Max" : "Luna",
        titulo: newCita.titulo,
        fecha: newCita.fecha,
        hora: newCita.hora,
        tipo: newCita.tipo as Cita["tipo"],
        veterinario: newCita.veterinario,
        clinica: newCita.clinica,
        notas: newCita.notas,
        estado: "pendiente",
      }
      setCitas([...citas, nuevaCita])
      setShowNewCitaDialog(false)
      setNewCita({
        mascota: "",
        titulo: "",
        fecha: "",
        hora: "",
        tipo: "consulta",
        veterinario: "",
        clinica: "",
        notas: "",
      })
    }
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendario de Citas</h1>
          <p className="text-muted-foreground">Gestiona las citas veterinarias de tus mascotas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {monthNames[month]} {year}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={previousMonth}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const citasForDay = getCitasForDate(day)
                  const citasTitles = getCitasTitles(citasForDay)
                  const isToday =
                    day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

                  return (
                    <div
                      key={day}
                      className={`aspect-square border border-border rounded-lg p-2 hover:bg-muted/50 cursor-pointer transition-colors ${
                        isToday ? "bg-primary/10 border-primary" : ""
                      }`}
                      onClick={() => setSelectedDate(new Date(year, month, day))}
                    >
                      <div className={`text-sm font-semibold mb-1 ${isToday ? "text-primary" : ""}`}>{day}</div>
                      <div className="space-y-1">
                        {citasTitles.map((evento, idx) => (
                          <div
                            key={idx}
                            className="text-xs px-1 py-0.5 rounded text-white bg-primary truncate"
                            title={`${evento.hora} - ${evento.titulo}`}
                          >
                            {evento.hora} {evento.titulo.substring(0, 8)}...
                          </div>
                        ))}
                        {citasForDay.length > 2 && (
                          <div className="text-xs text-muted-foreground px-1">+{citasForDay.length - 2} más</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <Dialog open={showNewCitaDialog} onOpenChange={setShowNewCitaDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full btn-accent">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Agendar Nueva Cita
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Nueva Cita</DialogTitle>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleAddCita()
                      }}
                    >
                      <div className="space-y-2">
                        <Label>Mascota</Label>
                        <Select
                          value={newCita.mascota}
                          onValueChange={(value) => setNewCita({ ...newCita, mascota: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una mascota" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Max</SelectItem>
                            <SelectItem value="2">Luna</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input
                          placeholder="Ej: Chequeo anual"
                          value={newCita.titulo}
                          onChange={(e) => setNewCita({ ...newCita, titulo: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Fecha</Label>
                          <Input
                            type="date"
                            value={newCita.fecha}
                            onChange={(e) => setNewCita({ ...newCita, fecha: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hora</Label>
                          <Input
                            type="time"
                            value={newCita.hora}
                            onChange={(e) => setNewCita({ ...newCita, hora: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select value={newCita.tipo} onValueChange={(value) => setNewCita({ ...newCita, tipo: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo de cita" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consulta">Consulta</SelectItem>
                            <SelectItem value="vacuna">Vacuna</SelectItem>
                            <SelectItem value="cirugia">Cirugía</SelectItem>
                            <SelectItem value="control">Control</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Veterinario</Label>
                        <Input
                          placeholder="Nombre del veterinario"
                          value={newCita.veterinario}
                          onChange={(e) => setNewCita({ ...newCita, veterinario: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Clínica</Label>
                        <Input
                          placeholder="Nombre de la clínica"
                          value={newCita.clinica}
                          onChange={(e) => setNewCita({ ...newCita, clinica: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Notas</Label>
                        <Textarea
                          placeholder="Información adicional..."
                          rows={3}
                          value={newCita.notas}
                          onChange={(e) => setNewCita({ ...newCita, notas: e.target.value })}
                        />
                      </div>

                      <Button type="submit" className="w-full btn-primary">
                        Agendar Cita
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>

          {/* Upcoming appointments */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Próximas Citas</h3>

              <div className="space-y-4">
                {getUpcomingCitas().length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No tienes citas próximas</p>
                ) : (
                  getUpcomingCitas().map((cita) => (
                    <div
                      key={cita.id}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">{cita.titulo}</h4>
                          <p className="text-xs text-muted-foreground">{cita.mascotaNombre}</p>
                        </div>
                        <Badge className={`${tipoColors[cita.tipo]} text-white text-xs`}>{cita.tipo}</Badge>
                      </div>

                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(cita.fecha).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                          })}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {cita.hora}
                        </div>
                        {cita.veterinario && (
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {cita.veterinario}
                          </div>
                        )}
                      </div>

                      {cita.estado === "pendiente" && (
                        <Button size="sm" variant="outline" className="w-full mt-3 text-xs bg-transparent">
                          Confirmar cita
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Legend */}
            <Card className="p-4 mt-4">
              <h4 className="font-semibold text-sm mb-3">Tipos de cita</h4>
              <div className="space-y-2">
                {Object.entries(tipoColors).map(([tipo, color]) => (
                  <div key={tipo} className="flex items-center text-xs">
                    <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
                    <span className="capitalize">{tipo}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
