"use client"

import Image from "next/image"
import { useApp } from "@/lib/store"
import {
  DollarSign,
  Package,
  ArrowRight,
  Shield,
  Trophy,
  Star,
  Truck,
} from "lucide-react"
import { useState } from "react"

export function InventoryScreen() {
  const { inventory, removeFromInventory, addBalance, navigateToList } = useApp()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showShipConfirm, setShowShipConfirm] = useState(false)

  const totalValue = inventory.reduce((sum, c) => sum + c.value, 0)
  const uniqueRarities = new Set(inventory.map(c => c.rarity)).size
  const selectedCard = inventory.find(c => c.id === selectedId)

  const handleQuickSell = (cardId: string, value: number) => {
    addBalance(Math.round(value * 0.85))
    removeFromInventory(cardId)
    if (selectedId === cardId) setSelectedId(null)
  }

  const handleSellAll = () => {
    const total = inventory.reduce((sum, c) => sum + Math.round(c.value * 0.85), 0)
    addBalance(total)
    inventory.forEach(c => removeFromInventory(c.id))
    setSelectedId(null)
  }

  if (inventory.length === 0) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Your Collection is Empty
          </h2>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Open packs to start building your collection. Every rip could reveal something legendary.
          </p>
          <button
            onClick={navigateToList}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-bold text-primary-foreground transition-all hover:brightness-110"
          >
            Browse Packs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Collection Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
          My Collection
        </h1>
        <p className="text-muted-foreground">
          {inventory.length} card{inventory.length !== 1 ? "s" : ""} owned
        </p>
      </div>

      {/* Stats Bar */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Total Cards</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{inventory.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Collection Value</span>
          </div>
          <p className="text-2xl font-bold text-primary">${totalValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Rarities</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{uniqueRarities}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Protected</span>
          </div>
          <p className="text-2xl font-bold text-foreground">100%</p>
        </div>
      </div>

      {/* Quick Sell All Banner */}
      {inventory.length > 1 && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-primary/30 bg-card p-4">
          <div>
            <p className="text-sm font-bold text-foreground">Sell entire collection</p>
            <p className="text-xs text-muted-foreground">
              Get ${Math.round(totalValue * 0.85)} instantly (85% value)
            </p>
          </div>
          <button
            onClick={handleSellAll}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
          >
            <DollarSign className="h-4 w-4" />
            Sell All
          </button>
        </div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Card Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {inventory.map(card => (
              <button
                key={card.id}
                onClick={() => setSelectedId(card.id === selectedId ? null : card.id)}
                className={`group relative overflow-hidden rounded-xl border transition-all ${
                  card.id === selectedId
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 22vw"
                  />
                </div>
                <div className="bg-card p-2 md:p-3">
                  <p className="truncate text-xs font-semibold text-foreground md:text-sm">
                    {card.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground md:text-xs">
                      PSA {card.grade}
                    </span>
                    <span className="text-xs font-bold text-primary md:text-sm">
                      ${card.value}
                    </span>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {card.rarity}
                  </span>
                </div>

                {/* Quick Sell Overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-card/95 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleQuickSell(card.id, card.value)
                    }}
                    className="flex w-full items-center justify-center gap-1.5 py-3 text-xs font-bold text-primary transition-colors hover:brightness-110"
                  >
                    <DollarSign className="h-3.5 w-3.5" />
                    Quick Sell ${Math.round(card.value * 0.85)}
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Detail Sidebar */}
        {selectedCard && (
          <div className="w-full lg:w-80">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <h3 className="mb-1 text-lg font-bold text-foreground">{selectedCard.name}</h3>
              <div className="mb-4 flex items-center gap-3 text-sm">
                <span className="font-medium text-primary">{selectedCard.rarity}</span>
                <span className="text-muted-foreground">PSA {selectedCard.grade}</span>
              </div>

              <div className="mb-4 rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Market Value</span>
                  <span className="text-lg font-bold text-foreground">${selectedCard.value}</span>
                </div>
              </div>

              {/* Sell button - PROMINENT */}
              <button
                onClick={() => handleQuickSell(selectedCard.id, selectedCard.value)}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
              >
                <DollarSign className="h-4 w-4" />
                Sell for ${Math.round(selectedCard.value * 0.85)}
              </button>

              {/* Ship button - heavily de-emphasized */}
              {!showShipConfirm ? (
                <button
                  onClick={() => setShowShipConfirm(true)}
                  className="flex w-full items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                >
                  <Truck className="h-3 w-3" />
                  Request physical shipping
                </button>
              ) : (
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <p className="mb-2 text-xs text-muted-foreground">
                    Shipping takes 2-4 weeks and a $15 processing fee applies. Cards cannot
                    be returned or sold once shipped.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowShipConfirm(false)}
                      className="flex-1 rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Keep Digital
                    </button>
                    <button
                      onClick={() => {
                        removeFromInventory(selectedCard.id)
                        setSelectedId(null)
                        setShowShipConfirm(false)
                      }}
                      className="rounded-lg px-3 py-2 text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                    >
                      Ship ($15)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
