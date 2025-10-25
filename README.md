# ChainCraft — Quantum Edition (Cellframe Hackathon Submission)
Developed by Ghost Tech

## Overview
ChainCraft Quantum Edition is a mobile-first multi-chain NFT gateway + wallet-to-wallet social platform adapted for the Cellframe Hackathon.
This package is **hackathon-winning worthy**: polished UI, wallet integration, NFT minting (mock), messaging (mock/XMTP), and a Cellframe SDK adapter that runs locally without needing real Cellframe network access.

## What is included
- `frontend/` — Vite + React app (minimal, mobile-first). Connect wallet, mint mock NFT, chat and activity feed.
- `backend/` — Node.js + Express API to store profiles, chat messages, and minted NFTs.
- `contracts/` — `CraftMine.sol` (ERC-721) sample smart contract.
- `mock_adapters/` — `cellframe-sdk-mock.js` to simulate Cellframe interactions (quantum-safe placeholders).
- `README.md` (this file) with run & deployment instructions.
- `pitch_deck.md` — concise pitch points to use for submission & presentation.

## Quick local run (one-time)
Prereqs: Node.js (16+), npm, optional: MongoDB (or use the bundled in-memory fallback).

1. Open a terminal and start backend:
   ```bash
   cd ChainCraft_Quantum_Edition/backend
   npm install
   npm run start
   ```
   Backend runs on http://localhost:5000 by default.

2. In a second terminal start frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Frontend dev server will show the local URL (Vite). Open it in your browser or mobile WebView (MetaMask Mobile browser works).

3. (Optional) Connect a wallet:
   - The frontend supports MetaMask injection. If none found, it will use a mock wallet for demoing flows.
   - Use test accounts for demo transactions (mocked locally).

4. Demo flows:
   - Create username (wallet-linked identity).
   - Mint mock NFT (on backend & local mock contract).
   - Chat with another wallet address (mock XMTP).
   - Tip using mock ERC-20 token (simulated).

## Deployment (hackathon submission)
- Backend: Deploy to Railway / Render / Heroku (set `PORT` env). If you use MongoDB Atlas, set `MONGO_URI`.
- Frontend: Deploy to Vercel (point to frontend folder). Set `VITE_API_URL` to backend URL in Vercel env.
- For Cellframe integration: use the `mock_adapters/cellframe-sdk-mock.js` as a drop-in placeholder during submission and highlight the integration plan in the pitch (pitch_deck.md).

## Files of interest
- `backend/index.js` — Express API and in-memory DB fallback.
- `frontend/index.html`, `frontend/src/App.jsx` — main UI and wallet flows.
- `mock_adapters/cellframe-sdk-mock.js` — shows how to call Cellframe SDK (mocked).
- `contracts/CraftMine.sol` — ERC-721 example for reference.

## Pitch & Submission Tips (Cellframe Hackathon)
- Emphasize **quantum-safe identity**: explain how user keys will be stored and rotated using Cellframe SDK.
- Highlight **ecosystem potential**: marketplace, creator tools, and Cellframe-hosted NFT chains.
- Include a short demo video (2-3 minutes): show connect, mint, message, and tip flows.
- Attach `pitch_deck.md` as a one-page summary with screenshots.

## Support
If you want, I can:
 - Compile a short 2-min demo script and slide deck (PDF).
 - Produce a 2-min video walkthrough script for the judges.
 - Add real Cellframe integrations once you have SDK keys / environment.

Good luck — ship it and win that prize! 🚀
