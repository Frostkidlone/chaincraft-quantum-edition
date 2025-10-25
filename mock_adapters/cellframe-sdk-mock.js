// Mock Cellframe SDK adapter for local demos.
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
