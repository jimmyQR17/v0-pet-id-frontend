import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // TODO: Replace with actual API call to your .NET backend
    // const response = await fetch('YOUR_API_URL/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })

    // For demo purposes, simulate a successful login
    if (email && password) {
      return NextResponse.json({
        token: "demo-jwt-token",
        user: {
          id: 1,
          email: email,
          nombre: "Admin",
        },
      })
    }

    return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: "Error del servidor" }, { status: 500 })
  }
}
