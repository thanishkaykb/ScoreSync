# Cred-Score Frontend

Next.js-based frontend for the Cred-Score DeFi credit platform with real-time wallet integration and interactive dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or pnpm
- MetaMask or compatible Web3 wallet

### Installation

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_project_id
```

4. Start development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Directory Structure

```
frontend/
├── app/                          # Next.js app directory
│   ├── dashboard/               # Protected dashboard routes
│   │   ├── agents/             # AI agents management page
│   │   │   └── page.tsx
│   │   ├── credit/             # Credit management page
│   │   │   └── page.tsx
│   │   ├── marketplace/        # Marketplace page
│   │   │   └── page.tsx
│   │   ├── settings/           # User settings page
│   │   │   └── page.tsx
│   │   ├── layout.tsx          # Dashboard layout with navigation
│   │   └── page.tsx            # Dashboard home page
│   ├── page.tsx                # Landing page
│   └── layout.tsx              # Root layout with providers
│
├── components/
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── agent-card.tsx      # AI agent card component
│   │   ├── credit-badge.tsx    # Credit score badge
│   │   ├── credit-score-circle.tsx
│   │   ├── dashboard-client.tsx # Main dashboard client component
│   │   ├── top-nav.tsx         # Top navigation bar
│   │   ├── side-nav.tsx        # Sidebar navigation
│   │   ├── bottom-nav.tsx      # Bottom mobile navigation
│   │   └── product-card.tsx    # Product/item card
│   │
│   ├── modals/                 # Modal dialog components
│   │   ├── borrow-modal.tsx
│   │   ├── repay-modal.tsx
│   │   ├── send-transaction-modal.tsx
│   │   ├── deploy-agent-modal.tsx
│   │   └── income-verification-modal.tsx
│   │
│   ├── providers.tsx           # App providers (Context, Wagmi, etc.)
│   ├── theme-provider.tsx      # Theme context provider
│   │
│   └── ui/                     # shadcn/ui components
│       ├── card.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── badge.tsx
│       └── ... (other UI components)
│
├── hooks/                      # Custom React hooks
│   ├── use-wallet.ts          # Wallet connection hook
│   ├── use-contract.ts        # Smart contract interaction
│   ├── use-mobile.ts          # Mobile detection
│   └── use-toast.ts           # Toast notifications
│
├── lib/                        # Utilities and helpers
│   ├── api.ts                 # API client functions
│   ├── constants.ts           # App constants
│   ├── context.ts             # React context setup
│   ├── contract-abi.ts        # Smart contract ABIs
│   ├── types.ts               # TypeScript types
│   ├── utils.ts               # Utility functions
│   └── wagmi-config.ts        # Wagmi configuration
│
├── public/                     # Static assets
│   └── images/
│
├── styles/                     # Global styles
│   └── globals.css
│
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json             # shadcn/ui config
└── package.json
```

## 🎨 Key Pages

### Landing Page (`/`)
- Hero section with platform features
- Feature showcase cards
- Network information (Shardeum Mezame)
- Call-to-action buttons

### Dashboard Home (`/dashboard`)
- Real-time wallet balance (fetched from blockchain)
- Credit score and metrics
- Available credit display
- Recent transaction history
- Quick action buttons (Send/Receive)

### AI Agents (`/dashboard/agents`)
- Deploy new AI agents
- View deployed agents with status
- Pause/Resume agent operations
- Agent explanations and capabilities
- Performance metrics and limits

### Credit Management (`/dashboard/credit`)
- Credit score visualization
- Borrow and repay options
- Credit history
- Interest calculations
- Credit utilization tracking

### Marketplace (`/dashboard/marketplace`)
- Browse available products/services
- Purchase with credit
- Payment options

### Settings (`/dashboard/settings`)
- Display connected wallet address (dynamic)
- Copy wallet address functionality
- Network information
- Disconnect wallet
- Notification preferences
- Privacy settings

## 🔌 Wallet Integration

### Supported Wallets
- MetaMask
- WalletConnect
- Coinbase Wallet

### Wagmi Configuration
Configured in `lib/wagmi-config.ts` with:
- Shardeum Mezame network (Chain ID: 8119)
- Multiple wallet connectors
- Auto-connect capability

### useWallet Hook
```tsx
import { useWallet } from '@/hooks/use-wallet'

