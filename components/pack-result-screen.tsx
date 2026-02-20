"use client"

import Image from "next/image"
import { useApp } from "@/lib/store"
import { isHighValue, getRarityColor } from "@/lib/pack-data"
import { DollarSign, BookOpen, Sparkles, ArrowRight, TrendingUp, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function PackResultScreen() {
  const { openedCards, addToInventory, addBalance, navigateToList, navigateToInventory } = useApp()
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [cardRevealed, setCardRevealed] = useState(false)
  const [actionTaken, setActionTaken] = useState(false)

  useEffect(() => {
    if (openedCards.length > 0) {
      const maxIdx = openedCards.reduce(
        (best, card, i) => (card.value > openedCards[best].value ? i : best),
        0
      )
      setFeaturedIndex(maxIdx)
    }
    const t1 = setTimeout(() => setRevealed(true), 400)
    const t2 = setTimeout(() => setCardRevealed(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [openedCards])

  if (openedCards.length === 0) return null

  const featured = openedCards[featuredIndex]
  const totalValue = openedCards.reduce((sum, c) => sum + c.value, 0)
  const sellValue = Math.round(totalValue * 0.85)
  const highValueCards = openedCards.filter(isHighValue)
  const lowValueCards = openedCards.filter(c => !isHighValue(c))

  const handleSellAll = () => {
    addBalance(sellValue)
    setActionTaken(true)
  }

  const handleCollectAll = () => {
    addToInventory(openedCards)
    setActionTaken(true)
  }

  if (actionTaken) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="animate-spotlight text-center">
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-glow-pulse" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-extrabold text-foreground">Done!</h2>
          <p className="mb-8 text-muted-foreground">
            Your cards have been processed successfully.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={navigateToList}
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
              <Zap className="h-5 w-5" />
              Open More Packs
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={navigateToInventory}
              className="rounded-xl px-6 py-3 text-sm text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              View Vault
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 md:py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className={`text-3xl font-extrabold tracking-tight text-foreground transition-all duration-700 md:text-4xl ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Your Pulls
        </h1>
        <p className={`mt-2 text-muted-foreground transition-all delay-200 duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}>
          {openedCards.length} card{openedCards.length !== 1 ? "s" : ""} revealed
        </p>
      </div>

      {/* Featured Card - Dramatic Spotlight */}
      <div
        className={`relative mx-auto mb-10 max-w-sm transition-all duration-1000 ${
          cardRevealed ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90"
        }`}
      >
        {/* Glow Background */}
        <div className="absolute -inset-8 rounded-3xl bg-primary/10 blur-3xl animate-glow-pulse" />

        <div className="spotlight-bg relative overflow-hidden rounded-3xl border border-primary/40 shadow-2xl shadow-primary/20">
          <div className="relative p-5 md:p-8">
            {/* Badge */}
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
                Best Pull
              </span>
              <Sparkles className="h-4 w-4 text-accent" />
            </div>

            {/* Card Image */}
            <div className={`card-glossy relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl shadow-2xl shadow-primary/30 ${
              cardRevealed ? "animate-card-reveal" : "opacity-0"
            }`}>
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="220px"
                priority
              />
            </div>

            {/* Card Info */}
            <div className="mt-5 text-center">
              <h3 className="text-xl font-extrabold text-foreground">{featured.name}</h3>
              <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                <span className={`font-bold ${getRarityColor(featured.rarity)}`}>
                  {featured.rarity}
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="text-muted-foreground">PSA {featured.grade}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="font-extrabold text-accent">${featured.value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Cards Grid */}
      {openedCards.length > 1 && (
        <div className={`mb-10 transition-all delay-500 duration-700 ${
          cardRevealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}>
          <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            All Pulls ({openedCards.length})
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {openedCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => setFeaturedIndex(i)}
                className={`card-glossy relative w-[72px] overflow-hidden rounded-xl border-2 transition-all duration-300 md:w-[88px] ${
                  i === featuredIndex
                    ? "border-primary shadow-lg shadow-primary/30 scale-105"
                    : isHighValue(card)
                    ? "border-accent/40 hover:border-accent/70"
                    : "border-border/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                    sizes="88px"
                  />
                </div>
                <div className="bg-card px-1.5 py-1 text-center">
                  <p className="truncate text-[9px] font-semibold text-foreground">{card.name}</p>
                  <p className={`text-[10px] font-bold ${getRarityColor(card.rarity)}`}>${card.value}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons - Selling HEAVILY favored */}
      <div className={`mx-auto max-w-md transition-all delay-700 duration-700 ${
        cardRevealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}>
        {/* Sell CTA */}
        <div className="relative mb-3 overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-2xl shadow-primary/15">
          <div className="absolute inset-0 spotlight-bg opacity-30" />
          <div className="relative p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Instant Cash Out</span>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                85% value
              </span>
            </div>
            <div className="my-4 text-center">
              <p className="text-4xl font-extrabold tabular-nums text-primary">${sellValue}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Added to your balance immediately
              </p>
            </div>
            {highValueCards.length > 0 && lowValueCards.length > 0 && (
              <div className="mb-4 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
                <span>{highValueCards.length} high-value</span>
                <span className="h-0.5 w-0.5 rounded-full bg-border" />
                <span>{lowValueCards.length} common</span>
              </div>
            )}
            <button
              onClick={handleSellAll}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-4 text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
              <DollarSign className="h-5 w-5" />
              Sell All for ${sellValue}
            </button>
          </div>
        </div>

        {/* Keep in collection - tiny, de-emphasized */}
        <button
          onClick={handleCollectAll}
          className="flex w-full items-center justify-center gap-1.5 py-3 text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
        >
          <BookOpen className="h-3 w-3" />
          or keep in collection
        </button>
      </div>
    </main>
  )
}
