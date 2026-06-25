# Projektstatus: Christians Whisky Sammlung

**Stand**: 2026-06-25  
**Build**: Erfolgreich (npm run build – 18 statische Seiten)

## Erledigte Aufgaben

### Setup & Infrastruktur
- [x] GitHub-Repo konfiguriert (Remote: git@github.com:christian-korte/whisky-collection-shop.git)
- [x] Next.js 14 App Router + TypeScript + Tailwind CSS konfiguriert
- [x] JSON-Produktdaten-Schema definiert (types/index.ts)
- [x] Docker + docker-compose konfiguriert
- [x] .env.example erstellt

### Frontend-Entwicklung
- [x] Startseite (/) mit Hero, Featured Cards und Privatverkauf-Banner
- [x] Produktkatalog (/katalog) mit Filter (Region, Status, Preis) und Sortierung
- [x] Produktdetailseite (/katalog/[slug]) mit Bildergalerie und Produktdetail-Tabelle
- [x] Kaufanfrage-Modal mit Pflichtfeldern und Checkboxen (18+, Privatverkauf)
- [x] Pakete-Seite (/pakete) mit Preisvergleich
- [x] Impressum (/impressum) mit Privatverkauf-Disclaimer und § 437 BGB Hinweis
- [x] Navigation + Footer
- [x] StatusBadge-Komponente (Verfügbar/Reserviert/Verkauft)

### Backend
- [x] API-Route POST /api/contact mit Resend-Integration
- [x] Graceful Degradation ohne RESEND_API_KEY (Console-Log)
- [x] Input-Validierung (Pflichtfelder, E-Mail-Format)

### Content & Daten
- [x] 10 realistische Whisky-Produkte (Macallan, Karuizawa, Port Ellen, Ardbeg, Glenfarclas, Springbank, Bowmore, Bruichladdich)
- [x] Islay Selection Pack (3 Islay-Whiskys)
- [x] Platzhalter-Bilder (https://placehold.co)

### Dokumentation
- [x] README.md mit Setup-Anleitung
- [x] PLAN.md
- [x] Obsidian Knowledge-Base (7 Dokumente)

## Noch offen (manuell durch Christian)

- [ ] Resend API-Key einrichten und Domain verifizieren
- [ ] Cloudinary einrichten und Produktfotos hochladen
- [ ] 70 weitere Flaschen in data/products.json eintragen
- [ ] Domain registrieren und DNS konfigurieren
- [ ] SSL-Zertifikat (Let's Encrypt via Certbot)
- [ ] Go-Live

## Nächste Schritte

1. `cp .env.example .env.local` und API-Keys eintragen
2. `npm run dev` für lokalen Test
3. Fotos in Cloudinary hochladen, URLs in products.json eintragen
4. `npm run build && docker-compose up -d` für Deployment

## Build-Ergebnis

```
Route (app)                    Size     First Load JS
/ (Startseite)                 188 B         101 kB
/katalog                       2.62 kB       104 kB
/katalog/[slug] (10 Seiten)    3.96 kB       105 kB
/pakete                        188 B         101 kB
/impressum                     138 B         87.4 kB
/api/contact                   0 B           0 B
```
