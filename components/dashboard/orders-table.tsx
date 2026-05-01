"use client"

import { useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import type { Pedido } from "@/lib/mock-data"

interface OrdersTableProps {
  pedidos: Pedido[]
}

export function OrdersTable({ pedidos }: OrdersTableProps) {
  const ultimosPedidos = useMemo(() => {
    // Agrupar por PEDIDO_ID y mostrar el primero de cada grupo
    const pedidosUnicos = new Map<string, Pedido>()
    
    pedidos.forEach((p) => {
      if (!pedidosUnicos.has(p.PEDIDO_ID)) {
        pedidosUnicos.set(p.PEDIDO_ID, p)
      }
    })

    return Array.from(pedidosUnicos.values())
      .sort((a, b) => new Date(b.FECHA).getTime() - new Date(a.FECHA).getTime())
      .slice(0, 10)
  }, [pedidos])

  const getMetodoPagoColor = (metodo: string) => {
    switch (metodo) {
      case "Efectivo":
        return "bg-emerald-500/20 text-emerald-400"
      case "Tarjeta":
        return "bg-blue-500/20 text-blue-400"
      case "Transferencia":
        return "bg-purple-500/20 text-purple-400"
      case "PayPal":
        return "bg-amber-500/20 text-amber-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Últimos Pedidos
        </h3>
        <p className="text-sm text-muted-foreground">
          Historial de los últimos 10 pedidos
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Fecha</TableHead>
              <TableHead className="text-muted-foreground">Pedido ID</TableHead>
              <TableHead className="text-muted-foreground">Producto</TableHead>
              <TableHead className="text-muted-foreground text-center">Cant.</TableHead>
              <TableHead className="text-muted-foreground">Método</TableHead>
              <TableHead className="text-muted-foreground text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ultimosPedidos.map((pedido) => (
              <TableRow
                key={pedido.PEDIDO_ID}
                className="border-border/40 hover:bg-muted/20"
              >
                <TableCell className="text-foreground">
                  {new Date(pedido.FECHA).toLocaleDateString("es-DO", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </TableCell>
                <TableCell className="font-mono text-primary">
                  {pedido.PEDIDO_ID}
                </TableCell>
                <TableCell className="text-foreground max-w-[150px] truncate">
                  {pedido.PRODUCTO}
                </TableCell>
                <TableCell className="text-foreground text-center">
                  {pedido.CANTIDAD}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getMetodoPagoColor(
                      pedido.METODO_PAGO
                    )}`}
                  >
                    {pedido.METODO_PAGO}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  RD$ {pedido.TOTAL_PEDIDO.toLocaleString("es-DO")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
