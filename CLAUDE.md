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
- Bei Ad-hoc-Folgeauftraegen ohne vordefinierte Task-GID-Mappings (z.B. Bugfix-Auftraege
  wie im Abschnitt "AKTUELLER TASK"): Fuer jedes Arbeitspaket einen eigenen Task per POST
  anlegen (Endpoint https://app.asana.com/api/1.0/tasks, projects + memberships.section
  setzen), passende Sektion verwenden oder per POST .../projects/PROJECT_GID/sections neu
  anlegen falls keine passt. Diese Tasks laufend aktualisieren (Start-Kommentar,
  Fertig-Kommentar, completed=true + Verschieben in Erledigt) - Christian moechte den
  Fortschritt der einzelnen Arbeitspakete live in Asana mitverfolgen, nicht erst nach
  Abschluss des Gesamtauftrags.

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




## AKTUELLER TASK: Admin-Bereich Bugfixes + Passwort-Aenderung + Zahlungslink (2026-06-30, Folgeauftrag)

### Prioritaet: HOCH - jetzt ausfuehren

### WICHTIG: Diesmal als echtes Team arbeiten
Bearbeite diese Aufgabe NICHT alleine im Hauptkontext. Zerlege sie wie im Abschnitt
"Verfuegbare Spezialisten" beschrieben und spawne echte Subagenten ueber das Task-Tool:
- security: Cookie/Auth-Fix, Passwort-Aenderung
- backend: settings.json Datenschicht, API-Routen
- ui: Layout-Restrukturierung, Profilbereich, Header-Bild
- devops: Build, Server-Neustart, Git
- qa: Alle Punkte unten end-to-end verifizieren (echter Login im Browser-Flow simulieren via curl mit Cookie-Jar!)

### Kontext
Christian hat den Admin-Bereich getestet und folgende Probleme gemeldet. Ich habe bereits
vorab recherchiert und die Root Causes identifiziert (siehe unten) - bitte NICHT erneut von
vorne suchen, sondern direkt an den genannten Stellen fixen.

