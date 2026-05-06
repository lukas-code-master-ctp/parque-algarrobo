import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    return NextResponse.json({ error: 'Configuración de email faltante' }, { status: 500 })
  }

  try {
    await resend.emails.send({
      from: 'Parque Algarrobo <noreply@parquealgarrobo.cl>',
      to: contactEmail,
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} — Parque Algarrobo`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a1a1a;border-bottom:2px solid #c9a84c;padding-bottom:8px;">
            Nuevo mensaje desde parquealgarrobo.cl
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr>
              <td style="padding:8px 0;font-weight:bold;color:#4a4a4a;width:120px;">Nombre:</td>
              <td style="padding:8px 0;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:bold;color:#4a4a4a;">Email:</td>
              <td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:bold;color:#4a4a4a;">Teléfono:</td>
              <td style="padding:8px 0;">${telefono || '—'}</td>
            </tr>
          </table>
          <div style="margin-top:16px;">
            <p style="font-weight:bold;color:#4a4a4a;margin-bottom:8px;">Mensaje:</p>
            <p style="background:#f5f5f5;padding:16px;border-left:3px solid #c9a84c;line-height:1.6;">
              ${mensaje.replace(/\n/g, '<br />')}
            </p>
          </div>
        </div>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
