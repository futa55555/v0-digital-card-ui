"use client"

import Image from "next/image"
import { PACKS } from "@/lib/pack-data"
import { PackCard } from "./pack-card"
import { ChevronRight, Zap } from "lucide-react"
import { useApp } from "@/lib/store"

export function PackListScreen() {
  const { navigateToInventory, navigateToDetail } = useApp()
  const firstRow = PACKS.slice(0, 3)
  const secondRow = PACKS.slice(3, 6)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Hero Section */}
      <section className="spotlight-bg relative mb-10 overflow-hidden rounded-3xl border border-border/60">
        <div className="absolute inset-0 bg-card/40" />
        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-10 lg:p-14">
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              LIVE NOW
            </div>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Rip Digital Packs,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pull Real Cards
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Open a digital pack to instantly reveal a real, graded card.
              Choose to hold, trade, or sell it back at 85% value.
            </p>
            <button
              onClick={() => navigateToDetail(PACKS[0].id)}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.97]"
            >
              <Zap className="h-4 w-4" />
              Start Ripping
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="hidden items-center justify-center md:flex lg:pr-8">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl animate-glow-pulse" />
              <div className="animate-float relative h-52 w-40 overflow-hidden rounded-2xl shadow-2xl shadow-primary/40 transition-transform hover:scale-105 lg:h-64 lg:w-48">
                <Image
                  src={PACKS[0].image}
                  alt="Featured pack"
                  fill
                  className="object-cover"
                  sizes="192px"
                  priority
                />
                <div className="card-glossy absolute inset-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pack Rows */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
            Digital Packs, Physical Cards
          </h2>
          <button
            onClick={navigateToInventory}
            className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:brightness-110"
          >
            My Vault
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none md:gap-5">
          {firstRow.map(pack => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none md:gap-5">
          {secondRow.map(pack => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>
    </main>
  )
}
