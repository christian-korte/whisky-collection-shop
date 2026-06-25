# Christians Whisky Sammlung

Privater Online-Shop für die Whisky-Sammlung von Christian Korte. Ermöglicht den Privatverkauf von ca. 80 Whisky-Flaschen mit Kaufanfrage-Formular per E-Mail.

## Tech-Stack

- **Framework**: Next.js 14 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS (dunkles Design, amber/gold Akzente)
- **Fonts**: Playfair Display (Headlines), Inter (Body)
- **E-Mail**: Resend API
- **Bilder**: Cloudinary (optional)
- **Deployment**: Docker / docker-compose

## Lokale Entwicklung

```bash
# 1. Repository klonen
git clone git@github.com:christian-korte/whisky-collection-shop.git
cd whisky-collection-shop

# 2. Abhängigkeiten installieren
npm install

# 3. Umgebungsvariablen konfigurieren
cp .env.example .env.local
# Dann .env.local bearbeiten und API-Keys eintragen

# 4. Entwicklungsserver starten
npm run dev
```

Jetzt läuft die App unter [http://localhost:3000](http://localhost:3000).

## Umgebungsvariablen

| Variable | Beschreibung | Pflicht |
|---|---|---|
| `RESEND_API_KEY` | API-Key für E-Mail-Versand via Resend | Nein (Mails werden nur geloggt) |
| `CONTACT_EMAIL` | Empfänger-E-Mail für Kaufanfragen | Nein (Standard: info@christian-korte.com) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary-Cloud für Produktbilder | Nein |
| `NEXT_PUBLIC_SHOP_NAME` | Shop-Name in der UI | Nein |

## Produktdaten pflegen

Alle Produkte befinden sich in `data/products.json`. Das Schema ist in `types/index.ts` definiert.

Felder pro Produkt:
- `id`, `slug`, `name`, `distillery`, `region`, `country`
- `vintage`, `bottled`, `age` (jeweils number oder null)
- `cask`, `bottler`, `strength`, `volume`
- `condition`: `"sealed"` oder `"opened"`
- `rating`: `{ source: string, score: number }` oder null
- `price`, `status`: `"available"` | `"reserved"` | `"sold"`
- `images`: Array von Bild-URLs
- `featured`: true/false (erscheint auf der Startseite)

## Seiten

| URL | Beschreibung |
|---|---|
| `/` | Startseite mit Featured Products |
| `/katalog` | Gesamtkatalog mit Filter und Sortierung |
| `/katalog/[slug]` | Produktdetailseite mit Kaufanfrage |
| `/pakete` | Kuratierte Pakete aus mehreren Flaschen |
| `/impressum` | Impressum und Privatverkauf-Hinweis |

## Docker-Deployment

```bash
# Image bauen und starten
docker-compose up -d

# Logs anschauen
docker-compose logs -f
```

Die App ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Wichtiger Hinweis

Hierbei handelt es sich um einen **privaten Verkauf** durch eine Privatperson. Dies ist kein gewerblicher Verkauf. Es bestehen keine gesetzlichen Gewährleistungsrechte gem. § 437 BGB. Kein Widerrufsrecht. Verkauf ausschließlich an Personen ab 18 Jahren.

---

Kontakt: [info@christian-korte.com](mailto:info@christian-korte.com)
