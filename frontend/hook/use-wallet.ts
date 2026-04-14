"use client"

import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi"
import { useCallback, useEffect, useState } from "react"

export function useWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const currentChainId = useChainId()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (connectors.length > 0) {
      console.log("Available connectors:", connectors.map(c => ({ name: c.name, id: c.id })))
    } else {
      console.warn("No connectors available - wagmi may not be properly initialized")
    }
  }, [connectors])

  // metaMask() connector registers with id "io.metamask"
  const connectMetaMask = useCallback(() => {
    const metaMaskConnector = connectors.find(
      (c) => c.id === "io.metamask" || c.id === "injected" || c.name.toLowerCase().includes("metamask")
    )
    if (metaMaskConnector) {
      console.log("Connecting with:", metaMaskConnector.name, metaMaskConnector.id)
      connect({ connector: metaMaskConnector })
    } else {
      console.warn("No injected wallet connector found. Available:", connectors.map(c => `${c.name}(${c.id})`))
      alert("MetaMask not found. Please install the MetaMask extension from https://metamask.io and refresh the page.")
    }
  }, [connect, connectors])

  const connectWalletConnect = useCallback(() => {
    const wcConnector = connectors.find(
      (c) => c.id === "walletConnect" || c.name.toLowerCase().includes("walletconnect")
    )
    if (wcConnector) {
      console.log("Connecting with WalletConnect:", wcConnector.id)
      connect({ connector: wcConnector })
    } else {
      console.warn("WalletConnect not available. Use MetaMask instead.")
      alert("WalletConnect requires a Project ID. Please use MetaMask instead.")
    }
  }, [connect, connectors])

  const connectCoinbase = useCallback(() => {
    const cbConnector = connectors.find(
      (c) => c.id === "coinbaseWalletSDK" || c.name.toLowerCase().includes("coinbase")
    )
    if (cbConnector) {
      console.log("Connecting with Coinbase:", cbConnector.id)
      connect({ connector: cbConnector })
    } else {
      console.warn("Coinbase Wallet connector not found.")
      alert("Coinbase Wallet is not available. Please use MetaMask instead.")
    }
  }, [connect, connectors])

  const isWrongNetwork = isConnected && currentChainId !== 11155111

  return {
    address,
    isConnected,
    isMounted,
    isWrongNetwork,
    connectMetaMask,
    connectWalletConnect,
    connectCoinbase,
    disconnect,
    status,
    error,
    connectors,
  }
}
