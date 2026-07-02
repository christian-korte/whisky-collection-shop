import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@christian-korte.com'
const STATS_PATH = path.join(process.cwd(), 'data', 'stats.json')

function incrementOffers(productId: string) {
  try {
    const raw = fs.existsSync(STATS_PATH) ? fs.readFileSync(STATS_PATH, 'utf-8') : '{}'
    const stats = JSON.parse(raw)
    if (!stats.offers) stats.offers = {}
    stats.offers[productId] = (stats.offers[productId] ?? 0) + 1
    fs.writeFileSync(STATS_PATH, JSON.stringify(stats, null, 2), 'utf-8')
  } catch { /* silent */ }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, phone, message, priceOffer,
      productName, productId, productPrice,
      inquiryType,
      ageConfirmed, privateConfirmed,
    } = body

    if (!name || !email || !ageConfirmed || !privateConfirmed) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse' }, { status: 400 })
    }

    const isKaufanfrage = inquiryType !== 'rueckfrage'
    const subjectPrefix = isKaufanfrage ? 'Kaufanfrage' : 'Rückfrage'
    const priceLabel = isKaufanfrage && productPrice
      ? `${Number(productPrice).toLocaleString('de-DE')} €`
      : null

    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey && resendApiKey !== 'your-resend-api-key') {
      const resend = new Resend(resendApiKey)

      await resend.emails.send({
        from: 'Christians Whisky Sammlung <noreply@christian-korte.com>',
        to: CONTACT_EMAIL,
        reply_to: email,
        subject: `${subjectPrefix}: ${productName}${priceLabel ? ` — ${priceLabel}` : ''}`,
        html: `
          <h2>Neue ${subjectPrefix}</h2>
          <p><strong>Produkt:</strong> ${productName} (ID: ${productId})</p>
          ${priceLabel ? `<p><strong>Kaufpreis:</strong> ${priceLabel}</p>` : ''}
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          ${message ? `<p><strong>Nachricht:</strong><br />${message.replace(/\n/g, '<br />')}</p>` : ''}
          ${priceOffer ? `<p><strong>Preisvorschlag:</strong> ${priceOffer}</p>` : ''}
          <hr />
          <p><em>Alterbestätigung (18+): Ja</em></p>
          <p><em>Privatverkauf-Hinweis bestätigt: Ja</em></p>
          <p><em>Anfragetyp: ${subjectPrefix}</em></p>
        `,
      })
    } else {
      console.log(`${subjectPrefix} (kein Resend API-Key):`, { name, email, phone, message, priceOffer, productName, productPrice })
    }

    incrementOffers(productId)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 })
  }
}
