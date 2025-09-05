# OrB Z — Tech

> **Status:** Draft
> **Purpose:** Technical decisions, architecture overview and concrete tech choices for the OrB Z platform. Use this as the single place to decide _what_ we build with and _why_—implementation details and folder layout go in `structure.md`.

---

# 1. High-level architecture (summary)

OrB Z is a distributed system with four main layers:

1. **Desktop client (Electron + React)** — UI for live protection, scene management and local integrations. Can run a local AI service or call cloud APIs.
2. **AI service (Python, FastAPI)** — inference & audio/video processing (local or cloud). Exposes a simple REST (or WebSocket) inference endpoint.
3. **Backend (GraphQL + REST)** — user management, billing, usage tracking, admin operations. GraphQL for rich nested queries (dashboard), REST for high-throughput endpoints.
4. **Website (Next.js)** — marketing, auth flows, subscription checkout, docs, and user dashboard.

Supporting components: PostgreSQL for persistent data, Redis for caching/quotas/token revocation, object storage (GCS/S3) for uploads/artifacts, message bus/pubsub for async jobs and notifications, observability stack (metrics/logs/traces), CI/CD pipelines and container images.

---

# 2. Core technology choices & rationale

## Desktop client

- **Electron** — cross-platform desktop app with web tech; good fit for capturing windows, managing native windows and bundling.
- **React** — component-based UI, reuses web components and design system.
- **Zustand** — lightweight global state for predictable state management in desktop without heavy boilerplate.
- **React Query (TanStack Query)** — server state, caching, optimistic updates for settings, usage and dashboard data.
- **i18next or similar** — for Spanish/English localization (the docs reference i18).
- **Integrations**: `desktopCapturer`, `<canvas>` capture pipeline, native APIs for window controls and system audio.

**Why:** Electron + React gives fastest iteration and shared UI code with the web dashboard. Zustand keeps bundle small; React Query handles caching and background refreshes elegantly.

---

## Website / Marketing / Auth

- **Next.js** (React framework) — SSR/SSG for SEO-critical pages, API routes for light server logic.
- **Tailwind CSS** — fast styling and consistent tokens with Design System.
- **Framer/GSAP** — advanced transitions on landing pages (only where they improve UX).
- **Hosting:** Vercel for the website (preview deployments, edge caching).
- **Images:** Pexels for placeholder/marketing assets.

**Why:** SEO and marketing performance matter; Next.js + Vercel gives deploy previews, SSG/SSR and best-in-class DX.

---

## Backend & APIs

- **GraphQL (Apollo Server / GraphQL Yoga / similar)** — dashboard, nested data and admin interfaces. Prefer a typed GraphQL stack (TypeScript + codegen).
- **REST (Express / Fastify)** — ML model endpoints, lightweight high-throughput endpoints. Keep ML inference REST endpoints simple and fast.
- **Auth:** JWT or opaque tokens for desktop API access; standard email/password flows on the website with HttpOnly cookies for the web app. Token revocation via Redis.
- **Rate limiting & API Gateway:** Use Cloud/managed API Gateway (or Kong/Nginx) to centralize auth, quotas and logging.

**Why:** GraphQL is ideal for dashboard clients needing flexible nested queries. REST is simpler and lower-latency for model inference.

---

## Machine Learning / Inference

- **Languages / frameworks:** Python, PyTorch (or TensorFlow/PyTorch hybrid), OpenCV.
- **Audio tools:** Librosa, Chromaprint (audio fingerprinting), Whisper (ASR/transcription where helpful).
- **Object detection:** YOLO family (v4/v5/v8 depending on constraints) or lightweight detectors for local inference.
- **Packaging:** FastAPI as the inference server (async), PyInstaller to create local executables for desktop bundling.
- **Serving options:**

  - **Local mode:** Run inference as a spawned child process or local server that the Electron app communicates with over HTTP/WebSocket.

**Why:** Python offers the richest ML ecosystem. FastAPI is async-friendly, easy to test and fast to deploy.

---

## Databases & storage

- **Primary DB:** PostgreSQL (relational data: users, plans, tokens, audit logs).
- **Cache / sessions / token revocation:** Redis.
- **Object storage:** GCS (preferred if in GCP) or S3 for video artifacts, overlays, and uploaded assets. Use signed URLs to minimize backend load.
- **Search / analytics (optional):** ElasticSearch or BigQuery for large-scale analytics & logs.

---

## Messaging & async processing

- **Pub/Sub or RabbitMQ / Redis Streams** — for background tasks (long inference jobs, telemetry pipelines, email/send-notifications).
- **Worker framework:** Celery, RQ, or custom Python async workers to run heavy processing, enqueue uploads for model batching or longer video analysis.