### BUG A (KRITISCH): Login hat scheinbar keine Wirkung
**Root Cause gefunden:** In app/api/admin/login/route.ts wird das Cookie mit
`secure: process.env.NODE_ENV === 'production'` gesetzt. Da `npm start` automatisch
NODE_ENV=production setzt, ist das Cookie immer `Secure`. Die Seite laeuft aber nur ueber
HTTP (http://49.12.14.62:3000, kein TLS/Reverse-Proxy). Browser UND curl verwerfen
`Secure`-Cookies grundsaetzlich auf unverschluesselten HTTP-Verbindungen. Das heisst: Die
Login-API antwortet mit `{success:true}` und sendet ein Set-Cookie, aber der Browser
speichert es nie. Die Middleware wirft den Nutzer beim naechsten Request sofort zurueck auf
/admin/login - daher der Eindruck "Login tut nichts".
**Fix:** `secure`-Flag dynamisch anhand des tatsaechlichen Requests setzen, nicht anhand von
NODE_ENV, z.B. `secure: request.nextUrl.protocol === 'https:'`. Gleiche Pruefung im
logout-Route falls dort ebenfalls ein secure-Flag beim Loeschen relevant ist (cookies.delete
braucht meist kein secure-Flag, aber zur Sicherheit pruefen). Nach dem Fix: kompletten
Login-Flow per curl mit Cookie-Jar testen (curl -c cookies.txt ... dann curl -b cookies.txt
/admin -> muss 200 liefern, nicht 307).

### BUG B: Navigation/Footer und doppelte/dreifache Ueberschrift im Admin-Bereich
**Root Cause gefunden:** app/layout.tsx (Root-Layout) rendert IMMER `<Navigation />` und
`<Footer />` um {children}, auch fuer /admin/** Routen. Zusaetzlich hat app/admin/layout.tsx
eine eigene Kopfzeile "Admin — Christians Whisky Sammlung" + Abmelden-Link, und
app/admin/login/page.tsx zeigt nochmal eine grosse Ueberschrift "Christians Whisky Sammlung".
Ergebnis: Der Seitentitel erscheint bis zu dreimal, und die oeffentliche Navigation
(Katalog/Pakete/Impressum-Links) ist sinnlos auch im Admin-Tool sichtbar.
**Fix (empfohlene Struktur):** Next.js Route Groups verwenden, um Layouts sauber zu trennen:
- `app/(public)/` Route-Group fuer Startseite, Katalog, Pakete, Impressum mit eigenem
  `app/(public)/layout.tsx`, das `<Navigation />` und `<Footer />` enthaelt
- `app/admin/` bleibt wie es ist (eigenes admin/layout.tsx mit der Admin-Kopfzeile), bekommt
  aber KEINE Navigation/Footer mehr vom Root-Layout
- `app/layout.tsx` (Root) wird minimal: nur `<html>`/`<body>` mit globals.css, KEIN
  Navigation/Footer mehr direkt
- In `app/admin/login/page.tsx` die grosse zusaetzliche H1-Ueberschrift "Christians Whisky
  Sammlung" entfernen (genuegt durch den Admin-Layout-Header oben)
- Pruefen: app/admin/layout.tsx soll auf /admin/login KEINEN "Abmelden"-Link zeigen (der
  ist vor dem Login irrefuehrend, da man noch nicht eingeloggt ist). Entweder /admin/login
  bekommt ein eigenes minimales Layout ausserhalb der Admin-Chrome, oder LogoutButton wird
  per usePathname() auf /admin/login ausgeblendet. Saubere Variante (Route Groups)
  bevorzugt: /admin/login NICHT unter dem geschuetzten admin/layout.tsx, sondern eigenes
  schlankes Layout.
- Sorgfaeltig testen, dass dadurch keine bestehende Funktionalitaet (Force-Dynamic-Exports,
  Middleware-Matcher etc.) kaputtgeht.

### BUG C: Header-Bild zu klein / schlecht erkennbar
Die Navigationsleiste (components/Navigation.tsx) ist nur h-16 (64px) hoch, das
Hintergrundbild wird dadurch auf einen schmalen Streifen zusammengequetscht. Vergroessere die
Navigationsleiste deutlich (z.B. auf h-40 bis h-48 fuer den Bildbereich, ggf. mit der
eigentlichen Link-Leiste als schmalerer Unterbereich innerhalb), damit die gruene
Highlands-Landschaft gut erkennbar ist. Bild-URL bleibt:
https://images.unsplash.com/photo-1597202496047-8af47ddf05da (bereits verifiziert, 200 OK).
Auf Mobile darauf achten, dass die Hoehe nicht zu viel Platz wegnimmt (ggf. responsive
Hoehen, z.B. h-32 auf Mobile, h-48 ab md:).

### NEUE FUNKTION D: Passwort aendern
Christian hat keinen direkten Serverzugriff - eine Aenderung, die einen manuellen
Server-Neustart erfordert (wie aktuell .env), ist fuer ihn nicht selbst nutzbar. Daher:
- Lege `data/admin-settings.json` an (Struktur z.B. `{"passwordHash": "..."}`), zur Laufzeit
  lesbar/schreibbar wie data/products.json (fs.readFileSync/writeFileSync)
- Beim ersten Zugriff: falls data/admin-settings.json nicht existiert, aus
  process.env.ADMIN_PASSWORD_HASH initialisieren (Migration/Fallback), Datei dann anlegen
- `app/api/admin/login/route.ts` liest den Passwort-Hash zuerst aus
  data/admin-settings.json, falls vorhanden, sonst Fallback auf .env
- Neue Seite z.B. `/admin/einstellungen` mit Formular: aktuelles Passwort, neues Passwort,
  Bestaetigung. Neue API-Route `POST /api/admin/password` (durch Middleware geschuetzt):
  prueft aktuelles Passwort per bcrypt.compare, hasht neues Passwort, schreibt in
  data/admin-settings.json
- `data/admin-settings.json` MUSS in .gitignore (enthaelt sicherheitsrelevanten Hash) -
  NICHT committen

### NEUE FUNKTION E: Zahlungsdaten (PayPal-Link) im Profilbereich
- Auf derselben oder einer eigenen Einstellungsseite (`/admin/einstellungen`) ein Feld fuer
  einen PayPal.me-Link (oder allgemeinen Zahlungslink) ergaenzen
- Speicherung in `data/settings.json` (kann normal committet werden, PayPal-Link ist nicht
  geheim, gleiches Muster wie products.json: fs read/write, force-dynamic auf Seiten die ihn
  anzeigen)
- API-Route `PUT /api/admin/settings` zum Speichern (geschuetzt durch Middleware)
- Den gespeicherten PayPal-Link in der oeffentlichen Kaufanfrage (KaufanfrageModal oder wo
  der Kaufprozess stattfindet) anzeigen/verlinken, damit Kaeufer bezahlen koennen. Falls noch
  kein Link hinterlegt ist: Abschnitt einfach ausblenden (kein Platzhalter-Link).

### NEUE FUNKTION F: Angebotsliste sichtbar machen
Hinweis: Die Produkttabelle in app/admin/page.tsx existiert bereits vollstaendig (Liste aller
Flaschen mit Status-Dropdown, Bearbeiten-/Loeschen-Links, "+ Neuer Whisky"-Button) - das
Problem war NICHT eine fehlende Funktion, sondern dass Christian wegen Bug A nie eingeloggt
blieb und diese Seite daher nie zu sehen bekam. Nach dem Fix von Bug A sollte dies bereits
funktionieren. Im QA-Schritt trotzdem explizit verifizieren: Nach erfolgreichem Login muss
/admin die Produkttabelle mit allen Flaschen anzeigen, Bearbeiten-Link muss zum
vorausgefuellten Formular fuehren, Status-Dropdown muss Aenderungen sofort speichern.

### QA-Checkliste vor Fertigmeldung (durch qa-Subagent, ZWINGEND mit echtem Cookie-Flow testen)
1. `curl -c cookies.txt -X POST .../api/admin/login` mit korrekten Daten -> Cookie wird in
   cookies.txt gespeichert (Datei nicht leer, enthaelt admin_session)
2. `curl -b cookies.txt .../admin` -> Status 200 (NICHT 307), enthaelt "Produktverwaltung"
3. `curl -b cookies.txt .../admin` mit Username in anderer Gross-/Kleinschreibung beim Login
   (z.B. "Christian" statt "christian") funktioniert weiterhin (Regression aus letztem Fix)
4. Seitentitel "Christians Whisky Sammlung" erscheint auf /admin/login nur noch einmal
5. /admin/login zeigt KEINEN "Abmelden"-Link
6. /admin und Unterseiten zeigen KEINE oeffentliche Navigation (Katalog/Pakete/Impressum-Links)
7. Oeffentliche Seiten (/,/katalog,/pakete,/impressum) zeigen weiterhin ganz normal
   Navigation + Footer wie bisher - Regression durch die Layout-Restrukturierung ausschliessen
8. Passwort aendern: altes Passwort falsch eingegeben -> Fehler; korrektes altes Passwort +
   neues Passwort -> Erfolg; danach Login mit NEUEM Passwort funktioniert, mit altem nicht mehr
9. PayPal-Link speichern in den Einstellungen -> erscheint korrekt im Kaufanfrage-Bereich der
   oeffentlichen Seite
10. Header-Bild ist auf Desktop UND Mobile deutlich groesser/erkennbarer als vorher
    (Screenshot-Vergleich nicht moeglich, aber HTML/CSS-Hoehe pruefen: h-16 darf nicht mehr
    vorkommen)
11. Alle bisherigen Features aus dem letzten Task (Bild-Upload, Produkt anlegen/loeschen,
    Swipe-Galerie) funktionieren weiterhin (keine Regression durch die Layout-Aenderung)

### Build und Deploy
1. npm run build (Fehler beheben falls noetig)
2. Pruefen ob noch ein alter next-server Prozess auf Port 3000 laeuft:
   ss -tlnp | grep ':3000' bzw. ps aux | grep next-server
   Falls ja: Prozess sauber beenden (kill <PID>, ggf. sudo -u agent kill, da der Prozess dem
   agent-User gehoeren sollte)
3. Neu starten in der tmux-Session whisky-preview:
   tmux send-keys -t whisky-preview C-c
   (kurz warten)
   tmux send-keys -t whisky-preview "cd /home/agent/projects/whisky-collection-shop && exec sudo -u agent npm start" Enter
   WICHTIG: Nach dem Senden von C-c und vor dem naechsten send-keys mindestens 1-2 Sekunden
   warten, danach IMMER per `tmux capture-pane -t whisky-preview -p | tail -15` pruefen, dass
   "Ready in" tatsaechlich im Output erscheint UND per `ps aux | grep next-server` dass ein
   Prozess wirklich laeuft, BEVOR du den Neustart als erfolgreich meldest. Beim letzten Mal
   ist der Neustart-Befehl kommentarlos haengengeblieben und der Server lief mehrere Minuten
   gar nicht, ohne dass das im Log auffiel - das darf nicht nochmal passieren.
4. curl-Tests wie in QA-Checkliste oben, gegen http://49.12.14.62:3000 (nicht nur localhost)
5. git add, commit, push (KEINE .env, KEINE data/admin-settings.json committen - .gitignore
   pruefen)

### Abschluss
Fasse am Ende klar zusammen: welche Bugs behoben wurden (mit Verweis auf die Root Causes
oben), welche neuen Features fertig sind, Ergebnis der QA-Checkliste (alle 11 Punkte
einzeln), Login-URL zum erneuten Testen durch Christian.
