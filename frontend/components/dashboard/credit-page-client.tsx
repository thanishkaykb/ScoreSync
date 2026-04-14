"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditScoreCircle } from "./credit-score-circle"
import { Download, Lock, TrendingUp } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { BorrowModal } from "@/components/modals/borrow-modal"
import { RepayModal } from "@/components/modals/repay-modal"
import { useCreditContract } from "@/hooks/use-contract"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { BackgroundGradient } from "@/components/ui/background-gradient"

interface CreditData {
  creditScore: number
  factors: Array<{
    name: string
    value: number
    weight: number
  }>
}

export function CreditPageClient() {
  const { address, isConnected } = useWallet()
  const { getBorrow, setupCredit } = useCreditContract()

  const [creditData, setCreditData] = useState<CreditData | null>(null)
  const [loading, setLoading] = useState(false)
  const [settingUp, setSettingUp] = useState(false)
  const [borrowData, setBorrowData] = useState<{ debt: number; balance: number; limit?: number; income?: number } | null>(null)
  const [showBorrowModal, setShowBorrowModal] = useState(false)
  const [showRepayModal, setShowRepayModal] = useState(false)
  const [shmBalance, setShmBalance] = useState(0) // Sepolia native token balance

  // Demo funding address with ETH tokens
  const DEMO_FUNDING_ADDRESS = '0x2962B9266a48E8F83c583caD27Be093f231781b8' as const


  const handleSetupCredit = async (incomeBucket: number) => {
    if (!setupCredit) return
    setSettingUp(true)
    try {
      const hash = await setupCredit(incomeBucket)
      if (hash) {
        console.log("Credit setup transaction:", hash)
        // Refresh credit data after setup
        setTimeout(async () => {
          const borrowInfo = await getBorrow()
          if (borrowInfo) {
            setBorrowData(borrowInfo)
          }
        }, 3000)
      }
    } catch (error) {
      console.error("Error setting up credit:", error)
    } finally {
      setSettingUp(false)
    }
  }

  useEffect(() => {
    if (!isConnected || !address) {
      setCreditData(null)
      return
    }

    const fetchCreditData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/user/${address}`
        )

        if (response.ok) {
          const data = await response.json()
          console.log("📊 Credit data received:", data);
          console.log("📊 Credit score type:", typeof data.creditScore, "Value:", data.creditScore);

          setCreditData({
            creditScore: data.creditScore,
            factors: [
              { name: "On-chain Activity", value: (data.creditScore * 1.2) % 100, weight: 30 },
              { name: "Wallet Balance", value: (data.creditScore * 0.9) % 100, weight: 25 },
              { name: "Income Verification", value: (data.creditScore * 0.85) % 100, weight: 30 },
              { name: "Transaction History", value: (data.creditScore * 1.05) % 100, weight: 15 },
            ],
          })
        }

        // Fetch borrow/debt data
        try {
          const borrowInfo = await getBorrow()
          if (borrowInfo) {
            setBorrowData(borrowInfo)
          }
        } catch (error: any) {
          // Set default values if contract call fails
          console.log('ℹ️ Using default credit values')
          setBorrowData({ debt: 0, balance: 0, limit: 0, income: 0 })
        }
      } catch (error) {
        console.error("Error fetching credit data:", error)
        setCreditData({
          creditScore: 0,
          factors: [],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCreditData()
  }, [address, isConnected, getBorrow])

  // Calculate ETH amount based on credit score
  const getShmAmount = (score: number) => {
    if (score >= 70) return 200 // Good/Excellent score: 200 ETH
    if (score >= 40) return 33  // Fair score: 33 ETH
    return 0
  }

  // Fetch native ETH balance and calculate demo amount
  useEffect(() => {
    const fetchShmBalance = async () => {
      if (!creditData) return

      // Calculate ETH amount based on credit score
      const demoAmount = getShmAmount(creditData.creditScore)
      setShmBalance(demoAmount)
    }

    fetchShmBalance()
  }, [creditData])

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
            Credit Profile
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/80">
            Connect your wallet to view your credit score
          </p>
        </div>
      </div>
    )
  }

  if (loading || !creditData) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent animate-pulse">
            Loading Credit Profile...
          </h1>
          <div className="h-4 w-64 bg-white/20 rounded-full animate-pulse mt-4" />
        </div>
      </div>
    )
  }

  const getStatus = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 70) return "Good Standing"
    if (score >= 50) return "Fair"
    return "Building"
  }

  // Calculate eligible credit based on credit score (in ETH)
  const getEligibleCredit = (score: number) => {
    if (score >= 70) return 200 // Good/Excellent: 200 ETH
    if (score >= 40) return 33  // Fair: 33 ETH
    return 0 // Building: needs improvement
  }

  const eligibleCredit = creditData ? getEligibleCredit(creditData.creditScore) : 0
  const hasInitialized = borrowData && borrowData.limit !== undefined && borrowData.limit > 0

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="space-y-4 mb-8">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
          Credit Profile
        </h1>
        <p className="text-xl md:text-2xl font-medium text-white/80">
          View your credit score and factors
        </p>
      </div>

      {/* Credit Score Display */}
      <BackgroundGradient className="rounded-3xl p-0.5">
        <Card className="p-8 flex flex-col sm:flex-row items-center justify-between gap-8 bg-zinc-950 border-0 rounded-3xl">
          <CardContainer className="inter-var">
            <CardBody className="relative group/card w-auto h-auto">
              <CardItem translateZ="100" className="w-full">
                <CreditScoreCircle score={creditData.creditScore} size={200} />
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="flex-1 inter-var">
            <CardBody className="relative group/card w-auto h-auto">
              <CardItem translateZ="50">
                <h2 className="text-5xl font-extrabold mb-4 tracking-tight text-white">{getStatus(creditData.creditScore)}</h2>
              </CardItem>
              <CardItem translateZ="60">
                <p className="text-xl text-white/90 mb-8 leading-relaxed font-medium">
                  Your credit profile shows your financial activity and payment history based on your wallet address:<br/>
                  <span className="font-mono text-primary bg-primary/10 px-2 py-1 rounded-md text-xl mt-2 inline-block">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </p>
              </CardItem>
              <CardItem translateZ="70" className="flex flex-wrap gap-3">
                <Button className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                  <Download className="h-4 w-4 mr-2" />
                  Income Verification
                </Button>
              </CardItem>
            </CardBody>
          </CardContainer>
        </Card>
      </BackgroundGradient>

      {/* Score Breakdown */}
      <div className="space-y-6 mt-12 mb-8">
        <h3 className="text-4xl font-bold tracking-tight text-white mb-2">Score Breakdown</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {creditData.factors.map((factor, i) => (
            <CardContainer key={i} className="inter-var w-full">
              <CardBody className="relative group/card hover:shadow-xl hover:shadow-primary/5 bg-zinc-950 border border-white/10 w-full h-full rounded-2xl p-6 transition-all duration-300">
                <CardItem translateZ="50" className="w-full">
                  <div className="flex justify-between items-start mb-6 w-full gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-white text-2xl">{factor.name}</p>
                      <p className="text-base text-white/70 mt-2 font-medium">{factor.weight}% weight</p>
                    </div>
                    <CardItem translateZ="100" className="shrink-0">
                      <p className="text-5xl font-black text-primary drop-shadow-md">{Math.round(factor.value)}</p>
                    </CardItem>
                  </div>
                </CardItem>
                <CardItem translateZ="60" className="w-full">
                  <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-linear-to-r from-primary via-primary to-accent h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(factor.value, 100)}%` }}
                    />
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Credit Line Info */}
      <BackgroundGradient className="rounded-3xl p-0.5">
        <Card className="p-6 border-0 bg-zinc-950 rounded-3xl">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div className="flex-1 space-y-3">
              <h3 className="text-4xl font-bold tracking-tight text-white">Credit Line</h3>
              <p className="text-xl text-white/80 leading-relaxed font-medium">
                {hasInitialized
                  ? "Your active credit line based on your income tier"
                  : `Based on your ${creditData.creditScore} credit score, you're eligible for up to ${eligibleCredit.toFixed(0)} ETH`
                }
              </p>
              {hasInitialized && borrowData && typeof borrowData.limit === 'number' && borrowData.limit > 0 && (
                <p className="text-xl font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg inline-block">
                  Active Limit: {borrowData.limit.toFixed(2)} ETH
                </p>
              )}
            </div>
            <div className="w-20 h-20 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 ring-2 ring-primary/30">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <p className="text-base text-white/70 mb-4 uppercase tracking-widest font-bold">
                {hasInitialized ? "Available Credit" : "Eligible For"}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-6xl font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  {hasInitialized ? (borrowData?.balance.toFixed(2) || "0") : eligibleCredit}
                </p>
                <p className="text-xl text-white/60 font-bold">ETH</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <p className="text-base text-white/70 mb-4 uppercase tracking-widest font-bold">
                {hasInitialized ? "Borrowed Amount" : "Current Debt"}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-6xl font-black text-red-400">
                  {borrowData?.debt ? borrowData.debt.toFixed(2) : "0.00"}
                </p>
                <p className="text-xl text-white/60 font-bold">ETH</p>
              </div>
            </div>
          </div>

          {borrowData && borrowData.balance > 0 ? (
            <>
              <div className="mb-10">
                <p className="text-base text-white/70 mb-4 uppercase tracking-widest font-bold">Credit Utilization</p>
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                  <div
                    className="bg-linear-to-r from-accent via-primary to-primary h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-primary/30"
                    style={{
                      width: `${Math.min((borrowData.debt / (borrowData.balance + borrowData.debt)) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  onClick={() => setShowBorrowModal(true)}
                >
                  Borrow ETH
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => setShowRepayModal(true)}
                  disabled={!borrowData || borrowData.debt <= 0}
                >
                  Repay
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <p className="text-xl text-white/80 font-medium">
                  Choose your credit tier to activate:
                </p>
                <div className="inline-block">
                  <p className="text-base text-primary font-bold bg-primary/10 px-4 py-3 rounded-lg border border-primary/20 shadow-inner">
                    💡 Recommended: {creditData.creditScore >= 70 ? "200 ETH" : creditData.creditScore >= 40 ? "33 ETH" : "Build your score first"} based on your {creditData.creditScore} credit score
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSetupCredit(200)}
                  disabled={settingUp}
                  className="h-auto py-8 flex flex-col items-center justify-center gap-3 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group border-white/10 bg-white/5"
                >
                  <span className="text-6xl font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">200</span>
                  <span className="text-lg text-white/80 font-bold uppercase tracking-widest">High Credit Tier</span>
                  <span className="text-base text-white/50 font-medium tracking-widest">ETH</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSetupCredit(33)}
                  disabled={settingUp}
                  className="h-auto py-8 flex flex-col items-center justify-center gap-3 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 group border-white/10 bg-white/5"
                >
                  <span className="text-6xl font-black bg-linear-to-r from-accent to-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform">33</span>
                  <span className="text-lg text-white/80 font-bold uppercase tracking-widest">Standard Tier</span>
                  <span className="text-base text-white/50 font-medium tracking-widest">ETH</span>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </BackgroundGradient>

      {/* Modals */}
      {showBorrowModal && borrowData && (
        <BorrowModal
          availableCredit={borrowData.balance}
          apr={12}
          onClose={() => setShowBorrowModal(false)}
          onBorrow={() => {
            // Refresh data after borrow
            getBorrow().then(data => data && setBorrowData(data))
          }}
        />
      )}

      {showRepayModal && borrowData && (
        <RepayModal
          outstandingBalance={borrowData.debt}
          onClose={() => setShowRepayModal(false)}
          onRepay={() => {
            // Refresh data after repay
            getBorrow().then(data => data && setBorrowData(data))
          }}
        />
      )}
    </div>
  )
}
