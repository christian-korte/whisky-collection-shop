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

## Asana-Integration: Pflicht (Robi-Profil, n8n@cohrteam.de)

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
---



## AKTUELLER TASK: Admin-Verwaltungsbereich, Header-Bild, Swipe-Galerie (2026-06-30)

### Prioritaet: HOCH - jetzt ausfuehren

### WICHTIG: Diesmal als echtes Team arbeiten
Bearbeite diese Aufgabe NICHT alleine im Hauptkontext. Zerlege sie wie im Abschnitt
"Verfuegbare Spezialisten" beschrieben und spawne echte Subagenten ueber das Task-Tool:
- security: Login/Auth-System (JWT, Middleware, Passwort-Hashing)
- backend: CRUD-API-Routen, Datei-Upload, Datenzugriffsschicht
- ui: Admin-Dashboard/Formulare, Header-Bild, Swipe-Galerie
- devops: Build, .env Pflege, Server-Neustart, Git
- qa: End-to-End-Test aller Flows bevor du "fertig" meldest
Fuehre am Ende eine Konsistenzpruefung durch (einheitliches Tailwind-Styling).

### Ziel
Admin-Login fuer Christian Korte + Verwaltungsbereich um den Bestand vollstaendig zu pflegen:
Bestand verwalten, Beschreibungen anpassen, Bilder ergaenzen/loeschen, neue Whiskys anlegen,
Whiskys loeschen, Preise aendern, Status auf verkauft/reserviert/verfuegbar setzen.

### Architektur-Vorgaben (bitte exakt so umsetzen, das spart Rueckfragen)

**Auth:**
- Neue npm-Pakete sind fuer dieses Feature ausdruecklich erlaubt: bcryptjs, jose
  (jose statt jsonwebtoken, da Next.js Middleware im Edge-Runtime laeuft und jsonwebtoken dort nicht funktioniert)
- Env-Variablen in .env (NICHT committen, .env.example nur mit leeren Platzhaltern ergaenzen):
  ADMIN_USERNAME, ADMIN_PASSWORD_HASH (bcrypt-Hash), ADMIN_SESSION_SECRET (zufaelliger String)
- Setze ADMIN_USERNAME=christian und generiere ein zufaelliges sicheres Passwort (mind. 16 Zeichen).
  Hashe es mit bcrypt fuer ADMIN_PASSWORD_HASH.
  Schreibe das Klartext-Passwort EINMALIG in /home/agent/projects/whisky-collection-shop/.admin-credentials.txt
  (Datei zu .gitignore hinzufuegen, NICHT committen) UND gib es am Ende in deiner Zusammenfassung aus.
- Login: POST /api/admin/login prueft Username/Passwort gegen Env-Variablen, setzt bei Erfolg ein
  httpOnly, Secure, SameSite=Lax signiertes JWT-Cookie (jose, kurze Gueltigkeit z.B. 7 Tage)
