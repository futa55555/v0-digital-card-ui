"use client"

import Image from "next/image"
import { useApp } from "@/lib/store"
import { PACKS, getRandomCards } from "@/lib/pack-data"
import { ArrowLeft, Flame, Minus, Plus, Zap, X, CreditCard, Shield, TrendingUp } from "lucide-react"
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
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Packs
      </button>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
        {/* Left: Pack Visual */}
        <div className="flex flex-col items-center lg:flex-1">
          <div className="spotlight-bg relative mb-6 w-full max-w-md overflow-hidden rounded-3xl border border-border/60">
            <div className="relative flex aspect-square items-center justify-center p-8 md:p-12">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-primary/15 blur-2xl animate-glow-pulse" />
                <div className="animate-float relative h-64 w-48 overflow-hidden rounded-2xl shadow-2xl shadow-primary/40 transition-transform hover:scale-105 md:h-80 md:w-56">
                  <Image
                    src={pack.image}
                    alt={pack.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 224px"
                    priority
                  />
                  <div className="card-glossy absolute inset-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mb-6 flex w-full max-w-md gap-3">
            <div className="flex-1 rounded-2xl border border-border/60 bg-card p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Price</p>
              <p className="mt-1 text-xl font-extrabold text-primary">${pack.price}</p>
            </div>
            <div className="flex-1 rounded-2xl border border-border/60 bg-card p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Max Return</p>
              <p className="mt-1 text-xl font-extrabold text-accent">{pack.maxReturn}</p>
            </div>
            <div className="flex-1 rounded-2xl border border-border/60 bg-card p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Heat</p>
              <div className="mt-1 flex items-center justify-center gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Flame
                    key={i}
                    className={`h-5 w-5 ${
                      i < pack.heatLevel
                        ? "text-destructive drop-shadow-[0_0_4px_oklch(0.65_0.24_27)]"
                        : "text-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col lg:flex-1">
          <div className="mb-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {pack.category}
          </div>
          <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {pack.name}
          </h1>
          <p className="mb-8 leading-relaxed text-muted-foreground">{pack.description}</p>

          {/* Odds Table */}
          <div className="mb-8 rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Rarity Distribution
            </h3>
            <div className="space-y-3">
              {pack.odds.map(odd => (
                <div key={odd.rarity} className="flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full shadow-sm ${
                        odd.rarity === "Secret Rare"
                          ? "bg-accent shadow-accent/50"
                          : odd.rarity === "Ultra Rare"
                          ? "bg-primary shadow-primary/50"
                          : odd.rarity === "Rare"
                          ? "bg-chart-5 shadow-chart-5/50"
                          : "bg-muted-foreground/40"
                      }`}
                    />
                    <span className="text-sm text-foreground">{odd.rarity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${
                          odd.rarity === "Secret Rare"
                            ? "bg-accent"
                            : odd.rarity === "Ultra Rare"
                            ? "bg-primary"
                            : odd.rarity === "Rare"
                            ? "bg-chart-5"
                            : "bg-muted-foreground/50"
                        }`}
                        style={{ width: odd.chance }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-bold tabular-nums text-muted-foreground">
                      {odd.chance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Pulls Preview */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <Shield className="h-4 w-4 text-accent" />
              Best Pulls
            </h3>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {pack.cards.map(card => (
                <div
                  key={card.id}
                  className="card-glossy relative min-w-[80px] overflow-hidden rounded-xl border border-border/60 transition-all hover:border-primary/40 md:min-w-[100px]"
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

          {/* Purchase Widget */}
          <div className="sticky bottom-4 rounded-2xl border border-primary/30 bg-card p-5 shadow-2xl shadow-primary/10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-lg font-extrabold text-foreground">{pack.name}</span>
              <span className="text-sm font-medium text-muted-foreground">
                ${pack.price} / pull
              </span>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-secondary/60 p-1">
                <button
                  onClick={() => setQuantity(pack.id, qty - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-background hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center text-sm font-bold tabular-nums text-foreground">{qty}</span>
                <button
                  onClick={() => setQuantity(pack.id, qty + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-background hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {[1, 3, 5, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setQuantity(pack.id, n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    qty === n
                      ? "border border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={handleOpen}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
              <Zap className="h-5 w-5" />
              {'OPEN \u00B7 $'}{total}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      {showPaymentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-lg">
          <div
            className="animate-spotlight relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-2xl"
          >
            <div className="absolute inset-0 spotlight-bg opacity-50" />
            <div className="relative">
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">Confirm Purchase</h3>
                  <p className="text-sm text-muted-foreground">Review your order</p>
                </div>
              </div>

              <div className="mb-6 space-y-3 rounded-2xl border border-border/60 bg-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pack</span>
                  <span className="text-sm font-semibold text-foreground">{pack.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="text-sm font-semibold text-foreground">{qty}x</span>
                </div>
                <div className="border-t border-border/60 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-foreground">Total</span>
                    <span className="text-xl font-extrabold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmPayment}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                <Zap className="h-5 w-5" />
                {'Pay & Open Packs'}
              </button>
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="mt-3 w-full py-2 text-center text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
