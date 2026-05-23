# ProofLayer

> The universal proof layer for human work in the AI era.

[![Status](https://img.shields.io/badge/status-MVP%20in%20development-yellow)](https://github.com/Carter254g/prooflayer)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-database-green)](https://supabase.com)

---

## 🌍 Overview

ProofLayer is a Web3-powered platform that creates verifiable proof of real-world human work.

Instead of relying on CVs, profiles, or claims, ProofLayer enables users to build a **living, verifiable history of work and contributions**.

| Who | What they prove |
|-----|----------------|
| Photographer | Completed shoots with media evidence |
| Developer | Finished projects and contributions |
| Delivery rider | Completed deliveries |
| Farmer | Documented agricultural activities |

Each activity becomes a verifiable proof record — building a transparent, trustworthy reputation system.

---

## ⚡ The Problem

Modern work systems suffer from:

- Fake CVs and inflated experience
- No verifiable work history
- Weak trust in freelancing and informal economies
- Fragmented identity and reputation systems
- Difficulty proving real-world contributions

As AI increases content and profile manipulation, trust becomes harder to verify.

---

## 💡 The Solution

ProofLayer introduces a new primitive: **a verifiable, tamper-resistant record of real-world work**.

Users can:
- Create proof of completed work with media evidence
- Receive peer verification from other users
- Build a public reputation timeline
- Anchor proof hashes on-chain for tamper-resistance

This creates a **portable trust layer for human work**.

---

## 🧠 Key Features

-  **Create Proof of Work** — title, description, category, media upload
-  **Peer Verification System** — other wallets verify your work
-  **Reputation Profiles** — public activity timeline per wallet
-  **Public Proof Feed** — real-time stream of verified work
-  **On-chain Proof Hashing** — anchored on Pharos testnet
-  **Mobile-first UI** — responsive across all devices

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Styling | TailwindCSS |
| Auth | Privy (email + wallet) |
| Database | Supabase (PostgreSQL + RLS) |
| Media | Cloudinary (images + video) |
| Web3 | ethers.js + Pharos Testnet |

---

## 🔗 Web3 Architecture

ProofLayer uses blockchain **only where it adds real value**:

- Storing proof hashes on-chain
- Recording verification events
- Ensuring tamper-proof records

>  Media and sensitive data are stored off-chain for efficiency and cost.

---

## 🚀 How It Works

```
1. User creates a proof of work
2. Media is uploaded to Cloudinary (off-chain)
3. Proof record is saved to Supabase
4. Proof hash is anchored on Pharos testnet (on-chain)
5. Other users verify the proof
6. Reputation score updates automatically
```

---

## 🧪 MVP Scope

This MVP includes:

-  Authentication (email + embedded wallet via Privy)
-  Proof creation with media upload
-  Public proof feed
-  Peer verification system (duplicate prevention)
-  User profiles
-  Smart contract integration (Pharos testnet)
-  Reputation scoring

> No tokens. No DeFi. No governance.

---

## 🛠️ Local Setup

```bash
git clone https://github.com/Carter254g/prooflayer
cd prooflayer
npm install
npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📊 Core Concepts

**Proof-first identity** — reputation is built from work, not profiles.

**Work history as a live stream** — every proof is timestamped and public.

**Verification over claims** — peers verify, not platforms.

**Portable reputation** — tied to your wallet, not a platform account.

---

## 📌 Roadmap

- [x] Phase 1 — UI + Design system
- [x] Phase 2 — Proof creation + media upload
- [x] Phase 3 — Verification system
- [ ] Phase 4 — Web3 integration (Pharos testnet)
- [ ] Phase 5 — Reputation scoring system
- [ ] Phase 6 — Public beta launch

---

##  Why This Matters

In a world of AI-generated content and fake credentials, ProofLayer provides:

**A trust infrastructure for real human work.**

It enables:
- Better hiring decisions
- Stronger freelancing trust
- Verifiable grant applications
- Visibility for informal economy workers

---

##  Status

MVP under active development. Smart contract integration in progress.

---

*Built with love for the humans who do real work.*