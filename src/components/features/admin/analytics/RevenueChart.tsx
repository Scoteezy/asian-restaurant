'use client'

import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RevenueChartProps {
  data: RevenueData[]
}

interface RevenueData {
  date: Date
  revenue: number
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: format(item.date, 'dd MMM', { locale: ru }),
  }))

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Выручка по дням</CardTitle>
        <CardDescription>
          График показывает ежедневную выручку за последние 30 дней
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer height={350}
          width="100%"
        >
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorRevenue"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="5%"
                  stopColor="#8884d8"
                  stopOpacity={0.8}
                />
                <stop offset="95%"
                  stopColor="#8884d8"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₽${value}`}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value: number) => [`₽${value}`, 'Выручка']}
              labelFormatter={(label) => `Дата: ${label}`}
            />
            <Area
              dataKey="revenue"
              fill="url(#colorRevenue)"
              fillOpacity={1}
              stroke="#8884d8"
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
