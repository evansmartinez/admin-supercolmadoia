"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { Pedido } from "@/lib/mock-data"

interface PaymentChartProps {
  pedidos: Pedido[]
}

const COLORS = [
  "oklch(0.65 0.18 250)",
  "oklch(0.70 0.15 180)",
  "oklch(0.75 0.12 140)",
  "oklch(0.68 0.20 280)"
]

export function PaymentChart({ pedidos }: PaymentChartProps) {
  const chartData = useMemo(() => {
    const metodosPagoCount = new Map<string, number>()
    const pedidosProcesados = new Set<string>()

    pedidos.forEach((p) => {
      if (!pedidosProcesados.has(p.PEDIDO_ID)) {
        pedidosProcesados.add(p.PEDIDO_ID)
        const current = metodosPagoCount.get(p.METODO_PAGO) || 0
        metodosPagoCount.set(p.METODO_PAGO, current + 1)
      }
    })

    return Array.from(metodosPagoCount.entries()).map(([name, value]) => ({
      name,
      value
    }))
  }, [pedidos])

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Métodos de Pago
        </h3>
        <p className="text-sm text-muted-foreground">
          Distribución por método de pago
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.18 0.025 250)",
                border: "1px solid oklch(0.40 0.04 250 / 0.3)",
                borderRadius: "12px",
                color: "oklch(0.98 0.005 250)"
              }}
              formatter={(value: number, name: string) => [
                `${value} pedidos`,
                name
              ]}
            />
            <Legend
              wrapperStyle={{ color: "oklch(0.65 0.02 250)" }}
              formatter={(value) => (
                <span style={{ color: "oklch(0.80 0.02 250)" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
