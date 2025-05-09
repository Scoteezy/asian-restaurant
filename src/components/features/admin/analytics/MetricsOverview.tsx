'use client'

import { Activity, DollarSign, Package, Users } from "lucide-react"

import { MetricCard } from "./MetricCard"

interface MetricsOverviewProps {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  activeOrders: number
}

export function MetricsOverview({ totalRevenue, totalOrders, totalUsers, activeOrders }: MetricsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        icon={DollarSign}
        title="Общая выручка"
        value={`₽${totalRevenue.toLocaleString()}`}
      />
      <MetricCard
        icon={Package}
        title="Заказы"
        value={totalOrders}
      />
      <MetricCard
        icon={Users}
        title="Пользователи"
        value={totalUsers}
      />
      <MetricCard
        icon={Activity}
        title="Активные заказы"
        value={activeOrders}
      />
    </div>
  )
}
