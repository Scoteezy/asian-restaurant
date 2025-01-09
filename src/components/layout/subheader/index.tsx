import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";
const SubHeader = () => {
  return (
    <div className=" hidden lg:block w-full bg-background h-[70px] sticky top-0">
      <div className="wrapper flex-between">
        <div className="flex-center text-2xl font-bold text-primary gap-5">
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm" >Вок</Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm">Супы</Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm">Салаты</Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm">Закуски</Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm">Роллы и суши</Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm">Десерты</Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-all duration-300 text-sm">Напитки</Link>

        </div>
        <div className="flex-center gap-4">
            <Input placeholder="Найти" className="w-[200px] rounded-full"/>
           <Button variant="secondary" className="rounded-full text-md" size="lg"><ShoppingBag size={18} height={18} width={18}/> Корзина | 0 ₽</Button>
        </div>
      </div>
    </div>
  );
};

export { SubHeader };
