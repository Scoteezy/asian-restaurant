'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PopularProduct {
  id: string
  name: string
  orders: number
  revenue: number
}

interface PopularProductsProps {
  products: PopularProduct[]
}

export function PopularProducts({ products }: PopularProductsProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Популярные блюда</CardTitle>
        <CardDescription>
          Топ-5 самых популярных блюд
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div className="flex items-center justify-between"
              key={product.id}
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.orders} заказов
                </p>
              </div>
              <div className="font-medium">
                {product.revenue}₽
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
