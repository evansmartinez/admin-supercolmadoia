"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import type { Pedido } from "@/lib/mock-data"

interface RevenueChartProps {
  pedidos: Pedido[]
}

export function RevenueChart({ pedidos }: RevenueChartProps) {
  const chartData = useMemo(() => {
    // Agrupar ingresos por fecha
    const ingresosPorFecha = new Map<string, number>()
    const pedidosProcesados = new Set<string>()

    pedidos.forEach((p) => {
      if (!pedidosProcesados.has(p.PEDIDO_ID)) {
        pedidosProcesados.add(p.PEDIDO_ID)
        const currentIngreso = ingresosPorFecha.get(p.FECHA) || 0
        ingresosPorFecha.set(p.FECHA, currentIngreso + p.TOTAL_PEDIDO)
      }
    })

    return Array.from(ingresosPorFecha.entries())
      .map(([fecha, ingresos]) => ({
        fecha: new Date(fecha).toLocaleDateString("es-DO", {
          day: "2-digit",
          month: "short"
        }),
        ingresos
      }))
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  }, [pedidos])

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Evolución de Ingresos
        </h3>
        <p className="text-sm text-muted-foreground">
          Ingresos diarios del último mes
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.04 250 / 0.3)" />
            <XAxis
              dataKey="fecha"
              stroke="oklch(0.65 0.02 250)"
              tick={{ fill: "oklch(0.65 0.02 250)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="oklch(0.65 0.02 250)"
              tick={{ fill: "oklch(0.65 0.02 250)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `RD$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.18 0.025 250)",
                border: "1px solid oklch(0.40 0.04 250 / 0.3)",
                borderRadius: "12px",
                color: "oklch(0.98 0.005 250)"
              }}
              formatter={(value: number) => [
                `RD$ ${value.toLocaleString("es-DO")}`,
                "Ingresos"
              ]}
            />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="oklch(0.65 0.18 250)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIngresos)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
