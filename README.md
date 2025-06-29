# OrB Z – Real-Time Copyright Risk Detection for Streamers

# *OrB Z*
 is an AI-powered SaaS platform that analyzes your live stream in real-time to detect and flag potentially copyrighted content — before platforms like YouTube or Twitch can issue a claim or strike. Designed with creators in mind, OrB z helps streamers stay compliant while focusing on what matters: content.

---

## 🚀 Features

- 🎶 **Music Recognition**
  - Custom audio fingerprinting to identify copyrighted songs
- 🎥 **Visual Detection**
  - Frame analysis using YOLOv8 and OpenAI CLIP to catch logos, cutscenes, and more
- 🗣️ **Speech-to-Text Matching**
  - Real-time transcription and comparison against known movie/game scripts
- ⚠️ **Live Copyright Alerts**
  - Warnings via dashboard, API, or webhook before risky content goes public
- 📊 **Stream Dashboard**
  - View detection history, flagged content, and risk reports

---

## 🛠️ Tech Stack

| Layer             | Tech                                |
| ----------------- | ----------------------------------- |
| Frontend          | React + Tailwind + Redux + TanStack |
| Desktop Framework | Electron                            |
| Backend API       | Node.js / Express.js                |
| Audio Analysis    | Librosa, FFmpeg, Whisper            |
| Video Detection   | YOLOv8, OpenCV, CLIP                |
| DB / Vector Store | PostgreSQL + pgvector / FAISS       |
| Ingest            | RTMP / WebRTC / SDK                 |

---

## 📦 Installation (Local Dev)

> ⚠️ This is the MVP setup. Production-ready deployment coming soon.

1. **Clone the repo**

```bash
git clone https://github.com/your-username/orbz.git
```

2. **Navigate to the repo**

```bash
cd orbz
```

3. **Insall al dependencies**

```bash
npm install | npm i
```

4. **Run the dev environment**

```bash
npm run dev
```

> ⚠️ Production-ready deployment coming soon, Expected Demo in 3 months.

🌐 API (Coming Soon)
A RESTful API and WebSocket interface will be available for integration with overlays, bots, and external tools.
> ⚠️ Production-ready API deployment coming soon

📈 Roadmap
- Audio fingerprint engine

- Real-time stream ingest

- Scene/logo detection MVP

- Speech detection integration

- Streamer-facing dashboard

- Webhook alerts

> ***For website***

  - SaaS billing + user auth 

> ***For Desktop***

- **TOKENS BILLING MANAGMENT** 
- *SaaS billing + user auth*
