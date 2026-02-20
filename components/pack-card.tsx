"use client"

import Image from "next/image"
import { Minus, Plus, Zap } from "lucide-react"
import { useApp } from "@/lib/store"
import type { Pack } from "@/lib/pack-data"

export function PackCard({ pack }: { pack: Pack }) {
  const { navigateToDetail, openFromList, setQuantity, getQuantity } = useApp()
  const qty = getQuantity(pack.id)

  return (
    <div className="group flex min-w-[220px] flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/20 md:min-w-[260px]">
      <button
        onClick={() => navigateToDetail(pack.id)}
        className="relative aspect-[3/4] w-full overflow-hidden"
      >
        <Image
          src={pack.image}
          alt={pack.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 220px, 260px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </button>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{pack.name}</span>
          <span className="text-sm font-bold text-primary">${pack.price}</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 p-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setQuantity(pack.id, qty - 1)
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="flex-1 text-center text-sm font-medium text-foreground">
            {qty}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setQuantity(pack.id, qty + 1)
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setQuantity(pack.id, 10)
            }}
            className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            MAX
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            openFromList(pack.id)
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <Zap className="h-4 w-4" />
          Open
        </button>
      </div>
    </div>
  )
}
