import { createConfig, http } from "wagmi"
import { baseSepolia, sepolia } from "wagmi/chains"
import { injected, coinbaseWallet, walletConnect } from "wagmi/connectors"

// Build connectors — WalletConnect only if a valid project ID is provided
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

const connectors = [
  injected({ target: 'metaMask' }),
  coinbaseWallet({ appName: "Cred-Score" }),
  ...(projectId
    ? [walletConnect({ projectId })]
    : []),
]

export const config = createConfig({
  chains: [sepolia, baseSepolia],
  connectors,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org"),
    [baseSepolia.id]: http(),
  },
  ssr: true,
})
