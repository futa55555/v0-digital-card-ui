"use client"

import Image from "next/image"
import { useApp } from "@/lib/store"
import { isHighValue, getRarityColor, getRarityBg } from "@/lib/pack-data"
import {
  DollarSign,
  Package,
  ArrowRight,
  Trophy,
  Star,
  Truck,
  Sparkles,
  Zap,
  Trash2,
  CheckCircle2,
} from "lucide-react"
import { useState, useMemo } from "react"

export function InventoryScreen() {
  const { inventory, removeFromInventory, addBalance, navigateToList } = useApp()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showShipConfirm, setShowShipConfirm] = useState(false)
  const [bulkSelling, setBulkSelling] = useState(false)
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set())

  const highValueCards = useMemo(() => inventory.filter(isHighValue), [inventory])
  const lowValueCards = useMemo(() => inventory.filter(c => !isHighValue(c)), [inventory])

  const totalValue = inventory.reduce((sum, c) => sum + c.value, 0)
  const selectedCard = inventory.find(c => c.id === selectedId)

  const lowValueTotal = lowValueCards.reduce((sum, c) => sum + c.value, 0)
  const lowValueSellTotal = Math.round(lowValueTotal * 0.85)

  const handleQuickSell = (cardId: string, value: number) => {
    addBalance(Math.round(value * 0.85))
    removeFromInventory(cardId)
    if (selectedId === cardId) setSelectedId(null)
    bulkSelected.delete(cardId)
  }

  const handleSellAll = () => {
    const total = inventory.reduce((sum, c) => sum + Math.round(c.value * 0.85), 0)
    addBalance(total)
    inventory.forEach(c => removeFromInventory(c.id))
    setSelectedId(null)
    setBulkSelling(false)
    setBulkSelected(new Set())
  }

  const handleBulkSellLowValue = () => {
    addBalance(lowValueSellTotal)
    lowValueCards.forEach(c => removeFromInventory(c.id))
    setSelectedId(null)
    setBulkSelling(false)
    setBulkSelected(new Set())
  }

  const handleBulkSellSelected = () => {
    let total = 0
    bulkSelected.forEach(id => {
      const card = inventory.find(c => c.id === id)
      if (card) {
        total += Math.round(card.value * 0.85)
        removeFromInventory(card.id)
      }
    })
    addBalance(total)
    setBulkSelling(false)
    setBulkSelected(new Set())
    setSelectedId(null)
  }

  const toggleBulkCard = (id: string) => {
    const next = new Set(bulkSelected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setBulkSelected(next)
  }

  const selectAllLowValue = () => {
    setBulkSelected(new Set(lowValueCards.map(c => c.id)))
  }

  const bulkSellValue = useMemo(() => {
    let total = 0
    bulkSelected.forEach(id => {
      const card = inventory.find(c => c.id === id)
      if (card) total += Math.round(card.value * 0.85)
    })
    return total
  }, [bulkSelected, inventory])

  // Empty state
  if (inventory.length === 0) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="animate-spotlight text-center">
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-card">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-extrabold text-foreground">
            Your Vault is Empty
          </h2>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Open packs to start building your collection. Every rip could reveal something legendary.
          </p>
          <button
            onClick={navigateToList}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
            <Zap className="h-5 w-5" />
            Browse Packs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Vault Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            My Vault
          </h1>
          <p className="text-sm text-muted-foreground">
            {inventory.length} card{inventory.length !== 1 ? "s" : ""} &middot; ${totalValue} total value
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!bulkSelling && lowValueCards.length > 0 && (
            <button
              onClick={() => { setBulkSelling(true); selectAllLowValue() }}
              className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-card px-4 py-2.5 text-xs font-bold text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Bulk Sell
            </button>
          )}
          {inventory.length > 1 && (
            <button
              onClick={handleSellAll}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
            >
              <DollarSign className="h-3.5 w-3.5" />
              Sell All (${Math.round(totalValue * 0.85)})
            </button>
          )}
        </div>
      </div>

      {/* Bulk Sell Bar */}
      {bulkSelling && (
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-primary/30 bg-card p-4 shadow-lg shadow-primary/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{bulkSelected.size} cards selected</p>
              <p className="text-xs text-muted-foreground">
                Sell value: ${bulkSellValue}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={selectAllLowValue}
              className="rounded-lg border border-border/60 px-3 py-2 text-[10px] font-bold text-muted-foreground transition-all hover:text-foreground"
            >
              Select All Commons
            </button>
            <button
              onClick={() => { setBulkSelling(false); setBulkSelected(new Set()) }}
              className="rounded-lg border border-border/60 px-3 py-2 text-[10px] font-bold text-muted-foreground transition-all hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkSellSelected}
              disabled={bulkSelected.size === 0}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl disabled:opacity-40 disabled:shadow-none active:scale-[0.97]"
            >
              <DollarSign className="h-3.5 w-3.5" />
              Sell ({bulkSelected.size})
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          {/* HIGH-VALUE SHOWCASE */}
          {highValueCards.length > 0 && (
            <section className="mb-10">
              <div className="mb-5 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-extrabold text-foreground">Pickup Cards</h2>
                <span className="ml-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                  {highValueCards.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {highValueCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => {
                      if (bulkSelling) { toggleBulkCard(card.id); return }
                      setSelectedId(card.id === selectedId ? null : card.id)
                    }}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      bulkSelling && bulkSelected.has(card.id)
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                        : card.id === selectedId
                        ? "border-primary shadow-xl shadow-primary/20"
                        : "border-border/40 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    }`}
                  >
                    {/* Spotlight glow */}
                    <div className="absolute inset-0 spotlight-bg opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative flex gap-4 p-4">
                      {/* Card Image - Large */}
                      <div className="card-glossy relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-xl shadow-xl shadow-primary/20 md:h-48 md:w-36">
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-cover"
                          sizes="144px"
                        />
                      </div>

                      {/* Card Info */}
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          {bulkSelling && (
                            <div className={`mb-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              bulkSelected.has(card.id) ? "border-primary bg-primary" : "border-border"
                            }`}>
                              {bulkSelected.has(card.id) && (
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                          )}
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getRarityBg(card.rarity)} ${getRarityColor(card.rarity)}`}>
                            {card.rarity}
                          </span>
                          <h3 className="mt-2 text-base font-extrabold text-foreground md:text-lg">
                            {card.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            PSA {card.grade}
                          </p>
                        </div>
                        <div className="flex items-end justify-between">
                          <p className="text-2xl font-extrabold text-accent">${card.value}</p>
                          {!bulkSelling && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleQuickSell(card.id, card.value)
                              }}
                              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.97]"
                            >
                              <DollarSign className="h-3.5 w-3.5" />
                              Sell ${Math.round(card.value * 0.85)}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* LOW-VALUE / COMMONS - Compressed, disposable feel */}
          {lowValueCards.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-bold text-muted-foreground">Common Cards</h2>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {lowValueCards.length}
                  </span>
                </div>
                {/* Quick bulk sell commons CTA */}
                {!bulkSelling && (
                  <button
                    onClick={handleBulkSellLowValue}
                    className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary transition-all hover:bg-primary/20"
                  >
                    <DollarSign className="h-3 w-3" />
                    Sell All Commons (${lowValueSellTotal})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {lowValueCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => {
                      if (bulkSelling) { toggleBulkCard(card.id); return }
                      setSelectedId(card.id === selectedId ? null : card.id)
                    }}
                    className={`group relative overflow-hidden rounded-xl border transition-all duration-200 ${
                      bulkSelling && bulkSelected.has(card.id)
                        ? "border-primary bg-primary/5"
                        : card.id === selectedId
                        ? "border-primary shadow-lg shadow-primary/15"
                        : "border-border/30 opacity-75 hover:opacity-100 hover:border-border"
                    }`}
                  >
                    {/* Selection indicator */}
                    {bulkSelling && (
                      <div className={`absolute right-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border ${
                        bulkSelected.has(card.id) ? "border-primary bg-primary" : "border-foreground/40 bg-background/60"
                      }`}>
                        {bulkSelected.has(card.id) && (
                          <CheckCircle2 className="h-2.5 w-2.5 text-primary-foreground" />
                        )}
                      </div>
                    )}

                    <div className="relative aspect-[3/4]">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 30vw, (max-width: 768px) 22vw, 14vw"
                      />
                    </div>
                    <div className="bg-card p-1.5">
                      <p className="truncate text-[10px] font-semibold text-foreground">{card.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground">PSA {card.grade}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">${card.value}</span>
                      </div>
                    </div>

                    {/* Hover sell overlay */}
                    {!bulkSelling && (
                      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-card/95 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleQuickSell(card.id, card.value)
                          }}
                          className="flex w-full items-center justify-center gap-1 py-2.5 text-[10px] font-bold text-primary transition-colors hover:brightness-110"
                        >
                          <DollarSign className="h-3 w-3" />
                          ${Math.round(card.value * 0.85)}
                        </button>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Card Detail Sidebar */}
        {selectedCard && !bulkSelling && (
          <div className="w-full lg:w-80">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
              {/* Card Image */}
              <div className="spotlight-bg relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="card-glossy absolute inset-0" />
              </div>

              <div className="p-5">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getRarityBg(selectedCard.rarity)} ${getRarityColor(selectedCard.rarity)}`}>
                  {selectedCard.rarity}
                </span>
                <h3 className="mt-2 text-lg font-extrabold text-foreground">{selectedCard.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">PSA {selectedCard.grade}</p>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-secondary/40 p-3">
                  <span className="text-xs text-muted-foreground">Market Value</span>
                  <span className="text-xl font-extrabold text-foreground">${selectedCard.value}</span>
                </div>

                {/* Sell - PROMINENT */}
                <button
                  onClick={() => handleQuickSell(selectedCard.id, selectedCard.value)}
                  className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                  <DollarSign className="h-4 w-4" />
                  Sell for ${Math.round(selectedCard.value * 0.85)}
                </button>

                {/* Ship - ultra minimized */}
                {!showShipConfirm ? (
                  <button
                    onClick={() => setShowShipConfirm(true)}
                    className="mt-4 flex w-full items-center justify-center gap-1 py-1.5 text-[10px] text-muted-foreground/30 transition-colors hover:text-muted-foreground/50"
                  >
                    <Truck className="h-2.5 w-2.5" />
                    Request physical shipping
                  </button>
                ) : (
                  <div className="mt-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
                    <p className="mb-2 text-[10px] leading-relaxed text-muted-foreground">
                      Shipping takes 2-4 weeks with a $15 processing fee. Cards cannot
                      be returned or sold once shipped. We strongly recommend selling instead.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowShipConfirm(false)}
                        className="flex-1 rounded-lg border border-border/60 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                      >
                        Keep Digital
                      </button>
                      <button
                        onClick={() => {
                          removeFromInventory(selectedCard.id)
                          setSelectedId(null)
                          setShowShipConfirm(false)
                        }}
                        className="rounded-lg px-3 py-2 text-[10px] text-muted-foreground/40 transition-colors hover:text-muted-foreground/60"
                      >
                        Ship ($15)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA - Always encourage opening more */}
      <div className="mt-12 flex items-center justify-center">
        <button
          onClick={navigateToList}
          className="group flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:brightness-110"
        >
          <Sparkles className="h-4 w-4" />
          Open More Packs
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </main>
  )
}
