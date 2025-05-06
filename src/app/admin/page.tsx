import { BarChart3, MapPin, ShoppingBag, Users, Utensils } from "lucide-react"

import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Добро пожаловать в панель управления</h2>
        <p className="text-muted-foreground">
          Здесь вы можете управлять всеми аспектами вашего ресторана
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/users">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Управление пользователями, ролями и правами доступа
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/menu">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Меню</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Управление меню, категориями и позициями блюд
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/restaurants">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Рестораны</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Адреса ресторанов для самовывоза
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/orders">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Заказы</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Управление заказами и их статусами
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
   
        <Link href="/admin/analytics">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Аналитика</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Статистика и аналитика продаж
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Справка</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Для получения помощи по использованию админ-панели обратитесь к документации или в службу поддержки.
          </p>
          <p className="text-sm text-muted-foreground">
            Email поддержки: support@Nami.com
          </p>
          <p className="text-sm text-muted-foreground">
            Телефон: +7 (919) 876-88-51
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPage
