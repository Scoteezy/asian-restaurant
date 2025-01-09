import { ShoppingBag } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const SubHeader = () => {
  return (
    <div className=" hidden lg:block w-full bg-background h-[70px] sticky top-0">
      <div className="wrapper flex-between">
        <div className="flex-center text-2xl font-bold text-primary gap-5">
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Вок
          </Link>
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Супы
          </Link>
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Салаты
          </Link>
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Закуски
          </Link>
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Роллы и суши
          </Link>
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Десерты
          </Link>
          <Link className="text-primary hover:text-primary/80 transition-all duration-300 text-sm"
            href="/"
          >Напитки
          </Link>

        </div>
        <div className="flex-center gap-4">
          <Input className="w-[200px] rounded-full"
            placeholder="Найти"
          />
          <Button className="rounded-full text-md"
            size="lg"
            variant="secondary"
          >
            <ShoppingBag height={18}
              size={18}
              width={18}
            /> Корзина | 0 ₽
          </Button>
        </div>
      </div>
    </div>
  );
};

export { SubHeader };
