// mock_adapters/cellframe-sdk-mock.js

// --- Mock Functions ---
async function connectWallet() {
  return {
    address: "0xFAKE_WALLET_123456789",
    network: "Cellframe Quantum Testnet",
    balance: "1000 CRAFT",
  };
}

async function mintNFT(metadata) {
  return {
    success: true,
    txHash: "0xFAKE_TX_HASH_12345",
    tokenId: Math.floor(Math.random() * 10000),
    metadata,
  };
}

async function sendTip(to, amount) {
  return {
    success: true,
    message: `Sent ${amount} CRAFT to ${to}`,
  };
}

async function getBalance(address) {
  return {
    address,
    balance: "999.5 CRAFT",
  };
}

// --- Single Export ---
const cellframe = {
  connectWallet,
  mintNFT,
  sendTip,
  getBalance,
};

export default cellframe;
