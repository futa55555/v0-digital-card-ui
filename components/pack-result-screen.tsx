"use client"

import Image from "next/image"
import { useApp } from "@/lib/store"
import { DollarSign, BookOpen, Sparkles, ArrowRight, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function PackResultScreen() {
  const { openedCards, addToInventory, addBalance, navigateToList, navigateToInventory } = useApp()
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [actionTaken, setActionTaken] = useState(false)

  useEffect(() => {
    // Find the highest value card as featured
    if (openedCards.length > 0) {
      const maxIdx = openedCards.reduce(
        (best, card, i) => (card.value > openedCards[best].value ? i : best),
        0
      )
      setFeaturedIndex(maxIdx)
    }
    const timer = setTimeout(() => setRevealed(true), 600)
    return () => clearTimeout(timer)
  }, [openedCards])

  if (openedCards.length === 0) return null

  const featured = openedCards[featuredIndex]
  const totalValue = openedCards.reduce((sum, c) => sum + c.value, 0)
  const sellValue = Math.round(totalValue * 0.85)

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
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-extrabold text-foreground">Done!</h2>
          <p className="mb-8 text-muted-foreground">
            Your cards have been processed successfully.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={navigateToList}
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-bold text-primary-foreground transition-all hover:brightness-110"
            >
              Open More Packs
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={navigateToInventory}
              className="rounded-xl px-6 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View Inventory
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
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Your Pulls
        </h1>
      </div>

      {/* Featured Card */}
      <div
        className={`relative mx-auto mb-8 max-w-sm overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-2xl shadow-primary/20 transition-all duration-1000 ${
          revealed ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="relative p-4 md:p-6">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Best Pull
            </span>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-xl">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover"
              sizes="240px"
              priority
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold text-foreground">{featured.name}</h3>
            <div className="mt-1 flex items-center justify-center gap-3 text-sm">
              <span className="font-semibold text-primary">{featured.rarity}</span>
              <span className="text-muted-foreground">PSA {featured.grade}</span>
              <span className="font-bold text-accent">${featured.value}</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Cards Grid */}
      {openedCards.length > 1 && (
        <div
          className={`mb-8 transition-all delay-300 duration-700 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h3 className="mb-4 text-center text-sm font-bold text-muted-foreground">
            All Pulls ({openedCards.length} cards)
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {openedCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => setFeaturedIndex(i)}
                className={`relative w-20 overflow-hidden rounded-lg border transition-all md:w-24 ${
                  i === featuredIndex
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
                    sizes="96px"
                  />
                </div>
                <div className="bg-card px-1 py-1 text-center">
                  <p className="truncate text-[10px] font-medium text-foreground">{card.name}</p>
                  <p className="text-[10px] font-bold text-primary">${card.value}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons - Selling is HEAVILY favored */}
      <div
        className={`mx-auto max-w-md transition-all delay-500 duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Sell CTA - Large, prominent, rewarding */}
        <div className="mb-3 rounded-2xl border border-primary/40 bg-card p-5 shadow-lg shadow-primary/10">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-foreground">Instant Cash Out</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">85% value</span>
          </div>
          <div className="mb-4 text-center">
            <p className="text-3xl font-extrabold text-primary">${sellValue}</p>
            <p className="text-xs text-muted-foreground">
              Added to your balance immediately
            </p>
          </div>
          <button
            onClick={handleSellAll}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <DollarSign className="h-5 w-5" />
            Sell All for ${sellValue}
          </button>
        </div>

        {/* Collect - Small, de-emphasized */}
        <button
          onClick={handleCollectAll}
          className="flex w-full items-center justify-center gap-2 py-3 text-sm text-muted-foreground/70 transition-colors hover:text-muted-foreground"
        >
          <BookOpen className="h-3.5 w-3.5" />
          or keep in collection
        </button>
      </div>
    </main>
  )
}
