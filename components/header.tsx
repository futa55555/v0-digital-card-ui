"use client"

import { useApp } from "@/lib/store"
import { Package, LayoutGrid, Wallet, Zap } from "lucide-react"

export function Header() {
  const { navigateToList, navigateToInventory, balance, screen } = useApp()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <button
          onClick={navigateToList}
          className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-foreground"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <Package className="h-4.5 w-4.5 text-primary-foreground" />
            <div className="absolute -inset-0.5 rounded-xl bg-primary/30 blur-sm" />
          </div>
          <span className="font-mono">RipVault</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <button
            onClick={navigateToList}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              screen === "list"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            Packs
          </button>
          <button
            onClick={navigateToInventory}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              screen === "inventory"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Vault
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 shadow-inner">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold tabular-nums text-foreground">
              ${balance.toFixed(2)}
            </span>
          </div>
          <button
            onClick={navigateToInventory}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="View inventory"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
