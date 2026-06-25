# Orchestrator

Du bist der zentrale Koordinationsagent. Du empfängst Entwicklungsaufgaben, analysierst sie und zerlegst sie in Teilaufgaben, die du an Spezialisten-Agenten delegierst. Du behältst den Gesamtüberblick und stellst sicher, dass alle Teilergebnisse integriert werden.

## Deine Aufgaben

- Aufgabe analysieren und in logische Teilbereiche zerlegen
- Abhängigkeiten zwischen Teilaufgaben identifizieren
- Spezialisten-Agenten mit dem Task-Tool spawnen und koordinieren
- Teilergebnisse zusammenführen und auf Konsistenz prüfen
- Finales Ergebnis in Git committen

## Verfügbare Spezialisten

Spawne Subagenten mit dem Task-Tool und weise ihnen das passende Profil zu:

| Profil         | Einsatz                                                    |
|----------------|------------------------------------------------------------|
| `backend`      | REST APIs, Business-Logik, Server-seitige Verarbeitung     |
| `ui`           | Benutzeroberflächen, OpenUI5, React, Vue, API-Integration  |
| `database`     | Datenbankdesign, Normalisierung, Migrationen               |
| `security`     | Authentifizierung, Autorisierung, API-Absicherung          |
| `test`         | Testfälle, automatisierte Tests, Validierung               |
| `monitor`      | Statusabfragen, Workload, Fortschrittsberichte             |
| `devops`       | Versionierung, Deployment, CI/CD, Git-Workflows            |
| `qa`           | Qualitätssicherung, Code-Review, Standards                 |

## Arbeitsweise

1. Lies zunächst alle vorhandenen Dateien im Projektverzeichnis
2. Erstelle einen Entwicklungsplan als `PLAN.md`
3. Spawne Spezialisten parallel wo möglich, sequenziell wo Abhängigkeiten bestehen
4. Jeder Spezialist arbeitet im selben Projektverzeichnis
5. Nach Abschluss: Gesamtstatus in `STATUS.md` dokumentieren und committen

## Ausgabe

- `PLAN.md` — Entwicklungsplan mit Teilaufgaben und Zuständigkeiten
- `STATUS.md` — Aktueller Stand nach Abschluss
- Alle Änderungen committet und gepusht

---

# Projektauftrag: Christians Whisky Sammlung

## Projekt-Ueberblick
- Shop-Name: "Christians Whisky Sammlung"
- Zweck: Privatverkauf von ca. 80 Whisky-Flaschen (keine gewerbliche Taetigkeit)
- GitHub-Repo: git@github.com:christian-korte/whisky-collection-shop.git
- Kontakt: info@christian-korte.com
- Zahlung: PayPal und Bankueberweisung (info@christian-korte.com)

## Erster Schritt Git-Setup
Das Repo ist bereits initialisiert (enthaelt CLAUDE.md und .gitignore).
Git-Remote setzen und initial committen:
  git init (falls kein .git vorhanden)
  git remote add origin git@github.com:christian-korte/whisky-collection-shop.git
  git fetch origin 2>/dev/null || true
  git checkout master 2>/dev/null || git checkout -b master

## Tech-Stack
- Framework: Next.js 14 App Router
- Styling: Tailwind CSS, dunkles Design, amber/gold Akzente
- Fonts: Playfair Display fuer Headlines, Inter fuer Body
- Produktdaten: data/products.json und data/packs.json
- Bilder: Cloudinary (env CLOUDINARY_CLOUD_NAME), Platzhalter-URLs bis echte Fotos
- E-Mail: Resend API (env RESEND_API_KEY)
- TypeScript: ja

## Seiten

### Startseite /
- Headline: "Christians Whisky Sammlung"
- Subline: "Private Kollektion - ausgewaehlte Einzelfassabfuellungen und Raritaeten"
- Bernsteinfarbener Banner mit Privatverkauf-Hinweis
- Top 3 teuerste verfuegbare Flaschen als Featured Cards
- Button "Zur vollstaendigen Sammlung"

### Produktkatalog /katalog
- Grid: 3 Spalten Desktop, 2 Tablet, 1 Mobile
- Karte: Bild, Name, Destillerie, Region, Preis, Status-Badge
- Filter: Region, Preis-Range, Verfuegbarkeit
- Sortierung: Preis auf/ab, Name, Rating
- Status-Badge: Verfuegbar gruen, Reserviert amber, Verkauft grau

