import { NextRequest, NextResponse } from 'next/server'

interface ContactBody {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

export async function POST(request: NextRequest) {
  let body: ContactBody

  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json({ error: 'Cuerpo de request inválido' }, { status: 400 })
  }

  const { nombre, email, telefono, mensaje } = body

  if (!nombre || !email || !mensaje) {
    return NextResponse.json(
      { error: 'Nombre, email y mensaje son requeridos' },
      { status: 400 },
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook no configurado' }, { status: 500 })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, telefono, mensaje }),
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new Error(`Apps Script respondió con status ${response.status}`)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando a Google Sheets:', error)
    return NextResponse.json({ error: 'Error al registrar el mensaje' }, { status: 500 })
  }
}
