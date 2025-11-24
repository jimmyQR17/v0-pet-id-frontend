"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { OwnerHeader } from "@/components/owner-header"

export default function CollarDigitalPage() {
  const [mascota, setMascota] = useState({ nombre: "Max", codigoNFC: "PET-MAX-2024-001" })
  const [modoPerdido, setModoPerdido] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const urlPublica = `${window.location.origin}/pet/${mascota.codigoNFC}`

  const handleToggleModoPerdido = async () => {
    setLoading(true)
    try {
      // TODO: API call to toggle lost mode
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setModoPerdido(!modoPerdido)
    } catch (err) {
      console.log("[v0] Error toggling lost mode:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <OwnerHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => router.push(`/mis-mascotas/${params.id}`)} className="mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Collar Digital de {mascota.nombre}</h1>
          <p className="text-muted-foreground">Gestiona el collar NFC/QR de tu mascota</p>
        </div>

        {modoPerdido && (
          <Alert className="mb-6 border-destructive">
            <AlertDescription className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="font-medium">
                ¡Modo Perdido Activado! Cualquiera que escanee el collar verá tu información de contacto.
              </span>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Código QR</h3>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100">
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="black" />
                    <rect x="30" y="10" width="10" height="10" fill="black" />
                    <rect x="50" y="10" width="10" height="10" fill="black" />
                    <rect x="70" y="10" width="10" height="10" fill="black" />
                    <rect x="10" y="30" width="10" height="10" fill="black" />
                    <rect x="70" y="30" width="10" height="10" fill="black" />
                    <rect x="10" y="50" width="10" height="10" fill="black" />
                    <rect x="30" y="50" width="10" height="10" fill="black" />
                    <rect x="50" y="50" width="10" height="10" fill="black" />
                    <rect x="70" y="50" width="10" height="10" fill="black" />
                    <rect x="10" y="70" width="10" height="10" fill="black" />
                    <rect x="30" y="70" width="10" height="10" fill="black" />
                    <rect x="50" y="70" width="10" height="10" fill="black" />
                    <rect x="70" y="70" width="10" height="10" fill="black" />
                  </svg>
                  <p className="text-xs text-muted-foreground mt-2">Código QR de {mascota.nombre}</p>
                </div>
              </div>
              <Button className="w-full btn-primary mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Descargar QR
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copiar Enlace
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Configuración</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="lost-mode" className="text-base font-medium">
                    Modo Perdido
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">Activa esta opción si tu mascota está perdida</p>
                </div>
                <Switch id="lost-mode" checked={modoPerdido} onCheckedChange={handleToggleModoPerdido} />
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Código del Collar</Label>
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

              <div>
                <Label className="text-base font-medium mb-2 block">Enlace Público</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-sm flex-1 truncate">{urlPublica}</span>
                  <Button size="sm" variant="ghost">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Este enlace muestra la información de {mascota.nombre} cuando alguien escanea su collar
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-3">¿Cómo funciona?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Coloca el código QR en el collar de tu mascota</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Si alguien encuentra a tu mascota, puede escanear el código</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Verán tu información de contacto y podrán comunicarse contigo</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
