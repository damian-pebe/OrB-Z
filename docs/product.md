# OrB Z — Product

> **Status:** Draft
> **Purpose:** High-level product summary: what OrB Z is, who it’s for, the problem it solves, core capabilities, and short/mid-term product goals. This file is the single source of truth for stakeholders, designers, and developers before diving into technical details or repository structure.

---

## Executive summary

OrB Z is a hybrid platform (desktop app + web) for content creators, streamers, and media teams who need proactive copyright risk detection and real-time mitigation for video and audio. It combines AI-powered analysis to detect potential infringements with configurable mitigation actions (mute, blur, overlays) that can act live or on reviewed files. OrB Z also includes user management, billing, analytics, and admin tools.

---

## Vision

Enable creators to publish and stream with confidence by preventing copyright strikes and takedowns through fast, reliable detection and automated mitigation—while preserving user privacy and viewer experience.

---

## Product objectives

- Detect copyright risk in video/audio both in real time and via uploaded files.
- Provide automatic, configurable mitigation (mute, blur, overlay) that executes quickly.
- Offer a unified experience between the desktop app (control + live sources) and the web (accounts, billing, history, dashboards).
- Support business tiers with usage limits, differentiated features, and usage analytics.
- Provide local AI execution options for privacy and low-latency scenarios.

---

## Target users

- Streamers (Twitch, YouTube Live, Facebook Live).
- Video creators (YouTube, social platforms) who want pre-publication checks.
- Production teams and channel managers handling multiple streams.
- Enterprise partners seeking content verification via API/SDK.

---

## Problem statement

Creators risk strikes, demonetization, and content removal due to copyrighted material. Manual review is slow and unreliable in live scenarios. OrB Z automates detection and response to reduce risk and manual intervention.

---

## Value proposition — Why choose OrB Z

- **Proactive, real-time detection** to stop issues before they become strikes.
- **Automatic, configurable mitigations** (mute, blur, overlays) that activate in milliseconds.
- **Flexible deployment**: run AI locally for privacy/latency or in the cloud for scale.
- **Complete ecosystem**: desktop app for live control + web for account management, billing, and analytics.
- **Tiered plans** to fit different creator needs and budgets.

---

## Key features (high level)

- AI analysis of frames and audio to estimate risk levels (very low → very high).
- Real-time alerts and user-configurable notification rules.
- Visual mitigation: blur, overlays, watermarks.
- Audio mitigation: mute, overlay sound replacement.
- Scene/source management with drag & drop and z-order.
- Review history, incident evidence, and timestamps.
- Web dashboard with metrics, usage, billing, and plan management.
- APIs (GraphQL + REST) for integration.
- Local AI mode for offline operation and privacy.

---

## Tiers & differentiators (vision)

- **Basic (LOW)** — On-demand file review, alerts, and reports.
- **Mid (MID)** — Real-time detection, automatic blur and mute, basic overlays.
- **High (HIGH)** — Custom overlays, custom overlay sounds, advanced mitigation options, priority AI processing.

> Detailed feature-by-tier mapping belongs in the product backlog.

---

## Scope (what’s included) and limits (out of scope for now)

**Included:** frame-based detection, basic audio classification, Electron↔local AI integration, dashboards, token-based authentication, basic tiering.
**Out of scope (initially):** precise selective audio removal without affecting other audio tracks, collaborative multi-user live editing, a public marketplace for overlay assets. These are candidate features for later phases.

---

## Key user flows (summary)

1. **Sign up & purchase** — create account on the web, select plan, receive token.
2. **Install & connect** — install desktop app, authenticate with token, sync plan.
3. **File review** — upload video, AI analyzes, present report, allow user actions.
4. **Live protection** — select source/scene, AI analyzes frames locally or remotely, trigger mitigation rules automatically.
5. **Dashboard & support** — review history, metrics, billing; submit support requests.

---

## Success metrics (initial KPIs)

- Reduction in incidents that lead to strikes (per user / month).
- Average detection → mitigation latency (target: < 0.5–1s for critical actions).
- User retention by tier (30/60/90 days).
- Time-to-analyze for a video of X minutes (batch performance).
- Trial → paid conversion rate; churn rate.
- False positive / false negative rates measured via user feedback.

---

## Privacy & security considerations

- Option to run AI locally to avoid uploading sensitive content.
- Secure transport (HTTPS/TLS) for cloud services.
- Token-based auth (JWT or opaque tokens) with revocation support.
- Minimize storage of raw sensitive content; prefer hashes or extracted evidence where possible.
- Baseline compliance with privacy regulations (GDPR/CCPA) and internationalization support.

---

## Strategic integrations / dependencies (high level)

- AI models: YOLO family (object/logo detection), audio tools (Librosa, Whisper, Chromaprint).
- Backend: GraphQL + REST for users, billing, history.
- Payment gateway: Stripe, Paddle, or similar for subscriptions.
- Cloud infra: GCP (Cloud Run) for AI/cloud services; Vercel for website hosting.

---

## Roadmap (phased)

- **Phase 0 (MVP):** file uploads + review, dashboard basics, tokens, simple tiers.
- **Phase 1:** real-time detection & mitigation (blur/mute), multi-source scenes, local AI embedding.
- **Phase 2:** model improvements to reduce false positives, custom overlays, advanced billing features.
- **Phase 3:** premium capabilities (selective audio removal, asset marketplace, enterprise integrations).
