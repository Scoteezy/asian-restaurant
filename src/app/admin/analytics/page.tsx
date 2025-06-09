import { getAnalyticsAction } from "@/server/actions/analytics.actions"

import { MetricsOverview } from "@/components/features/admin/analytics/MetricsOverview"
import { PopularProducts } from "@/components/features/admin/analytics/PopularProducts"
import { RevenueChart } from "@/components/features/admin/analytics/RevenueChart"

export default async function AnalyticsPage() {
  const response = await getAnalyticsAction()
  
  if (!response.success) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Аналитика</h2>
        </div>
        <div className="text-red-500">
          Ошибка при загрузке данных: {response.error}
        </div>
      </div>
    )
  }

  const analytics = response.data

  console.log(analytics)
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Аналитика</h2>
      </div>
 
      <MetricsOverview
        activeOrders={analytics?.activeOrders ?? 0}
        totalOrders={analytics?.totalOrders ?? 1}
        totalRevenue={analytics?.totalRevenue ?? 1}
        totalUsers={analytics?.totalUsers ?? 1}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart data={analytics?.revenueData ?? []} />
        <PopularProducts products={analytics?.popularProducts ?? []} />
      </div>

    </div>
  )
}
