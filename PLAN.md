# Entwicklungsplan: Christians Whisky Sammlung

## Projekt-Überblick
- Shop-Name: "Christians Whisky Sammlung"
- Zweck: Privatverkauf von ca. 80 Whisky-Flaschen
- Tech-Stack: Next.js 14 App Router, Tailwind CSS, TypeScript

## Phase 1: Setup & Infrastruktur (sequenziell)
- [x] Projektstruktur lesen
- [ ] Next.js 14 + Tailwind initialisieren
- [ ] JSON-Schema und Beispieldaten anlegen
- [ ] Knowledge-Base klonen

## Phase 2: Frontend-Entwicklung (parallel)

### Agent: ui
- Startseite (/) mit Featured Cards und Privatverkauf-Banner
- Produktkatalog (/katalog) mit Filter/Sortierung
- Produktdetailseite (/katalog/[slug]) mit Bildergalerie
- Kaufanfrage-Modal mit Formularen und Checkboxen
- Pakete-Seite (/pakete)
- Impressum (/impressum)
- Layout mit Navigation und Footer

### Agent: backend
- API-Route /api/contact (Resend E-Mail)
- Fehlerbehandlung und Validierung

## Phase 3: DevOps & Dokumentation (parallel)

### Agent: devops
- Dockerfile multi-stage Build
- docker-compose.yml
- .env.example
- README.md
- Git-Commits und Push

### Agent: documentation
- Obsidian Knowledge-Base Dokumente
- architektur.md, tech-stack.md, datenmodell.md
- design-entscheidungen.md, komponenten.md
- deployment.md, besondere-stellen.md

## Abhängigkeiten
```
Phase 1 → Phase 2 (parallel) → Phase 3 (parallel)
```

## Asana Tasks
- Setup: 1216033832910133 (JSON-Schema), 1216052283385635 (Next.js)
- Frontend: 1216033933500162, 1216033933668881, 1216033933647360, 1216033838586627, 1216033933398856
- DevOps: 1216033933721356

## Zeitplan
Gesamtdauer: ca. 45-60 Minuten
