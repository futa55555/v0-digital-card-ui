"use client"

import { useApp } from "@/lib/store"
import { Package, LayoutGrid, Wallet } from "lucide-react"

export function Header() {
  const { navigateToList, navigateToInventory, balance, screen } = useApp()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <button
          onClick={navigateToList}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Package className="h-4 w-4 text-primary-foreground" />
          </div>
          <span>RipVault</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <button
            onClick={navigateToList}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              screen === "list"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            Packs
          </button>
          <button
            onClick={navigateToInventory}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              screen === "inventory"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            Inventory
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              ${balance.toFixed(2)}
            </span>
          </div>
          <button
            onClick={navigateToInventory}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
