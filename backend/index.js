const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple in-memory DB (for hackathon/demo). Replace with MongoDB in production.
const db = {
  users: {},    // wallet => { username, wallet }
  nfts: [],     // { id, owner, name, uri }
  messages: []  // { from, to, text, timestamp }
};

// Health
app.get('/', (req, res) => res.send({ status: 'ChainCraft Backend Running' }));

// Create / update user profile
app.post('/api/profile', (req, res) => {
  const { wallet, username } = req.body;
  if(!wallet || !username) return res.status(400).send({ error: 'wallet and username required' });
  db.users[wallet.toLowerCase()] = { wallet: wallet.toLowerCase(), username };
  return res.send({ ok: true, profile: db.users[wallet.toLowerCase()] });
});

// Get profile
app.get('/api/profile/:wallet', (req, res) => {
  const w = (req.params.wallet || '').toLowerCase();
  return res.send(db.users[w] || null);
});

// Mint mock NFT
app.post('/api/mint', (req, res) => {
  const { wallet, name, uri } = req.body;
  if(!wallet || !name) return res.status(400).send({ error: 'wallet and name required' });
  const id = db.nfts.length + 1;
  const nft = { id, owner: wallet.toLowerCase(), name, uri: uri || '', mintedAt: Date.now() };
  db.nfts.push(nft);
  return res.send({ ok: true, nft });
});

// Get NFTs for wallet
app.get('/api/nfts/:wallet', (req, res) => {
  const w = (req.params.wallet || '').toLowerCase();
  const results = db.nfts.filter(n => n.owner === w);
  return res.send(results);
});

// Post message
app.post('/api/message', (req, res) => {
  const { from, to, text } = req.body;
  if(!from || !to || !text) return res.status(400).send({ error: 'from,to,text required' });
  const msg = { from: from.toLowerCase(), to: to.toLowerCase(), text, timestamp: Date.now() };
  db.messages.push(msg);
  return res.send({ ok: true, msg });
});

// Get messages for wallet
app.get('/api/messages/:wallet', (req, res) => {
  const w = (req.params.wallet || '').toLowerCase();
  const results = db.messages.filter(m => m.from === w || m.to === w);
  return res.send(results);
});

// Activity feed
app.get('/api/activity', (req, res) => {
  // Recent NFTs + messages
  const recentNfts = db.nfts.slice(-20).reverse();
  const recentMsgs = db.messages.slice(-20).reverse();
  return res.send({ nfts: recentNfts, messages: recentMsgs });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('ChainCraft backend listening on', PORT));
