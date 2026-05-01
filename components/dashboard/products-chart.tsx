"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"
import type { Pedido } from "@/lib/mock-data"

interface ProductsChartProps {
  pedidos: Pedido[]
}

const COLORS = [
  "oklch(0.65 0.18 250)",
  "oklch(0.60 0.16 250)",
  "oklch(0.55 0.14 250)",
  "oklch(0.50 0.12 250)",
  "oklch(0.45 0.10 250)"
]

export function ProductsChart({ pedidos }: ProductsChartProps) {
  const chartData = useMemo(() => {
    const productosCount = new Map<string, number>()

    pedidos.forEach((p) => {
      const current = productosCount.get(p.PRODUCTO) || 0
      productosCount.set(p.PRODUCTO, current + p.CANTIDAD)
    })

    return Array.from(productosCount.entries())
      .map(([producto, cantidad]) => ({
        producto: producto.length > 15 ? producto.substring(0, 12) + "..." : producto,
        productoFull: producto,
        cantidad
      }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5)
  }, [pedidos])

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Top 5 Productos
        </h3>
        <p className="text-sm text-muted-foreground">
          Productos más vendidos por cantidad
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.30 0.04 250 / 0.3)"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="oklch(0.65 0.02 250)"
              tick={{ fill: "oklch(0.65 0.02 250)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="producto"
              stroke="oklch(0.65 0.02 250)"
              tick={{ fill: "oklch(0.65 0.02 250)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.18 0.025 250)",
                border: "1px solid oklch(0.40 0.04 250 / 0.3)",
                borderRadius: "12px",
                color: "oklch(0.98 0.005 250)"
              }}
              formatter={(value: number, _name: string, props) => [
                `${value} unidades`,
                props.payload.productoFull
              ]}
            />
            <Bar dataKey="cantidad" radius={[0, 8, 8, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
