"use client"

import { DollarSign, ShoppingCart, CreditCard } from "lucide-react"
import type { Pedido } from "@/lib/mock-data"

interface KPICardsProps {
  pedidos: Pedido[]
}

export function KPICards({ pedidos }: KPICardsProps) {
  // Calcular ingresos totales (suma de TOTAL_PEDIDO únicos por PEDIDO_ID)
  const pedidosUnicos = new Map<string, number>()
  pedidos.forEach((p) => {
    if (!pedidosUnicos.has(p.PEDIDO_ID)) {
      pedidosUnicos.set(p.PEDIDO_ID, p.TOTAL_PEDIDO)
    }
  })
  const ingresosTotales = Array.from(pedidosUnicos.values()).reduce((a, b) => a + b, 0)

  // Total de pedidos únicos
  const totalPedidos = pedidosUnicos.size

  // Método de pago favorito
  const metodosPagoCount = new Map<string, number>()
  pedidos.forEach((p) => {
    if (!metodosPagoCount.has(`${p.PEDIDO_ID}-${p.METODO_PAGO}`)) {
      metodosPagoCount.set(`${p.PEDIDO_ID}-${p.METODO_PAGO}`, 1)
      const current = metodosPagoCount.get(p.METODO_PAGO) || 0
      metodosPagoCount.set(p.METODO_PAGO, current + 1)
    }
  })
  
  const metodoPagoFavorito = Array.from(metodosPagoCount.entries())
    .filter(([key]) => !key.includes("PED-"))
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  const kpis = [
    {
      title: "Ingresos Totales",
      value: `RD$ ${ingresosTotales.toLocaleString("es-DO")}`,
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Total de Pedidos",
      value: totalPedidos.toLocaleString("es-DO"),
      icon: ShoppingCart,
      trend: "+8.2%",
      trendUp: true
    },
    {
      title: "Método de Pago Favorito",
      value: metodoPagoFavorito,
      icon: CreditCard,
      trend: "62%",
      trendUp: true
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="glass-card glass-card-hover rounded-2xl p-6"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <p className="text-2xl font-bold text-foreground lg:text-3xl">
                {kpi.value}
              </p>
            </div>
            <div className="rounded-xl bg-primary/20 p-3">
              <kpi.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                kpi.trendUp ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {kpi.trend}
            </span>
            <span className="text-sm text-muted-foreground">vs mes anterior</span>
          </div>
        </div>
      ))}
    </div>
  )
}
