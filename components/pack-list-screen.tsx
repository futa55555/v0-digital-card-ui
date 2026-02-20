"use client"

import { PACKS } from "@/lib/pack-data"
import { PackCard } from "./pack-card"
import { ChevronRight } from "lucide-react"
import { useApp } from "@/lib/store"

export function PackListScreen() {
  const { navigateToInventory } = useApp()
  const firstRow = PACKS.slice(0, 3)
  const secondRow = PACKS.slice(3, 6)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Hero Section */}
      <section className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-10">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              LIVE NOW
            </div>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Rip Digital Packs,{" "}
              <span className="text-primary">Pull Real Cards</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Open a digital pack to instantly reveal a real, graded card.
              Choose to hold, trade, or sell it back at 85% value.
            </p>
          </div>
          <div className="hidden h-48 w-48 items-center justify-center rounded-2xl border border-border bg-secondary/50 md:flex lg:h-56 lg:w-56">
            <div className="relative h-36 w-28 rotate-6 overflow-hidden rounded-xl shadow-2xl shadow-primary/30 lg:h-44 lg:w-32">
              <img
                src={PACKS[0].image}
                alt="Featured pack"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pack Rows */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            Digital Packs, Physical Cards
          </h2>
          <button
            onClick={navigateToInventory}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            My Collection
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Row 1 */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none md:gap-5">
          {firstRow.map(pack => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none md:gap-5">
          {secondRow.map(pack => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>
    </main>
  )
}
