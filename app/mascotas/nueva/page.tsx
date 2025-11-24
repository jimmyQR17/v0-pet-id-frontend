"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NuevaMascotaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const duenoId = searchParams.get("duenoId")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    sexo: "",
    color: "",
    peso: "",
    numeroMicrochip: "",
    duenoId: duenoId || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/mascotas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess("Mascota creada exitosamente")
        setTimeout(() => router.push("/mascotas"), 1500)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Error al crear mascota")
      }
    } catch (err) {
      setError("Error de conexión. Por favor intente nuevamente.")
      console.log("[v0] Error creating mascota:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Nueva Mascota</h1>
          <p className="text-muted-foreground">Completa el formulario para registrar una nueva mascota</p>
        </div>

        <Card className="p-8 max-w-3xl">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-secondary text-secondary-foreground border-secondary">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Información Básica</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="especie">Especie *</Label>
                  <Input
                    id="especie"
                    name="especie"
                    value={formData.especie}
                    onChange={handleChange}
                    placeholder="Ej: Perro, Gato, Ave"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="raza">Raza *</Label>
                  <Input id="raza" name="raza" value={formData.raza} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                  <Input
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Características</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo *</Label>
                  <select
                    id="sexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input id="peso" name="peso" type="number" step="0.1" value={formData.peso} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Identificación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="numeroMicrochip">Número de Microchip</Label>
                  <Input
                    id="numeroMicrochip"
                    name="numeroMicrochip"
                    value={formData.numeroMicrochip}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duenoId">ID del Dueño *</Label>
                  <Input
                    id="duenoId"
                    name="duenoId"
                    type="number"
                    value={formData.duenoId}
                    onChange={handleChange}
                    required
                    disabled={!!duenoId}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="btn-accent">
                {loading ? "Guardando..." : "Guardar Mascota"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