function MyComponent() {
  const { 
    address,           // Connected wallet address
    isConnected,       // Connection status
    connectMetaMask,   // Connect MetaMask
    disconnect         // Disconnect wallet
  } = useWallet()
  
  return (
    // component JSX
  )
}
```

## 🛠 Custom Hooks

### useWallet()
Provides wallet connection state and functions.

```tsx
const { address, isConnected, connectMetaMask, disconnect } = useWallet()
```

### useContract()
Interact with smart contracts.

```tsx
const { contract, isLoading, error } = useContract(contractAddress, abi)
```

### useMobile()
Detect mobile viewport.

```tsx
const isMobile = useMobile()
```

### useToast()
Show toast notifications.

```tsx
const { toast } = useToast()
toast({ title: "Success", description: "Action completed" })
```

## 📡 API Integration

### Backend API Client (`lib/api.ts`)
```tsx
// Fetch user data
const userData = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}`
)

// Transfer tokens
const result = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/transfer`,
  { method: 'POST', body: JSON.stringify({ from, to, amount }) }
)

// Wallet analysis
const analysis = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/wallet-analysis/${address}`
)
```

## 🎯 Components

### DashboardClient
Main dashboard component that:
- Fetches user data from backend
- Displays wallet balance
- Shows credit metrics
- Lists recent transactions
- Handles error states

### AgentCard
Displays individual AI agent with:
- Agent name and type
- Status (Active/Paused)
- Daily limit and reputation
- Performance metrics
- Control buttons

### CreditScoreCircle
Circular visual representation of credit score.

### TransactionTable
Displays transaction history with:
- Type (Send/Receive/Transfer/etc)
- Amount
- Status
- Date/Time

## 🎨 Styling

### Tailwind CSS
Utility-first CSS framework with:
- Custom color palette (primary, accent, foreground, etc.)
- Responsive design (mobile-first)
- Dark mode support

### shadcn/ui Components
Pre-built component library based on Radix UI:
- Button, Card, Dialog, Form
- Dropdown, Popover, Tooltip
- Table, Accordion, Tabs
- And more...

## 🔐 Environment Variables

Required environment variables in `.env.local`:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001

# WalletConnect Project ID (optional, for WalletConnect support)
NEXT_PUBLIC_WALLET_CONNECT_ID=your_project_id

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 📦 Dependencies

Key dependencies:
- **next**: React framework for production
- **react**: UI library
- **typescript**: Type safety
- **tailwindcss**: Styling framework
- **wagmi**: Ethereum library for React
- **ethers**: Ethereum utilities
- **radix-ui**: Unstyled accessible components
- **lucide-react**: Icon library

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Export (Static)
```bash
npm run export
```

### Deployment to Vercel
```bash
npm install -g vercel
vercel
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Build Check
```bash
npm run build
```

### Lint Check
```bash
npm run lint
```

## 🐛 Common Issues

### Wallet Not Connecting
1. Ensure MetaMask is installed and Shardeum Mezame is added
2. Check that wallet is on Shardeum Mezame (Chain ID: 8119)
3. Verify backend API URL is correct in `.env.local`

### Balance Not Updating
1. Check that backend is running on `http://localhost:3001`
2. Verify wallet address is correctly formatted
3. Ensure RPC endpoint is accessible

### UI Issues
1. Clear browser cache and rebuild: `npm run build`
2. Check Tailwind CSS configuration
3. Verify all shadcn/ui components are installed

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [wagmi Documentation](https://wagmi.sh)
- [Shardeum Documentation](https://shardeum.org/docs)

## 🤝 Contributing

See main [README.md](../README.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.