---

## Observability & monitoring

- **Logging:** Structured logs (JSON) forwarded to centralized logging (Cloud Logging, ELK, or Loki).
- **Metrics:** Prometheus + Grafana or Cloud Monitoring. Expose `/metrics`.
- **Tracing:** OpenTelemetry for distributed traces across Electron → API → ML service.
- **Error tracking:** Sentry (for frontend, backend and desktop Renderer processes).

---

## CI / CD and packaging

- **CI tools:** GitHub Actions (recommended) for linting, tests, building images and publishing artifacts.
- **Desktop packaging:** `electron-builder` to produce installers for macOS, Windows and Linux. Include Python AI binary in the installer (see packaging notes).
- **Website deploys:** Vercel for Next.js (preview + production).
- **Backend deploys:** Cloud Run or Kubernetes (GKE) depending on scale. Use Terraform for infra as code.

---

# 3. Communication patterns & API contracts

## Desktop ↔ AI service

Two practical options:

1. **Local HTTP server (FastAPI)**

   - Desktop starts local server (spawn child process or bundle the binary).
   - Electron sends `POST /predict` with `multipart/form-data` (image buffer or small video chunk) or base64 JSON for small frames.
   - FastAPI returns JSON prediction with structure (see example below).

2. **Child process + STDIN/STDOUT**

   - Electron spawns Python process and communicates via stdio for very low overhead IPC (suitable for embedded binary).
   - Use a small framing protocol (length-prefixed JSON) or gRPC over unix sockets.

## Desktop ↔ Backend (GraphQL/REST)

- Desktop uses GraphQL for user/profile/dashboard data (use an authenticated HTTP Link).
- For uploads, use pre-signed object storage URLs (REST) to avoid large file transfer through GraphQL.

---

# 4. Security & privacy

- **Transport:** enforce HTTPS, TLS 1.2+. For local connections, bind to localhost and use ephemeral tokens.
- **Auth:** JWT for API tokens; store tokens in `user_tokens` table with `expires_at` and `status`. Support token revocation via Redis blacklist.
- **Secrets management:** use cloud secret manager (GCP Secret Manager) or Vault. Never store secrets in repo.
- **Data minimization:** avoid storing raw user videos unless necessary; store processed evidence, hashes, snippets. Offer opt-in upload and expiration policies.
- **Desktop sandboxing:** minimize permissions; require explicit user consent for capturing windows/audio.
- **Supply chain:** sign releases (code signing for macOS/Windows), verify downloaded binaries via signatures.

---

# 5. Packaging & distribution (desktop + AI local bundling)

- **Packaging strategy:**

  - Build Electron app with `electron-builder`.
  - Build Python AI service into a portable binary using **PyInstaller** (or `shiv`/`pex`) for each target OS.
  - Include the AI binary inside the installer and run it on first-launch or on-demand.

- **Startup:** Electron spawns the bundled AI binary as a child process; monitor health and restart if needed. Provide UI for starting/stopping local model and for switching to cloud-mode.

---

# 6. Scalability & cost considerations

- For cloud inference: containerize and deploy to Cloud Run with autoscaling and concurrency tuning. Use GPU-backed instances only for heavy models.
- Cost optimization: detect scene changes to reduce the number of frames sent for inference (batch or sample intelligently). Use cheaper tiers for large customers with partial feature sets.
- Caching: cache model results for repeated frames/segments using content hashes.

---

# 7. Testing strategy

- **Unit tests:** Jest for React; Pytest for Python code.
- **Integration tests:** run end-to-end tests simulating desktop → local AI or desktop → cloud AI flows (use mocked inference for CI).
- **E2E tests:** Playwright or Cypress for website flows (signup, checkout, dashboard).
- **Contract tests:** GraphQL schema tests and API contract tests (Pact or custom).
- **Performance tests:** load-test ML endpoints (k6, Locust) to estimate concurrency and cost.

---

# 8. Developer tooling & DX

- **Monorepo vs Multi-repo:** Prefer multiple repos (desktop, website, backend, ai-service) to keep CI fast; use a lightweight orchestration repo or GitHub organization-level templates.
- **Type-safety:** TypeScript for frontend & backend (where possible). GraphQL codegen to generate types for the client.
- **Linters & formatters:** ESLint + Prettier for JS/TS; Black + Flake8 for Python. Enforce pre-commit hooks.

---

# 9. Recommended conventions & versions (guidelines)

- **Node / npm:** use active LTS (use `.nvmrc` in repos).
- **React:** 19.1
- **Electron:** 37.2.4
- **Python:** 3.10+ (depending on dependency support).
- **Package management:** npm workspaces for frontend monorepos; pip + Poetry (or pipenv) for Python.
