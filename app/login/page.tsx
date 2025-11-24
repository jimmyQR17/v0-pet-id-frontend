"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      // Simulate checking if user exists in database
      const existingUsers = [
        { email: "juan@gmail.com", nombre: "Juan", apellido: "Pérez" },
        { email: "maria@gmail.com", nombre: "María", apellido: "García" },
      ]

      // Mock Google user (in real app, get from Google OAuth)
      const googleEmail = "usuario@gmail.com"
      const userExists = existingUsers.some((u) => u.email === googleEmail)

      const mockGoogleUser = userExists
        ? existingUsers.find((u) => u.email === googleEmail)
        : {
            email: googleEmail,
            nombre: "Nuevo",
            apellido: "Usuario",
          }

      // Simulate API call to register/login with Google
      const response = await new Promise<{ token: string; isNew: boolean }>((resolve) => {
        setTimeout(() => {
          resolve({
            token: `google-token-${Date.now()}`,
            isNew: !userExists,
          })
        }, 800)
      })

      localStorage.setItem("token", response.token)
      localStorage.setItem("userType", "owner")
      localStorage.setItem("userName", `${mockGoogleUser?.nombre} ${mockGoogleUser?.apellido}`)
      localStorage.setItem("userEmail", mockGoogleUser?.email || googleEmail)

      // Show success message and redirect
      if (response.isNew) {
        // New user - redirect to complete profile
        router.push("/configuracion?nuevo=true")
      } else {
        // Existing user - go directly to pets
        router.push("/mis-mascotas")
      }
    } catch (err) {
      setError("Error al conectar con Google")
      console.log("[v0] Google login error:", err)
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("userType", "owner")
        router.push("/mis-mascotas")
      } else {
        setError("Credenciales incorrectas")
      }
    } catch (err) {
      setError("Error de conexión")
      console.log("[v0] Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
      const response = await fetch(`${apiUrl}/api/duenos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password, telefono }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("userType", "owner")
        router.push("/mis-mascotas")
      } else {
        setError("Error al registrarse")
      }
    } catch (err) {
      setError("Error de conexión")
      console.log("[v0] Register error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
            <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 6C18 4.3431 16.6569 3 15 3C13.3431 3 12 4.3431 12 6C12 7.6569 13.3431 9 15 9C16.6569 9 18 7.6569 18 6Z" />
              <path d="M6 6C6 4.3431 7.3431 3 9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3431 9 6 7.6569 6 6Z" />
              <path d="M21 10C21 8.8954 20.1046 8 19 8C17.8954 8 17 8.8954 17 10C17 11.1046 17.8954 12 19 12C20.1046 12 21 11.1046 21 10Z" />
              <path d="M5 8C3.89543 8 3 8.89543 3 10C3 11.1046 3.89543 12 5 12C6.10457 12 7 11.1046 7 10C7 8.89543 6.10457 8 5 8Z" />
              <path d="M12 11C9.7909 11 8 12.7909 8 15V19C8 20.1046 8.89543 21 10 21H14C15.1046 21 16 20.1046 16 19V15C16 12.7909 14.2091 11 12 11Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">PetID</h1>
          <p className="text-muted-foreground">Tu compañero digital para cuidar de tus mascotas</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          variant="outline"
          className="w-full mb-6 h-11 bg-white text-foreground border-2 hover:bg-gray-50"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {googleLoading ? "Conectando..." : "Continuar con Google"}
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">O continúa con email</span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full btn-primary h-11">
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    placeholder="Juan"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    placeholder="Pérez"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Correo Electrónico</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="987654321"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Contraseña</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full btn-accent h-11">
                {loading ? "Registrando..." : "Crear Cuenta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Al registrarte, aceptas nuestros términos y condiciones
        </p>
      </Card>
    </div>
  )
}
