// Network Configuration
export const Sepolia_TESTNET = {
  chainId: 11155111,
  name: "Sepolia Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://rpc.sepolia.org"],
  blockExplorerUrls: ["https://sepolia.etherscan.io/"],
}

// Smart Contract Addresses (Deployed on Sepolia Testnet)
export const CONTRACT_ADDRESSES = {
  flexCreditCore: "0x50a607d07e6C8ad9F4068F7A1234d59f3f17158c",
  agentPolicy: "0xf054DA140dC1C98ED5233f4781463eAB9F9a5ba1",
  incomeProofVerifier: "0xD45C86a89F9b7535D5E4535D40E3F9a6D5B09D09",
  agentPerformanceVerifier: "0x526dc51c1C0Bd7177f96785c2C98eEc9F3A65975",
  confidentialScore: "0xdB00315Ecc551b5A1125fC0f341Eed1a3031FF2b", // Update after Inco deployment
  // Legacy placeholders
  agentWalletFactory: "0x0000000000000000000000000000000000000000",
  marketplaceRouter: "0x0000000000000000000000000000000000000000",
  tokenVault: "0x0000000000000000000000000000000000000000",
  creditOracle: "0x0000000000000000000000000000000000000000",
}

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// Feature Gate Score Requirements
export const FEATURE_GATES = {
  marketplace: 30,
  borrowing: 40,
  agents: 50,
  dexTrading: 60,
}

// Credit Score Tiers
export const CREDIT_TIERS = {
  excellent: { min: 80, label: "Excellent", color: "#10b981" },
  good: { min: 60, max: 79, label: "Good", color: "#3b82f6" },
  fair: { min: 40, max: 59, label: "Fair", color: "#f59e0b" },
  building: { min: 0, max: 39, label: "Building", color: "#ef4444" },
}

// Verification Providers
export const VERIFICATION_PROVIDERS = ["Wise", "Binance", "Stripe", "PayPal"] as const
