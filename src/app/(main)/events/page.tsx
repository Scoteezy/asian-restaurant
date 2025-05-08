import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#181818] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Акции</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#232323] border-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold mb-2">Скидка 20% на первый заказ на сайте Nami</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white mb-4">
                Получите скидку 20% на первый заказ через наш сайт.
              </CardDescription>
              <Link className="text-red-500 font-medium cursor-pointer"
                href="/"
              >В меню
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-[#232323] border-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold mb-2">Скидка 20% на самовывоз</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white mb-4">
                Оформляйте заказ через наш сайт и забирайте любимые блюда с собой со скидкой 20%!
              </CardDescription>
              <Link className="text-red-500 font-medium cursor-pointer"
                href="/"
              >В меню
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-[#232323] border-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold mb-2">Скидка 20% в день рождения</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white mb-4">
                Празднуйте день рождения в Nami и получите скидку 20% на всё меню!
              </CardDescription>
              <Link className="text-red-500 font-medium cursor-pointer"
                href="/"
              >В меню
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
