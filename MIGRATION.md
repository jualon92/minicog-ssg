# MIGRATION.md — Mini-Cog: rewrite de Ionic SPA a Angular SSG

> Documento de handoff para el agente. Contiene el análisis del proyecto actual
> (`jualon92/miniCog-ionic`), la arquitectura objetivo y el plan de migración por fases.
> Leer completo antes de tocar código.

## 1. Contexto

- **App actual:** https://mini-cog-test.web.app/ — PWA que guía el test de screening
  cognitivo Mini-Cog (registro de 3 palabras → dibujo del reloj → scoring → resultados).
- **Repo actual:** https://github.com/jualon92/miniCog-ionic (Angular 18 + Ionic 8 + NgModules).
- **Problema:** Lighthouse bajo en Performance y SEO. La app es una SPA pura: el HTML
  que reciben los crawlers es un shell vacío ("Please enable JavaScript..."). Además,
  exceso de dependencias de UI y deuda de scaffold.
- **Objetivo:** rewrite en **Angular 19/20 con SSG (prerender)**, cero librerías de UI,
  accesibilidad como feature central (audiencia: adultos mayores), SEO bilingüe (es/en).
- **Meta medible:** Lighthouse ≥ 95 en las 4 categorías (target 100 en SEO y Accessibility),
  documentando scores antes/después para case study.

## 2. Diagnóstico del proyecto actual (hallazgos concretos)

Estos problemas fueron verificados leyendo el código. Sirven como checklist de
"qué NO repetir" en el proyecto nuevo:

### Performance

1. **Triple stack de UI:** Ionic 8 + PrimeNG 17 + font-awesome + primeicons + ionicons.
   En `global.scss` se importa el theme completo de PrimeNG (`lara-light-blue`,
   `primeng.min.css`, `primeicons.css`) globalmente, para usar apenas `p-card`,
   `p-messages` y un slider.
2. **Builder legacy:** `@angular-devkit/build-angular:browser` (webpack) en vez del
   application builder (esbuild).
3. **Scaffold muerto:** `tabs/`, `tab1/`, `tab2/`, `tab3/` del starter de Ionic siguen
   en el repo y se compilan, aunque el routing real no los usa.
4. **ServiceWorkerModule registrado dos veces** en `app.module.ts`, una de ellas con
   `enabled: true` incondicional (activo incluso en dev). `BrowserModule` también
   importado dos veces.
5. `index.html` con `<link rel="manifest">` y `theme-color` duplicados 4 veces.

### SEO

6. Sin SSR/SSG: contenido invisible para crawlers.
7. `lang="en"` hardcodeado en `<html>` pero la app es bilingüe (Transloco) y el
   contenido default está en español.
8. Sin meta description, sin Open Graph, sin JSON-LD.
9. Ruta con typo: `clow-drawing` (debería ser `clock-drawing`). URLs no semánticas.
10. i18n solo en runtime: Google indexa un solo idioma.

### Accesibilidad

11. `user-scalable=no, maximum-scale=1.0` en el viewport — bloquea zoom. Crítico
    para la audiencia objetivo y fail directo de Lighthouse Accessibility.
12. Typo `arial-label="continue"` en `home.page.html` — el botón queda sin label accesible.
13. Estilos inline dispersos en templates, ids genéricos (`title1`, `p1`).

### Código

14. `setTimeout(..., 1)` en `ngOnInit` para esperar el storage async de `@ionic/storage`
    (hay TODOs del propio autor pidiendo resolvers).
15. TTS vía `@capacitor-community/text-to-speech`, que en web es un wrapper de la
    Web Speech API — dependencia innecesaria si no hay build nativo.

### Dato clave para la migración

El "clock drawing" **no es un canvas**: son instrucciones en texto (el usuario dibuja
en papel). Toda la app es contenido estático + un slider de puntaje + persistencia
local. Es 100% prerenderizable.