- middleware.ts schuetzt alle Routen unter /admin/** und /api/admin/** ausser /admin/login und /api/admin/login
- POST /api/admin/logout loescht das Cookie
- Optional aber gerne: einfache In-Memory-Sperre nach 5 Fehlversuchen pro IP

**Datenzugriff (wichtig, sonst sieht man Aenderungen nicht ohne Rebuild):**
- lib/products.ts liest data/products.json aktuell per statischem Import (import productsData from '@/data/products.json').
  Das wird beim Build eingefroren! Umstellen auf Laufzeit-Lesen mit fs.readFileSync (oder fs/promises) bei jedem Aufruf.
- Seiten app/page.tsx, app/katalog/page.tsx, app/katalog/[slug]/page.tsx, app/pakete/page.tsx:
  jeweils `export const dynamic = 'force-dynamic'` ergaenzen, damit Aenderungen sofort sichtbar sind
- KEINE Datenbank einfuehren. data/products.json und data/packs.json bleiben die Datenquelle.
- Schreibzugriffe (Create/Update/Delete) lesen die JSON-Datei, aendern sie in-memory, schreiben sie
  mit JSON.stringify(data, null, 2) zurueck (lesbare Diffs fuer Git)

**Bild-Upload:**
- Next.js 14 Route Handler unterstuetzt `await request.formData()` nativ - KEIN multer/formidable noetig
- Hochgeladene Bilder landen in public/images/whisky/ mit eindeutigem, sicherem Dateinamen
  (z.B. slug + Zeitstempel + Originalendung, keine Sonderzeichen aus dem Originalnamen uebernehmen)
- Rueckgabe: relativer Pfad /images/whisky/dateiname.jpg, der ins images[]-Array des Produkts kommt
- Bild loeschen: physische Datei aus public/images/whisky/ entfernen UND aus images[]-Array im Produkt

### Admin-Seiten (App Router)
- /admin/login - Login-Formular (Username + Passwort)
- /admin - Dashboard: Tabelle aller Produkte (Name, Destillerie, Preis, Status, Featured),
  Status direkt in der Tabelle aenderbar (Dropdown: verfuegbar/reserviert/verkauft),
  Bearbeiten-/Loeschen-Aktionen pro Zeile, Button "+ Neuer Whisky"
- /admin/products/neu - Formular fuer alle Felder aus dem WhiskyProduct-Interface
  (siehe Abschnitt "TypeScript Interface WhiskyProduct" weiter oben in dieser Datei) + Mehrfach-Bild-Upload
- /admin/products/[id]/bearbeiten - Formular vorausgefuellt, bestehende Bilder als Grid mit
  Loeschen-Button pro Bild, weitere Bilder hinzufuegbar
- Logout-Button sichtbar im Admin-Bereich

### API-Routen (alle unter /api/admin/, durch middleware.ts geschuetzt ausser login)
- POST /api/admin/login
- POST /api/admin/logout
- POST /api/admin/products (anlegen, slug automatisch aus Name generieren, Eindeutigkeit pruefen)
- PUT /api/admin/products/[id] (alle Felder inkl. price/status/description/featured aktualisierbar)
- DELETE /api/admin/products/[id] (Produkt + zugehoerige Bilddateien loeschen)
- POST /api/admin/upload (multipart Bild-Upload)
- DELETE /api/admin/products/[id]/images (ein Bild per Pfad entfernen)

### Header-Bild (components/Navigation.tsx)
Ergaenze ein Hintergrundbild: gruene schottische Highlands-Landschaft (Huegel, nicht die
duestere Fass-/Whisky-Bildsprache der bestehenden Hero-Sektion auf der Startseite - bewusst
ein anderes, helles gruenes Landschaftsbild). Muss auf Mobile UND Desktop gut aussehen
(bg-cover bg-center, responsive). Text bleibt durch Overlay/Gradient lesbar.
Verifiziere die Unsplash-Bild-URL vorher mit: curl -sI "URL" | head -1 (muss 200 liefern).

### Swipebare Bildergalerie (app/katalog/[slug]/ProductDetailClient.tsx)
Aktuell gibt es nur Klick-Thumbnails. Ergaenze Swipe-Geste links/rechts zwischen Bildern,
besonders fuer Touch-/Mobile-Geraete. Empfehlung: embla-carousel-react (schlank, gut gepflegt,
npm install erlaubt) - alternativ einfache Touch-Handler (onTouchStart/onTouchEnd mit
deltaX-Schwellenwert). Bestehende Thumbnail-Navigation darf erhalten bleiben.

### Sicherheits-Hinweise
- Passwort niemals im Klartext speichern, nur bcrypt-Hash in .env
- .env und .admin-credentials.txt muessen in .gitignore stehen (pruefen, ggf. ergaenzen) - NICHT committen
- Alle /admin und /api/admin Routen ausser Login muessen durch die Middleware geschuetzt sein -
  das ist Teil des QA-Checks am Ende (Test: Zugriff auf /admin ohne Cookie muss auf /admin/login umleiten)

### Asana-Integration
Lege im Projekt 1216032619928754 fuer jede der 5 Teilaufgaben (Auth, Backend-API, Admin-UI,
Header/Galerie, QA) einen eigenen Task an (curl-Befehle siehe Abschnitt "Asana-Integration: Pflicht"
weiter oben in dieser Datei). Markiere jeden Task als erledigt sobald der jeweilige Teilbereich fertig
und getestet ist.

### Obsidian Knowledge Base
Dokumentiere das neue Admin-System gemaess Abschnitt "Entwickler-Dokumentation in Obsidian
Knowledge Base: Pflicht" weiter oben in dieser Datei: Architektur, Login-Ablauf, API-Endpunkte,
wie man einen neuen Whisky anlegt/bearbeitet/loescht, wo Bilder gespeichert werden.

### QA-Checkliste vor Fertigmeldung (durch qa-Subagent)
1. Login mit korrekten Zugangsdaten funktioniert, mit falschen schlaegt fehl
2. /admin ohne gueltiges Cookie leitet auf /admin/login um
3. /api/admin/products ohne gueltiges Cookie liefert 401
4. Neuen Whisky anlegen inkl. Bild-Upload funktioniert end-to-end
5. Bestehenden Whisky bearbeiten (Preis, Status, Beschreibung) funktioniert und ist sofort
   auf der oeffentlichen Katalogseite sichtbar (ohne Rebuild!)
6. Bild zu bestehendem Whisky hinzufuegen und wieder loeschen funktioniert
7. Whisky loeschen entfernt ihn aus dem Katalog und loescht die Bilddateien
8. Status-Aenderung auf "verkauft"/"reserviert" zeigt korrektes Badge auf der Produktseite
   und blendet ggf. den Kaufanfrage-Button aus (bei verkauft)
9. Swipe-Geste auf Produktdetailseite funktioniert (mind. per Touch-Emulation/Code-Review pruefbar)
10. Logout funktioniert, danach ist /admin wieder geschuetzt

### Build und Deploy
1. npm run build (Fehler beheben falls noetig)
2. WICHTIG (Lehre aus dem letzten Mal): pruefe ob noch ein alter next-server Prozess laeuft:
   ps aux | grep next-server
   Falls ja: diesen Prozess beenden (kill <PID>), NICHT nur tmux C-c senden, da das beim letzten
   Mal nicht ausreichte und der alte Prozess weiterlief.
3. Dann: tmux send-keys -t whisky-preview "cd /home/agent/projects/whisky-collection-shop && npm start" Enter
4. Pruefen: curl -s -o /dev/null -w "%{http_code}" http://localhost:3000  -> muss 200 sein
5. Pruefen: curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin/login -> muss 200 sein
6. git add -A (ausser .env, .admin-credentials.txt - pruefen dass .gitignore greift)
7. git commit -m "Admin-Verwaltungsbereich, Header-Bild, swipebare Bildergalerie"
8. git push origin master

### Abschluss
Fasse am Ende klar zusammen: Login-URL, Username, Passwort (aus .admin-credentials.txt),
welche Features fertig sind, Ergebnis der QA-Checkliste, Asana-Tasks-Status, Knowledge-Base-Link.
