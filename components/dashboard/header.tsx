"use client"

import { Store, Sparkles } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/20 p-3">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground lg:text-3xl">
              Super Colmado IA
              <Sparkles className="h-5 w-5 text-primary lg:h-6 lg:w-6" />
            </h1>
            <p className="text-sm text-muted-foreground lg:text-base">
              Panel de Analítica en Tiempo Real
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">En Vivo</span>
          </div>
        </div>
      </div>
    </header>
  )
}