## 3. Arquitectura objetivo

- **Angular 19 o 20**, standalone components (sin NgModules), signals donde aplique.
- **SSG:** `@angular/ssr` con `outputMode: 'static'` y prerender de TODAS las rutas
  de ambos idiomas. Hosting: Firebase Hosting (estático puro, sin Cloud Functions).
- **UI: cero librerías.** HTML semántico + CSS propio (custom properties, `clamp()`
  para tipografía fluida). Sin Ionic, sin PrimeNG, sin icon fonts (SVG inline si hace falta).
- **Angular CDK** permitido solo para a11y: `LiveAnnouncer`, `FocusMonitor`, `A11yModule`.
- **i18n como rutas estáticas:** `/es/...` y `/en/...` prerenderizadas por separado,
  con `hreflang` recíproco y `<html lang>` correcto por ruta. Puede resolverse con
  Transloco + un route param de idioma, o con archivos de traducción cargados en
  build time. Redirect de `/` según `Accept-Language` no es posible en estático puro:
  usar landing con detección client-side + link canónico, o default a `/es/`.
- **Estado:** servicio propio sobre `localStorage`, guardado detrás de
  `isPlatformBrowser` / `afterNextRender` para no romper el prerender. Reemplaza
  `@ionic/storage`. Usar route resolvers o signals, nunca `setTimeout`.
- **TTS:** Web Speech API nativa (`speechSynthesis`), envuelta en un servicio con
  guard de plataforma. Elimina la dependencia de Capacitor.
- **PWA:** mantener `@angular/service-worker` (registrado UNA vez, `enabled: !isDevMode()`),
  manifest único.

## 4. Mapa de rutas objetivo

| Ruta ES                      | Ruta EN                       | Contenido                                          |
| ---------------------------- | ----------------------------- | -------------------------------------------------- |
| `/es/`                       | `/en/`                        | Home / FAQ (qué es la app, qué es el Mini-Cog)     |
| `/es/antes-de-empezar`       | `/en/before-we-start`         | Instrucciones previas                              |
| `/es/registro-tres-palabras` | `/en/three-word-registration` | Paso 1 del test                                    |
| `/es/dibujo-del-reloj`       | `/en/clock-drawing`           | Paso 2 (instrucciones, sin canvas)                 |
| `/es/puntaje`                | `/en/scoring`                 | Scoring de palabras                                |
| `/es/puntaje-reloj`          | `/en/clock-score`             | Scoring del reloj                                  |
| `/es/resultados`             | `/en/results`                 | Resultado + interpretación                         |
| `/es/historial`              | `/en/history`                 | Historial local (client-only, prerender del shell) |

Notas:

- Corregir el typo `clow-drawing` → `clock-drawing`.
- Cada ruta define `title` y `meta description` propios por idioma (usar `TitleStrategy`
  custom o el router `title` + un servicio de meta).
- `history` y `results` muestran datos de `localStorage`: prerenderizar el layout y
  poblar client-side (patrón shell + hidratación).

## 5. SEO checklist (por página)

- [ ] `<title>` y `<meta name="description">` únicos por ruta e idioma.
- [ ] `<html lang="es">` / `<html lang="en">` según ruta.
- [ ] `hreflang` alternates entre pares es/en + `x-default`.
- [ ] Canonical por página.
- [ ] Open Graph + Twitter card (title, description, og:image estática).
- [ ] JSON-LD: `MedicalWebPage` en home y `FAQPage` en la sección FAQ.
- [ ] `sitemap.xml` y `robots.txt` generados en build.
- [ ] Disclaimer visible: herramienta de screening, no reemplaza diagnóstico médico
      (importante también para E-E-A-T en contenido de salud).

## 6. Accesibilidad checklist