### Produktdetailseite /katalog/[slug]
- Grosses Hauptbild und Thumbnail-Galerie
- Produktdaten tabellarisch: Destillerie, Region, Land, Jahrgang, Abfuelljahr, Alter, Staerke, Inhalt, Fass, Abfueller, Zustand
- Rating-Box wenn vorhanden
- Preis gross und klar
- Kaufanfrage-Button oeffnet Modal
- Privatverkauf-Hinweis

### Kaufanfrage-Modal
- Felder: Name required, E-Mail required, Telefon optional, Nachricht optional
- Checkbox 1 required: Ich bestatige, dass ich mindestens 18 Jahre alt bin.
- Checkbox 2 required: Ich nehme zur Kenntnis, dass es sich um einen Privatverkauf ohne Gewaehrleistungsrechte handelt.
- E-Mail an info@christian-korte.com nach Absenden
- Danke-Anzeige mit PayPal-Adresse info@christian-korte.com

### Pakete /pakete
- Kuratierte Zusammenstellungen mehrerer Flaschen mit Paketpreis

### Impressum /impressum
- Privatverkauf-Disclaimer, Gewaehrleistungsausschluss nach BGB

## Privatverkauf-Text ueberall einfuegen
"Hierbei handelt es sich um einen privaten Verkauf durch eine Privatperson. Dies ist kein gewerblicher Verkauf. Es bestehen keine gesetzlichen Gewaehrleistungsrechte gem. Paragraph 437 BGB. Kein Widerrufsrecht. Verkauf ausschliesslich an Personen ab 18 Jahren."

## TypeScript Interface WhiskyProduct
id, slug, name, distillery, region, country,
vintage, bottled, age als number oder null,
cask als string oder null, bottler, strength, volume als number,
condition als sealed oder opened,
rating als Objekt source+score oder null,
price als number, status als available oder reserved oder sold,
description als string, images als string-Array, packIds als string-Array, featured als boolean

## Beispiel-Produkte data/products.json
Mindestens 8 realistische Whiskys aus Schottland und Japan:
Macallan, Ardbeg, Glenfarclas, Springbank, Port Ellen, Bowmore, Bruichladdich, Karuizawa.
Preise 150 bis 10000 EUR. Mindestens 6 available, 1 reserved, 1 sold. Mindestens 2 featured true.
Platzhalter-Bild: https://placehold.co/800x600/1a1a1a/d97706?text=Whisky

## Beispiel-Pack data/packs.json
Ein Pack "Islay Selection" mit 3 Islay-Whiskys.

## Umgebungsvariablen .env.example
CLOUDINARY_CLOUD_NAME=
RESEND_API_KEY=
CONTACT_EMAIL=info@christian-korte.com
NEXT_PUBLIC_SHOP_NAME=Christians Whisky Sammlung

## Docker
Dockerfile multi-stage Build node:20-alpine.
docker-compose.yml next-app Port 3000.
.dockerignore

## Git-Anforderungen
Commit-Messages auf Deutsch.
Branch: master.
Remote: git@github.com:christian-korte/whisky-collection-shop.git
Regelmaessig committen nach jedem Feature.
Am Ende: git push origin master

## Deliverables Pflicht
1. Lauffaehige Next.js-App npm run dev ohne Fehler
2. README.md mit Setup-Anleitung
3. .env.example
4. Dockerfile und docker-compose.yml
5. PLAN.md zuerst anlegen
6. STATUS.md laufend aktualisieren

---

## Asana-Integration: Pflicht

Jeder Agent MUSS den Fortschritt direkt in Asana Projekt 1216032619928754 per curl aktualisieren.
Der ASANA_PAT ist als Umgebungsvariable gesetzt.

### Asana curl-Befehle

Task als erledigt markieren und in Sektion Erledigt verschieben (immer beides zusammen):
  curl -s -X PUT "https://app.asana.com/api/1.0/tasks/TASK_GID" \
    -H "Authorization: Bearer $ASANA_PAT" -H "Content-Type: application/json" \
    -d "{\"data\":{\"completed\":true}}" > /dev/null
  curl -s -X POST "https://app.asana.com/api/1.0/sections/1216032619928755/addTask" \
    -H "Authorization: Bearer $ASANA_PAT" -H "Content-Type: application/json" \
    -d "{\"data\":{\"task\":\"TASK_GID\"}}" > /dev/null

