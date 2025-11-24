"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OwnerHeader } from "@/components/owner-header"

interface PerfilDueno {
  idDueno: number
  idEstado: number
  nombres: string
  apellidos: string
  tipoDocumento: string
  documento: string
  genero: string
  fechaNacimiento: string
  email: string
  aceptaComunicaciones: boolean
  aceptaTerminos: boolean
}

export default function PerfilPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [perfil, setPerfil] = useState<PerfilDueno>({
    idDueno: 1,
    idEstado: 1,
    nombres: "Juan",
    apellidos: "Pérez García",
    tipoDocumento: "DNI",
    documento: "12345678",
    genero: "Masculino",
    fechaNacimiento: "1990-05-15",
    email: "juan.perez@example.com",
    aceptaComunicaciones: true,
    aceptaTerminos: true,
  })

  const [formData, setFormData] = useState(perfil)

  useEffect(() => {
    fetchPerfil()
  }, [])

  const fetchPerfil = async () => {
    try {
      // TODO: Replace with actual API call
      setLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching perfil:", err)
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    try {
      // TODO: Replace with actual API call
      setPerfil(formData)
      setEditing(false)
    } catch (err) {
      console.log("[v0] Error saving perfil:", err)
    }
  }

  const calcularEdad = (fecha: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fecha)
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
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Cargando perfil...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">Información personal y preferencias</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Perfil Card */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {!editing ? (
                <div className="space-y-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {perfil.nombres} {perfil.apellidos}
                      </h2>
                      <p className="text-muted-foreground">{perfil.email}</p>
                      <p className="text-sm text-muted-foreground mt-1">{calcularEdad(perfil.fechaNacimiento)} años</p>
                    </div>
                    <Button onClick={() => setEditing(true)} className="btn-primary">
                      Editar Perfil
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="text-sm text-muted-foreground">Nombres</p>
                      <p className="font-semibold text-foreground">{perfil.nombres}</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4 py-2">
                      <p className="text-sm text-muted-foreground">Apellidos</p>
                      <p className="font-semibold text-foreground">{perfil.apellidos}</p>
                    </div>

                    <div className="border-l-4 border-accent pl-4 py-2">
                      <p className="text-sm text-muted-foreground">Tipo de Documento</p>
                      <p className="font-semibold text-foreground">{perfil.tipoDocumento}</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="text-sm text-muted-foreground">Documento</p>
                      <p className="font-semibold text-foreground">{perfil.documento}</p>
                    </div>

                    <div className="border-l-4 border-secondary pl-4 py-2">
                      <p className="text-sm text-muted-foreground">Género</p>
                      <p className="font-semibold text-foreground">{perfil.genero}</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4 py-2">
                      <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                      <p className="font-semibold text-foreground">
                        {new Date(perfil.fechaNacimiento).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 mt-6">
                    <h3 className="font-bold text-foreground mb-4">Preferencias</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-foreground">Recibir comunicaciones</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${perfil.aceptaComunicaciones ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                        >
                          {perfil.aceptaComunicaciones ? "Activado" : "Desactivado"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-foreground">Términos Aceptados</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${perfil.aceptaTerminos ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {perfil.aceptaTerminos ? "Sí" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombres</Label>
                      <Input value={formData.nombres} onChange={(e) => handleChange("nombres", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Apellidos</Label>
                      <Input value={formData.apellidos} onChange={(e) => handleChange("apellidos", e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo de Documento</Label>
                      <Select
                        value={formData.tipoDocumento}
                        onValueChange={(value) => handleChange("tipoDocumento", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DNI">DNI</SelectItem>
                          <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                          <SelectItem value="Carnet">Carnet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Documento</Label>
                      <Input value={formData.documento} onChange={(e) => handleChange("documento", e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Género</Label>
                      <Select value={formData.genero} onValueChange={(value) => handleChange("genero", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Femenino">Femenino</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fecha de Nacimiento</Label>
                      <Input
                        type="date"
                        value={formData.fechaNacimiento}
                        onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setEditing(false)
                        setFormData(perfil)
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="button" className="flex-1 btn-primary" onClick={handleSave}>
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

          {/* Información Adicional */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Información de Cuenta</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">ID Dueño</p>
                  <p className="font-semibold">{perfil.idDueno}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estado</p>
                  <p className="font-semibold">{perfil.idEstado === 1 ? "Activo" : "Inactivo"}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4">Ayuda</h3>
              <p className="text-sm text-blue-800 mb-4">¿Tienes alguna pregunta o necesitas ayuda?</p>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/soporte")}>
                Contactar Soporte
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
