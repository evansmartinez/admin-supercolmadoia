"use client"

import { mockPedidos } from "@/lib/mock-data"
import { DashboardHeader } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { PaymentChart } from "@/components/dashboard/payment-chart"
import { ProductsChart } from "@/components/dashboard/products-chart"
import { OrdersTable } from "@/components/dashboard/orders-table"

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        {/* KPI Cards */}
        <section className="mb-6">
          <KPICards pedidos={mockPedidos} />
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Revenue Chart - Large */}
          <div className="lg:col-span-8">
            <RevenueChart pedidos={mockPedidos} />
          </div>

          {/* Payment Pie Chart */}
          <div className="lg:col-span-4">
            <PaymentChart pedidos={mockPedidos} />
          </div>

          {/* Products Bar Chart */}
          <div className="lg:col-span-5">
            <ProductsChart pedidos={mockPedidos} />
          </div>

          {/* Orders Table - Wide */}
          <div className="lg:col-span-7">
            <OrdersTable pedidos={mockPedidos} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Super Colmado IA - Analítica &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  )
}
