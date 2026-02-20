"use client"

import { AppProvider, useApp } from "@/lib/store"
import { Header } from "@/components/header"
import { PackListScreen } from "@/components/pack-list-screen"
import { PackDetailScreen } from "@/components/pack-detail-screen"
import { PackResultScreen } from "@/components/pack-result-screen"
import { InventoryScreen } from "@/components/inventory-screen"

function ScreenRouter() {
  const { screen } = useApp()

  switch (screen) {
    case "list":
      return <PackListScreen />
    case "detail":
      return <PackDetailScreen />
    case "result":
      return <PackResultScreen />
    case "inventory":
      return <InventoryScreen />
    default:
      return <PackListScreen />
  }
}

export default function Page() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <ScreenRouter />
      </div>
    </AppProvider>
  )
}
