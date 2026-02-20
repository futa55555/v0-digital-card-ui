"use client"

import Image from "next/image"
import { useApp } from "@/lib/store"
import { PACKS, getRandomCards } from "@/lib/pack-data"
import { ArrowLeft, Flame, Minus, Plus, Zap, X, CreditCard } from "lucide-react"
import { useEffect } from "react"

export function PackDetailScreen() {
  const {
    selectedPackId,
    navigateToList,
    navigateToResult,
    setQuantity,
    getQuantity,
    showPaymentDialog,
    setShowPaymentDialog,
  } = useApp()

  const pack = PACKS.find(p => p.id === selectedPackId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!pack) return null

  const qty = getQuantity(pack.id)
  const total = pack.price * qty

  const handleOpen = () => {
    setShowPaymentDialog(true)
  }

  const handleConfirmPayment = () => {
    const cards = getRandomCards(qty)
    setShowPaymentDialog(false)
    navigateToResult(cards)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Back */}
      <button
        onClick={navigateToList}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Packs
      </button>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left: Pack Visual */}
        <div className="flex flex-col items-center lg:flex-1">
          <div className="relative mb-6 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="relative flex aspect-square items-center justify-center p-8 md:p-12">
              <div className="relative h-64 w-48 overflow-hidden rounded-xl shadow-2xl shadow-primary/30 transition-transform hover:scale-105 md:h-80 md:w-56">
                <Image
                  src={pack.image}
                  alt={pack.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 224px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mb-6 flex w-full max-w-md gap-4">
            <div className="flex-1 rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs font-medium text-muted-foreground">Price</p>
              <p className="mt-1 text-lg font-bold text-primary">${pack.price}</p>
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs font-medium text-muted-foreground">Max Return</p>
              <p className="mt-1 text-lg font-bold text-accent">{pack.maxReturn}</p>
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs font-medium text-muted-foreground">Heat Level</p>
              <div className="mt-1 flex items-center justify-center gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Flame
                    key={i}
                    className={`h-5 w-5 ${
                      i < pack.heatLevel
                        ? "text-destructive"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col lg:flex-1">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {pack.category}
          </div>
          <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            {pack.name}
          </h1>
          <p className="mb-8 leading-relaxed text-muted-foreground">{pack.description}</p>

          {/* Odds Table */}
          <div className="mb-8 rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-bold text-foreground">Rarity Distribution</h3>
            <div className="space-y-3">
              {pack.odds.map(odd => (
                <div key={odd.rarity} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        odd.rarity === "Secret Rare"
                          ? "bg-accent"
                          : odd.rarity === "Ultra Rare"
                          ? "bg-primary"
                          : odd.rarity === "Rare"
                          ? "bg-chart-5"
                          : "bg-muted-foreground/50"
                      }`}
                    />
                    <span className="text-sm text-foreground">{odd.rarity}</span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {odd.chance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Preview Grid */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-bold text-foreground">Best Pulls</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pack.cards.map(card => (
                <div
                  key={card.id}
                  className="relative min-w-[80px] overflow-hidden rounded-lg border border-border md:min-w-[100px]"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Widget (Sticky on mobile) */}
          <div className="sticky bottom-4 rounded-xl border border-primary/30 bg-card p-5 shadow-xl shadow-primary/10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">{pack.name}</span>
              <span className="text-sm text-muted-foreground">
                ${pack.price} / pull
              </span>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-secondary/50 p-1">
                <button
                  onClick={() => setQuantity(pack.id, qty - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center text-sm font-bold text-foreground">{qty}</span>
                <button
                  onClick={() => setQuantity(pack.id, qty + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {[1, 3, 5, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setQuantity(pack.id, n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all ${
                    qty === n
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={handleOpen}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Zap className="h-5 w-5" />
              OPEN &middot; ${total}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      {showPaymentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <button
              onClick={() => setShowPaymentDialog(false)}
              className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Confirm Purchase</h3>
                <p className="text-sm text-muted-foreground">Review your order</p>
              </div>
            </div>

            <div className="mb-6 space-y-3 rounded-xl border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pack</span>
                <span className="text-sm font-medium text-foreground">{pack.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <span className="text-sm font-medium text-foreground">{qty}x</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Zap className="h-5 w-5" />
              Pay & Open Packs
            </button>
            <button
              onClick={() => setShowPaymentDialog(false)}
              className="mt-3 w-full py-2 text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