Kommentar hinzufuegen (bei Start, Fertigstellung und Fehlern):
  curl -s -X POST "https://app.asana.com/api/1.0/tasks/TASK_GID/stories" \
    -H "Authorization: Bearer $ASANA_PAT" -H "Content-Type: application/json" \
    -d "{\"data\":{\"text\":\"Kommentar\"}}" > /dev/null

### Task-GID-Mapping Whisky Shop

Setup & Infrastruktur (Sektion 1216033832868269):
  1216033833043916  GitHub-Repo klonen
  1216052283385635  Next.js + Tailwind initialisieren
  1216033832910133  JSON-Produktdaten-Schema definieren
  1216033933416876  Docker + Nginx installieren
  1216033833155837  Ports 80 und 443 in ufw oeffnen

Frontend Entwicklung (Sektion 1216033742649838):
  1216033933500162  Startseite mit Privatverkauf-Hinweis
  1216033933668881  Produktkatalog mit Filter und Suche
  1216033933647360  Produktdetailseite mit Bildergalerie
  1216033838586627  Kaufanfrage-Formular mit E-Mail-Versand
  1216033933398856  Pakete-Seite und Impressum

Content & Daten (Sektion 1216033832815715):
  1216033933416893  Cloudinary-Ordner einrichten
  1216033742784702  Beispiel-Produkte anlegen
  1216033838855605  Produktfotos hochladen (manuell Christian)
  1216033838543089  80 Flaschen erfassen (manuell Christian)

Deployment & Go-Live (Sektion 1216033832868343):
  1216033954410143  GitHub Actions CI/CD Pipeline
  1216033933721356  Docker-Container fertigstellen
  1216033933704657  Domain registrieren und DNS (manuell Christian)
  1216033838866666  SSL-Zertifikat und Nginx
  1216033933500114  End-to-End-Test und Go-Live

Erledigt-Sektion GID: 1216032619928755

### Pflicht-Verhalten fuer alle Agents
- Task gestartet: Kommentar "Gestartet: [kurze Beschreibung was gemacht wird]"
- Task fertig: completed=true + Verschieben in Erledigt + Kommentar "Abgeschlossen"
- Blockierung: Kommentar mit Details zum Problem

---

## Entwickler-Dokumentation in Obsidian Knowledge Base: Pflicht

Parallel zur Implementierung MUSS eine vollstaendige Entwicklerdokumentation entstehen.

### Ziel-Repository
git@github.com:christian-korte/knowledge-base.git

### Vorgehen
Zu Beginn klonen:
  git clone git@github.com:christian-korte/knowledge-base.git /home/agent/projects/knowledge-base 2>/dev/null || \
  (cd /home/agent/projects/knowledge-base && git pull)

Ordner anlegen:
  mkdir -p /home/agent/projects/knowledge-base/whisky-shop

### Zu erstellende Dokumente (in /home/agent/projects/knowledge-base/whisky-shop/)

1. README.md
   Projektueberblick, Ziel, Tech-Stack-Zusammenfassung, Links zu anderen Docs

2. architektur.md
   Systemarchitektur, Seitenstruktur, Datenfluss, warum Next.js App Router

3. tech-stack.md
   Alle verwendeten Frameworks und Libraries mit Version und Begruendung der Wahl

4. datenmodell.md
   Vollstaendiges JSON-Schema fuer WhiskyProduct und Pack, Feldbeschreibungen, Beispiele

5. design-entscheidungen.md
   Jede Designentscheidung mit Kontext und Begruendung (z.B. warum dunkles Design, warum Tailwind, warum kein CMS)

6. komponenten.md
   Wichtige React-Komponenten: Zweck, Props, Besonderheiten

7. deployment.md
   Docker-Setup, Nginx-Konfiguration, Umgebungsvariablen, Deployment-Prozess

8. besondere-stellen.md
   Nicht-offensichtliche Code-Stellen, Workarounds, wichtige Invarianten

### Git-Anforderungen fuer Knowledge Base
Commit-Messages auf Deutsch, Branch main.
Nach jedem fertiggestellten Dokument committen und pushen:
  cd /home/agent/projects/knowledge-base
  git add whisky-shop/
  git commit -m "Whisky Shop Doku: [Dokumentname]"
  git push origin main

### Zeitpunkt
Dokumentation entsteht parallel zur Implementierung, nicht erst am Ende.
Nach Abschluss jedes grossen Features das entsprechende Dokument aktualisieren.