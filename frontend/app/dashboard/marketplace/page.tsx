"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/dashboard/product-card"
import { Lock, ShoppingCart, AlertCircle, ShoppingBag, Filter } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { Tabs } from "@/components/ui/tabs"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Meteors } from "@/components/ui/meteors"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["E-commerce", "Food"]

const products = [
  {
    id: "1",
    title: "Premium Headphones",
    description: "High-quality wireless headphones with ANC",
    priceShm: 150,
    priceUsdc: 100,
    category: "E-commerce" as const,
    inStock: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Gourmet Coffee Beans",
    description: "Single-origin Ethiopian arabica blend",
    priceShm: 45,
    priceUsdc: 30,
    category: "Food" as const,
    inStock: true,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Smart Watch",
    description: "Fitness tracking with heart rate monitor",
    priceShm: 250,
    priceUsdc: 180,
    category: "E-commerce" as const,
    inStock: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Organic Pasta Set",
    description: "Artisanal whole wheat pasta collection",
    priceShm: 35,
    priceUsdc: 25,
    category: "Food" as const,
    inStock: true,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop",
  },
  {
    id: "5",
    title: "4K Webcam",
    description: "Professional streaming camera",
    priceShm: 300,
    priceUsdc: 220,
    category: "E-commerce" as const,
    inStock: true,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Premium Chocolate",
    description: "Belgian dark chocolate truffles",
    priceShm: 55,
    priceUsdc: 40,
    category: "Food" as const,
    inStock: true,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd5bfd6?w=300&h=300&fit=crop",
  },
]

export default function MarketplacePage() {
  const { address, isConnected } = useWallet()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<Map<string, number>>(new Map())
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [userCredit, setUserCredit] = useState(100)
  const [loading, setLoading] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Fetch user credit score when wallet connects
  useEffect(() => {
    if (!isConnected || !address) {
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/user/${address}`
        )
        if (response.ok) {
          const data = await response.json()
          setUserCredit(data.creditScore || 100)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [address, isConnected])

  const filteredProducts = !selectedCategory
    ? products
    : products.filter((p) => p.category === selectedCategory)

  const totalPrice = Array.from(cartItems.entries()).reduce((sum, [productId, qty]) => {
    const product = products.find((p) => p.id === productId)
    return sum + (product?.priceShm || 0) * qty
  }, 0)

  const cartCount = Array.from(cartItems.values()).reduce((sum, qty) => sum + qty, 0)

  const handleAddToCart = (productId: string) => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    setCartItems((prev) => {
      const newMap = new Map(prev)
      newMap.set(productId, (newMap.get(productId) || 0) + 1)
      return newMap
    })
  }

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => {
      const newMap = new Map(prev)
      const qty = newMap.get(productId) || 0
      if (qty <= 1) {
        newMap.delete(productId)
      } else {
        newMap.set(productId, qty - 1)
      }
      return newMap
    })
  }

  const handleCheckout = async () => {
    if (!isConnected || !address || cartItems.size === 0) {
      alert("Please connect wallet and add items to cart")
      return
    }

    if (totalPrice > userCredit) {
      alert(`Insufficient funds. You need ${totalPrice} ETH but only have ${userCredit} ETH`)
      return
    }

    setIsCheckingOut(true)
    try {
      // Call token transfer API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/transfer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: address,
            to: "0x1234567890abcdef1234567890abcdef12345678", // Marketplace contract
            amount: totalPrice,
            items: Array.from(cartItems.entries()).map(([id, qty]) => ({
              productId: id,
              quantity: qty,
            })),
          }),
        }
      )

      if (response.ok) {
        setPurchaseSuccess(true)
        setCartItems(new Map())
        setTimeout(() => setPurchaseSuccess(false), 3000)
      } else {
        alert("Purchase failed. Please try again.")
      }
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Purchase failed. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  const isLocked = userCredit < 30

  if (!isConnected) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-balance">DeFi Marketplace</h1>
          <p className="text-muted-foreground mt-2">Shop with flexible payment options</p>
        </div>
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground">Please connect your wallet to browse and purchase items from the marketplace.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-balance">DeFi Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Shop with flexible payment options • Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
      </div>

      {isLocked && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-6 border-red-500/40 bg-red-500/5 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <Lock className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-500 mb-1 tracking-tight">Access Restricted</h3>
                <p className="text-sm text-red-500/70">
                  A minimum credit score of <span className="font-bold">30</span> is required. Your current score is <span className="font-bold">{userCredit}</span>.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {purchaseSuccess && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 border-green-500/40 bg-green-500/5 backdrop-blur-md">
            <p className="text-green-500 font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Purchase successful! Your assets are being provisioned.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white/40 text-sm font-semibold uppercase tracking-widest">
          <Filter className="h-4 w-4" />
          Filter by Category
        </div>
        <Tabs
          tabs={[
            { title: "All Products", value: "null" },
            { title: "E-commerce", value: "E-commerce" },
            { title: "Food", value: "Food" },
          ]}
          onChange={(tab) => setSelectedCategory(tab.value === "null" ? null : tab.value)}
          containerClassName="bg-black/20 p-1 rounded-full border border-white/5 w-fit"
        />
      </div>

      {/* Products Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <BackgroundGradient className="rounded-[22px] p-px bg-black group h-full">
                <Card className="overflow-hidden bg-zinc-950/80 border-none shadow-none flex flex-col h-full relative">
                  <div className="relative group overflow-hidden h-48">
                    <Meteors number={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white uppercase tracking-tighter">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-4 flex flex-col flex-1">
                    <div>
                      <h3 className="font-bold text-xl text-white tracking-tight leading-none mb-2">{product.title}</h3>
                      <p className="text-sm text-neutral-400 font-medium leading-relaxed line-clamp-2">{product.description}</p>
                    </div>
                    <div className="pt-4 mt-auto flex justify-between items-center border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Price</span>
                        <span className="text-2xl font-bold text-accent tracking-tighter">{product.priceShm} <span className="text-xs italic text-accent/60">ETH</span></span>
                      </div>
                      {!isLocked && product.inStock ? (
                        <Button
                          size="lg"
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-primary hover:bg-primary/90 h-11 px-6 rounded-xl shadow-lg shadow-primary/20"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      ) : (
                        <Button size="lg" disabled className="h-11 px-6 rounded-xl border-white/10 bg-white/5">
                          {isLocked ? "Low Score" : "Out of Stock"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </BackgroundGradient>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Cart Summary */}
      {!isLocked && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5" />
            <h3 className="text-xl font-bold">Shopping Cart</h3>
          </div>

          {cartItems.size === 0 ? (
            <p className="text-muted-foreground py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {Array.from(cartItems.entries()).map(([productId, qty]) => {
                  const product = products.find((p) => p.id === productId)
                  return (
                    <div
                      key={productId}
                      className="flex justify-between items-center text-sm p-2 bg-card rounded"
                    >
                      <span>
                        {product?.title} x{qty}
                      </span>
                      <div className="flex gap-2">
                        <span className="font-semibold">
                          {(product?.priceShm || 0) * qty} ETH
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(productId)}
                          className="text-red-500 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-border/40 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items: {cartCount}</span>
                  <span className="font-medium">{cartCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span className="font-medium">{userCredit} ETH</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className={totalPrice > userCredit ? "text-red-500" : ""}>
                    {totalPrice} ETH
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut || totalPrice > userCredit}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </>
          )}
        </Card>
      )}
    </div>
  )
}
