/**
 * ChainCraft Quantum Edition
 * Mock Cellframe SDK Adapter — used for hackathon/demo builds
 * Simulates quantum-safe key handling, NFT minting, and wallet ops.
 */

console.log("✅ Cellframe SDK Mock loaded — running in demo mode.");

// --- Mock Wallet Connection ---
export function connectWallet() {
  console.log("🔗 Mock wallet connected!");
  return {
    address: "0x" + Math.random().toString(16).substr(2, 8).toUpperCase(),
    chain: "Cellframe Quantum Mocknet",
    balance: (Math.random() * 10).toFixed(3) + " MOCK",
  };
}

// --- Mock NFT Minting ---
export function mintNFT(metadata) {
  const tokenId = Math.floor(Math.random() * 9999);
  console.log("🎨 Minting mock NFT:", metadata);
  return {
    tokenId,
    txHash: "0xMOCKTX_" + Math.random().toString(16).substr(2, 10),
    metadata,
    status: "success",
  };
}

// --- Mock Messaging / XMTP Simulation ---
export function sendMessage(to, message) {
  console.log(`💬 Mock message sent to ${to}: "${message}"`);
  return {
    to,
    message,
    timestamp: new Date().toISOString(),
  };
}

// --- Mock Tip (ERC-20 style transfer) ---
export function sendTip(to, amount) {
  console.log(`💸 Sent ${amount} MOCK tokens to ${to}`);
  return {
    to,
    amount,
    txHash: "0xMOCKTX_" + Math.random().toString(16).substr(2, 8),
    status: "confirmed",
  };
}

// --- Mock Balance Fetch ---
export function getBalance(address) {
  const balance = (Math.random() * 5).toFixed(2);
  console.log(`💰 Balance for ${address}: ${balance} MOCK`);
  return { address, balance };
}

// --- Default Export (for Vite/Vercel compatibility) ---
export default {
  connectWallet,
  mintNFT,
  sendMessage,
  sendTip,
  getBalance,
};export default {
  connectWallet,
  mintNFT,
  getWalletBalance,
  sendMessage
};// Mock Cellframe SDK adapter for local demos.
// Replace with real Cellframe SDK calls when available.
module.exports = {
  init: async function initCellframe() {
    console.log('[cellframe-mock] init');
    return { network: 'mock-cellframe', ready: true };
  },
  generateQuantumSafeKey: async function() {
    // Returns a mock 'quantum-safe' keypair object (simulate)
    return { pubKey: 'CF_MOCK_PUB_' + Date.now(), privKey: 'CF_MOCK_PRIV' };
  },
  signMessage: async function(privKey, message) {
    // In real adapter, perform quantum-safe signature via Cellframe SDK
    return 'signed:' + Buffer.from(message).toString('base64');
  }
};
