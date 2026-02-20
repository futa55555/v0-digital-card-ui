"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { PackCard } from "./pack-data"

type Screen = "list" | "detail" | "result" | "inventory"

interface AppState {
  screen: Screen
  selectedPackId: string | null
  quantities: Record<string, number>
  openedCards: PackCard[]
  inventory: PackCard[]
  balance: number
  showPaymentDialog: boolean
  navigateToList: () => void
  navigateToDetail: (packId: string) => void
  navigateToResult: (cards: PackCard[]) => void
  navigateToInventory: () => void
  setQuantity: (packId: string, qty: number) => void
  getQuantity: (packId: string) => number
  addToInventory: (cards: PackCard[]) => void
  removeFromInventory: (cardId: string) => void
  removeMultipleFromInventory: (cardIds: string[]) => void
  addBalance: (amount: number) => void
  setShowPaymentDialog: (show: boolean) => void
  openFromList: (packId: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("list")
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [openedCards, setOpenedCards] = useState<PackCard[]>([])
  const [inventory, setInventory] = useState<PackCard[]>([])
  const [balance, setBalance] = useState(0)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  const navigateToList = useCallback(() => {
    setScreen("list")
    setSelectedPackId(null)
    setShowPaymentDialog(false)
  }, [])

  const navigateToDetail = useCallback((packId: string) => {
    setSelectedPackId(packId)
    setScreen("detail")
    setShowPaymentDialog(false)
  }, [])

  const navigateToResult = useCallback((cards: PackCard[]) => {
    setOpenedCards(cards)
    setScreen("result")
    setShowPaymentDialog(false)
  }, [])

  const navigateToInventory = useCallback(() => {
    setScreen("inventory")
    setShowPaymentDialog(false)
  }, [])

  const setQuantity = useCallback((packId: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [packId]: Math.max(1, Math.min(10, qty)) }))
  }, [])

  const getQuantity = useCallback((packId: string) => {
    return quantities[packId] || 1
  }, [quantities])

  const addToInventory = useCallback((cards: PackCard[]) => {
    setInventory(prev => [...prev, ...cards])
  }, [])

  const removeFromInventory = useCallback((cardId: string) => {
    setInventory(prev => prev.filter(c => c.id !== cardId))
  }, [])

  const removeMultipleFromInventory = useCallback((cardIds: string[]) => {
    const idSet = new Set(cardIds)
    setInventory(prev => prev.filter(c => !idSet.has(c.id)))
  }, [])

  const addBalance = useCallback((amount: number) => {
    setBalance(prev => prev + amount)
  }, [])

  const openFromList = useCallback((packId: string) => {
    setSelectedPackId(packId)
    setScreen("detail")
    setShowPaymentDialog(true)
  }, [])

  return (
    <AppContext.Provider
      value={{
        screen,
        selectedPackId,
        quantities,
        openedCards,
        inventory,
        balance,
        showPaymentDialog,
        navigateToList,
        navigateToDetail,
        navigateToResult,
        navigateToInventory,
        setQuantity,
        getQuantity,
        addToInventory,
        removeFromInventory,
        removeMultipleFromInventory,
        addBalance,
        setShowPaymentDialog,
        openFromList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
