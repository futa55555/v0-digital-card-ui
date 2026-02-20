"use client"

import Image from "next/image"
import { Minus, Plus, Zap } from "lucide-react"
import { useApp } from "@/lib/store"
import type { Pack } from "@/lib/pack-data"

export function PackCard({ pack }: { pack: Pack }) {
  const { navigateToDetail, openFromList, setQuantity, getQuantity } = useApp()
  const qty = getQuantity(pack.id)

  return (
    <div className="card-glossy group flex min-w-[230px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-8px] hover:shadow-primary/25 md:min-w-[270px]">
      {/* Pack Image */}
      <button
        onClick={() => navigateToDetail(pack.id)}
        className="relative aspect-[3/4] w-full overflow-hidden"
      >
        <Image
          src={pack.image}
          alt={pack.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 230px, 270px"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {/* Price badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-sm font-bold text-foreground drop-shadow-lg">{pack.name}</span>
          <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-extrabold text-primary-foreground shadow-lg shadow-primary/30 backdrop-blur-sm">
            ${pack.price}
          </span>
        </div>
      </button>

      {/* Controls */}
      <div className="flex flex-col gap-2.5 p-3.5">
        {/* Quantity */}
        <div className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-secondary/60 p-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setQuantity(pack.id, qty - 1)
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-background hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="flex-1 text-center text-sm font-bold tabular-nums text-foreground">
            {qty}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setQuantity(pack.id, qty + 1)
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-background hover:text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setQuantity(pack.id, 10)
            }}
            className="rounded-lg px-2.5 py-1 text-[10px] font-bold text-muted-foreground transition-all hover:bg-background hover:text-foreground"
          >
            MAX
          </button>
        </div>

        {/* Open Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            openFromList(pack.id)
          }}
          className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />
          <Zap className="h-4 w-4" />
          Open
        </button>
      </div>
    </div>
  )
}
