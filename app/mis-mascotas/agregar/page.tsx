"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OwnerHeader } from "@/components/owner-header"

export default function AgregarMascotaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    idEspecie: "",
    idRaza: "",
    sexo: "",
    fechaNacimiento: "",
    idColor: "",
    idTalla: "",
    pesoKg: "",
    codigoMicrochip: "",
    castrado: "no",
    alergias: "",
    condicionesCronicas: "",
    notas: "",
  })

  const especies = ["Perro", "Gato", "Conejo", "Hamster", "Pájaro", "Otro"]
  const razasPerro = ["Labrador", "Pastor Alemán", "Golden Retriever", "Bulldog", "Beagle", "Poodle"]
  const razasGato = ["Siamés", "Persa", "Bengalí", "Británico de Pelo Corto", "Maine Coon"]
  const colores = ["Negro", "Blanco", "Marrón", "Rojo", "Gris", "Multicolor"]
  const tallas = ["Pequeño", "Mediano", "Grande", "Muy Grande"]

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const token = localStorage.getItem("token")

      const response = await fetch(`${apiUrl}/api/mascotas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/mis-mascotas")
        }, 1500)
      } else {
        console.log("[v0] Error creating mascota:", response.statusText)
        alert("Error al guardar la mascota")
      }
    } catch (err) {
      console.log("[v0] Error:", err)
      alert("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <OwnerHeader />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">¡Mascota Registrada!</h2>
            <p className="text-muted-foreground">Tu mascota ha sido añadida exitosamente</p>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Registrar Nueva Mascota</h1>
          <p className="text-muted-foreground">Completa la información de tu compañero</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* Información Básica */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Información Básica</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre*</Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Max"
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo*</Label>
                  <Select value={formData.sexo} onValueChange={(value) => handleChange("sexo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Macho">Macho</SelectItem>
                      <SelectItem value="Hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="especie">Especie*</Label>
                  <Select value={formData.idEspecie} onValueChange={(value) => handleChange("idEspecie", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona especie" />
                    </SelectTrigger>
                    <SelectContent>
                      {especies.map((especie) => (
                        <SelectItem key={especie} value={especie}>
                          {especie}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="raza">Raza*</Label>
                  <Select value={formData.idRaza} onValueChange={(value) => handleChange("idRaza", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona raza" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.idEspecie === "Perro"
                        ? razasPerro.map((raza) => (
                            <SelectItem key={raza} value={raza}>
                              {raza}
                            </SelectItem>
                          ))
                        : formData.idEspecie === "Gato"
                          ? razasGato.map((raza) => (
                              <SelectItem key={raza} value={raza}>
                                {raza}
                              </SelectItem>
                            ))
                          : null}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento*</Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pesoKg">Peso (kg)*</Label>
                  <Input
                    id="pesoKg"
                    type="number"
                    step="0.1"
                    placeholder="Ej: 25.5"
                    value={formData.pesoKg}
                    onChange={(e) => handleChange("pesoKg", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Características Físicas */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Características Físicas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color*</Label>
                  <Select value={formData.idColor} onValueChange={(value) => handleChange("idColor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colores.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="talla">Talla*</Label>
                  <Select value={formData.idTalla} onValueChange={(value) => handleChange("idTalla", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona talla" />
                    </SelectTrigger>
                    <SelectContent>
                      {tallas.map((talla) => (
                        <SelectItem key={talla} value={talla}>
                          {talla}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="castrado">Castrado/Esterilizado</Label>
                  <Select value={formData.castrado} onValueChange={(value) => handleChange("castrado", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Castrado?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="microchip">Código Microchip</Label>
                  <Input
                    id="microchip"
                    placeholder="Código del microchip"
                    value={formData.codigoMicrochip}
                    onChange={(e) => handleChange("codigoMicrochip", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Información de Salud */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Información de Salud</h2>

              <div className="space-y-2">
                <Label htmlFor="alergias">Alergias</Label>
                <Textarea
                  id="alergias"
                  placeholder="Ej: Alergia al pollo, sensibilidad al trigo..."
                  value={formData.alergias}
                  onChange={(e) => handleChange("alergias", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condiciones">Condiciones Crónicas</Label>
                <Textarea
                  id="condiciones"
                  placeholder="Ej: Diabetes, artritis, enfermedad renal..."
                  value={formData.condicionesCronicas}
                  onChange={(e) => handleChange("condicionesCronicas", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notas">Notas Adicionales</Label>
                <Textarea
                  id="notas"
                  placeholder="Información adicional sobre tu mascota..."
                  value={formData.notas}
                  onChange={(e) => handleChange("notas", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 btn-primary" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Mascota"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