- [ ] Viewport SIN `user-scalable=no` ni `maximum-scale`.
- [ ] Zoom hasta 200% sin pérdida de contenido (WCAG 1.4.4).
- [ ] Contraste AA mínimo, target AAA en texto del test.
- [ ] Tipografía base generosa (≥ 18px equivalente) — audiencia adultos mayores.
- [ ] Un solo `<h1>` por página, jerarquía de headings correcta.
- [ ] Landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`.
- [ ] Foco visible custom (`:focus-visible`), orden de tabulación lógico.
- [ ] Al navegar entre pasos del test: mover foco al `<h1>` nuevo + `LiveAnnouncer`.
- [ ] Botones con `aria-label` correcto (bug actual: `arial-label`).
- [ ] Slider de scoring: usar `<input type="range">` nativo con `aria-valuetext`,
      o botones +/- explícitos (mejor para motricidad reducida).
- [ ] TTS con botón por bloque de texto, estado `aria-pressed`, y stop al navegar.
- [ ] Targets táctiles ≥ 44×44px.
- [ ] `prefers-reduced-motion` respetado en cualquier animación.

## 7. Plan por fases

### Fase 0 — Baseline

- Correr Lighthouse (mobile) contra https://mini-cog-test.web.app/ y guardar el
  reporte JSON/HTML en `docs/lighthouse/before/`. Es el "antes" del case study.

### Fase 1 — Scaffolding

- `ng new mini-cog --style=scss --ssr` (Angular 19/20, standalone).
- Configurar `outputMode: 'static'` y prerender.
- Estructura: `src/app/pages/`, `src/app/core/` (servicios), `src/app/shared/`
  (componentes UI propios: botón, card, mensaje/callout — reemplazos de p-card/p-messages).
- Routing bilingüe con las rutas de la sección 4 + redirects.
- `index.html` limpio: viewport correcto, manifest único, favicon, theme-color.

### Fase 2 — Migración de contenido

- Portar los JSON de i18n existentes (`src/assets/i18n/es.json`, `en.json`) — el
  contenido ya está escrito y validado, reusarlo.
- Implementar las páginas del flujo del test como componentes standalone con
  HTML semántico. Sin componentes de terceros.
- Servicio de storage sobre `localStorage` (API sync, guard SSR) con la misma
  semántica que el actual: `timesDone` (máx. 2 intentos), `wordPoints`,
  `clockPoints`, `history` (snapshots).
- Servicio TTS sobre `speechSynthesis` (es-ES / en-US, rate 0.9).

### Fase 3 — SEO + a11y

- Aplicar checklists de secciones 5 y 6.
- QR de "usá tu móvil" del home: reevaluar si se mantiene — la versión SSG debe ser
  responsive de verdad; si se mantiene, generar el QR como SVG estático en build,
  no con `angularx-qrcode` en runtime.

### Fase 4 — PWA + deploy

- Service worker (una sola registración), manifest, íconos existentes.
- `firebase.json` para hosting estático con headers de cache correctos
  (immutable para hashed assets, no-cache para index de cada ruta).
- Deploy y Lighthouse "after" en `docs/lighthouse/after/`. Comparar con baseline.

### Fase 5 — Cierre

- README nuevo con métricas antes/después.
- Verificar en Search Console que ambos idiomas indexan.

## 8. Reglas para el agente

- NO instalar librerías de UI (Ionic, PrimeNG, Material, Tailwind, icon fonts).
  Excepción única: `@angular/cdk` para a11y.
- NO usar `setTimeout` para sincronizar estado; usar resolvers, signals o
  `afterNextRender`.
- Todo acceso a `window`, `localStorage` o `speechSynthesis` debe estar protegido
  para que el prerender no falle.
- Mantener los textos de los JSON de i18n existentes; no reescribir contenido clínico
  sin pedirlo explícitamente.
- Commits chicos por fase; correr `ng build` (prerender) antes de dar por cerrada
  cada fase — si el prerender falla, la fase no está terminada.
- Ante ambigüedad de contenido o UX, preguntar antes de inventar.
