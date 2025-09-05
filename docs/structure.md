# OrB Z — Project structure (structure.md)

> **Estado:** Borrador
> **Propósito:** Describir la estructura de carpetas y archivos del proyecto OrB Z (desktop + web). Incluye explicación de los directorios clave, archivos importantes y recomendaciones para mantener el repo organizado.

---

## Resumen rápido

Este repo combina la app de escritorio (Electron + Next.js renderer) con la porción web/ui y librerías compartidas. Los archivos que se muestran abajo provienen de las capturas que compartiste y están organizados para separar: `docs`, assets públicos, código fuente (`src`), electron-specific code y módulos UI reusables.

---

## Estructura propuesta (detallada)

```
/ (repo root)
├─ dist-electron/                 # Build output para el paquete de Electron
├─ docs/
│  ├─ product.md
│  ├─ structure.md
│  └─ tech.md
├─ node_modules/
├─ public/
│  ├─ background.png
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  ├─ 22x22.png
│  │  └─ orbzlogo.jpg
│  ├─ components/
│  │  └─ ui/
│  │     ├─ button.tsx
│  │     ├─ checkbox.tsx
│  │     └─ dialog.tsx
│  ├─ electron/
│  │  ├─ lib/
│  │  │  └─ desktopSources.ts
│  │  ├─ settings/
│  │  │  ├─ mainWindowConfig.ts
│  │  │  ├─ pathResolver.ts
│  │  │  ├─ tray.ts
│  │  ├─ main.ts
│  │  ├─ preload.cts
│  │  ├─ util.ts
│  │  └─ tsconfig.json
│  ├─ lib/
│  │  └─ utils.ts
│  ├─ locales/
│  │  ├─ en.ts
│  │  └─ es.ts
│  └─ ui/
│     └─ src/
│        ├─ components/
│        │  ├─ glassContainer.tsx
│        │  ├─ item.tsx
│        │  ├─ separator.tsx
│        │  └─ TitleWrapper.tsx
│        ├─ hooks/
│        │  └─ useLanguage.ts
│        ├─ lib/
│        │  └─ fetcher.ts
│        ├─ pages/
│        │  ├─ help/
│        │  │  ├─ fontsView.tsx
│        │  │  ├─ Loader.tsx
│        │  │  └─ toggleTranslate.tsx
│        │  ├─ landing/
│        │  │  ├─ components/
│        │  │  └─ views/
│        │  │     └─ LandingPage.tsx
│        │  └─ navbar/
│        │     └─ Navbar.tsx
│        ├─ queries/
│        │  ├─ auth.ts
│        │  └─ user.ts
│        └ stores/
│           └─ useScreenStore.ts
└
```

---

## Descripción de carpetas clave

- **docs/**

  - Documentación de producto/tech/estructura. Mantener estos `.md` actualizados. Útil para onboarding y decisiones de producto.

- **public/**

  - Archivos estáticos del sitio/desktop (imagenes, favicons). Next.js sirve `public/` tal cual.

- **src/assets/**

  - Assets importados dentro de la app (logos, icons usados desde componentes).

- **src/components/ui/**

  - Componentes UI atómicos y comunes (botones, diálogos, checkboxes). Diseñados para ser independientes y exportables.

- **src/ui/**

  - Código específico de la interfaz (páginas, componentes de alto nivel, hooks y utilidades del UI). Esta carpeta puede tratarse como un pequeño paquete dentro del repo que puede compartirse entre web y desktop renderer.

- **src/electron/**

  - Código específico del proceso principal y utilidades de Electron:

    - `main.ts` — entry point del Main process.
    - `preload.cts` — script preload para exponer APIs seguras al renderer (contextBridge).
    - `tray.ts`, `mainWindowConfig.ts` — configuraciones y helpers de ventanas y bandeja.
    - `lib/desktopSources.ts` — lógica para descubrir y administrar fuentes (desktopCapturer wrappers).

- **src/lib/**

  - Utilidades generales (helpers, formateadores, adaptadores) compartidos por varias capas.

- **src/locales/**

  - Ficheros de i18n para ES/EN.

- **dist-electron/**

  - Output tras empaquetar la app con `electron-builder` u otro empaquetador.

---

## Archivos importantes en root

- **package.json** — scripts de dev/build/start (web, desktop, packaging). Mantener scripts claros: `dev:web`, `dev:desktop`, `build:web`, `build:desktop`, `package:desktop`.
- **tsconfig.json** — configuración TypeScript; puede haber tsconfig específicos en subcarpetas si necesitas targets distintos (electron main, renderer).
- **README.md** — guía rápida de instalación y comandos.

---

## Buenas prácticas y recomendaciones

1. **Separar responsabilidades:** Mantén la lógica de Electron (main) fuera del renderer UI. Solo comunica mediante canales seguros (IPC o contextBridge).
2. **Shared UI package:** Sigue manteniendo `src/ui` como origen de verdad para componentes compartidos entre Next.js web y Next.js dentro de Electron. Exporta desde `src/ui/src/index.ts` para facilitar imports: `import { Button } from 'src/ui'`.
3. **Pre-signed uploads:** Para cargas de vídeos pesados, genera URLs firmadas desde backend en lugar de subir por GraphQL.
4. **Dev docker-compose:** Añade un `infra/docker-compose.yml` con postgres, redis y minio para reproducir entorno local rápidamente.
5. **Testing:** agrega carpetas `__tests__` cerca de módulos críticos y una carpeta `e2e/` para pruebas de integración/playwright.
6. **CI/CD:** Crear workflows en `.github/workflows` para lint, test, build, y artefactos (desktop releases automatizadas).
