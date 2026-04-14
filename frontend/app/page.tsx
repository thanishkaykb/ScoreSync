"use client"
import Link from "next/link"
import { ArrowRight, Lock, Zap, TrendingUp, ShoppingCart, Shield, Cpu, Globe, Rocket, UserCheck, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SparklesCore } from "@/components/ui/sparkles"
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Spotlight } from "@/components/ui/spotlight"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Meteors } from "@/components/ui/meteors"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { motion, AnimatePresence } from "framer-motion"

export default function LandingPage() {
  const features = [
    {
      title: "Zero-Knowledge Verification",
      description: "Prove your creditworthiness without revealing sensitive financial information using vlayer ZK Proofs.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 p-4 items-center justify-center relative overflow-hidden">
        <Meteors number={10} />
        <Shield className="h-10 w-10 text-primary animate-pulse z-10" />
      </div>,
      icon: <Lock className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
    {
      title: "AI Agent Wallets",
      description: "Deploy autonomous agents for smart trading and payments.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-white/10 p-4 items-center justify-center">
        <Cpu className="h-10 w-10 text-accent" />
      </div>,
      icon: <Zap className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Flexible Credit",
      description: "Access instant uncollateralized credit lines with transparent scoring.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/10 p-4 items-center justify-center">
        <TrendingUp className="h-10 w-10 text-primary" />
      </div>,
      icon: <TrendingUp className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Premium Marketplace",
      description: "Browse high-end DeFi products with integrated credit-fi payment options.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-white/10 p-4 items-center justify-center">
        <ShoppingCart className="h-10 w-10 text-accent" />
      </div>,
      icon: <ShoppingCart className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
  ]

  const techStack = [
    {
      quote: "The bedrock of modern web applications, providing high performance and SEO excellence.",
      name: "Next.js 15",
      title: "Framework",
    },
    {
      quote: "Enterprise-grade smart contract language for secure, decentralized financial logic.",
      name: "Solidity",
      title: "Blockchain",
    },
    {
      quote: "Next-generation zero-knowledge infrastructure for private web proof generation.",
      name: "vlayer",
      title: "ZK Protocol",
    },
    {
      quote: "The industry standard for rapid, utility-first styling with high visual impact.",
      name: "Tailwind CSS",
      title: "Styling",
    },
    {
      quote: "Cinematic web animations that bring interfaces to life with physics-based motion.",
      name: "Framer Motion",
      title: "Animations",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20"></div>
            <span className="font-bold text-lg text-foreground tracking-tight">Cred-Score</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technology</a>
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
        <BackgroundBeams />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--primary)" />
        
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#635BFF"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl">
          <HeroHighlight>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <p className="text-xs font-medium text-primary tracking-wider uppercase">Live on Sepolia Testnet</p>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
              >
                <span className="text-white drop-shadow-sm">The Next Gen</span>
                <br />
                <Highlight className="text-white">Credit-Fi Layer</Highlight>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Unlock autonomous financial potential with zero-knowledge verification, 
                AI agent wallets, and flexible on-chain credit lines.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pb-10"
              >
                <Link href="/dashboard">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="div"
                    className="bg-black text-white flex items-center space-x-2 px-8 py-3"
                  >
                    <span className="text-lg font-bold">Launch App</span>
                    <ArrowRight className="h-5 w-5" />
                  </HoverBorderGradient>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-white border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10">
                    How it works
                  </Button>
                </Link>
              </motion.div>
            </div>
          </HeroHighlight>
        </div>
      </section>

      {/* Features Section with Tracing Beam */}
      <section id="features" className="py-24 relative overflow-hidden bg-dot-white/[0.05]">
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <TracingBeam className="px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
              >
                The Architecture of <span className="text-accent underline decoration-accent/30 underline-offset-8">Trust</span>
              </motion.h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                Built on next-generation zero-knowledge infrastructure and autonomous AI routing layers.
              </p>
            </div>

            <BentoGrid className="max-w-7xl mx-auto">
              {features.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={item.className}
                />
              ))}
            </BentoGrid>
          </div>
        </TracingBeam>
      </section>

      {/* Technology Carousel */}
      <section id="technology" className="py-32 px-4 bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Technology Stack</h2>
          <p className="text-muted-foreground text-lg">Powering the next generation of decentralized credit infrastructure</p>
        </div>
        
        <div className="flex justify-center flex-col antialiased items-center relative overflow-hidden">
          <InfiniteMovingCards
            items={techStack}
            direction="right"
            speed="slow"
          />
        </div>
      </section>

      {/* CTA Section with Background Beams */}
      <section className="py-24 relative overflow-hidden">
        <BackgroundBeams />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BackgroundGradient className="rounded-[32px] p-8 md:p-16 bg-black/40 backdrop-blur-3xl border border-white/10">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Ready to unlock your <br />
                <span className="text-primary italic">Financial Autonomy?</span>
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
                Join the thousands of users leveraging Cred-Score's autonomous credit layers on Sepolia and beyond.
              </p>
              <div className="flex gap-4">
                <Link href="/dashboard">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="div"
                    className="bg-black text-white px-10 py-4"
                  >
                    <span className="text-xl font-bold">Get Started Now</span>
                  </HoverBorderGradient>
                </Link>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-16 text-lg border-white/10 hover:bg-white/5">
                  <Github className="h-6 w-6 mr-2" />
                  View Source
                </Button>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
            <span className="font-bold text-xl tracking-tighter">Cred-Score</span>
          </div>
          <div className="flex gap-10 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Sepolia Explorer</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          </div>
          <p className="text-sm text-neutral-500 font-mono">© 2026 DEPLOYED ON SEPOLIA</p>
        </div>
      </footer>
    </div>
  )
}

