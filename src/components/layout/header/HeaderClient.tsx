'use client'
import { ChevronDown, LogOutIcon, MapPin, Menu, Phone} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { User } from "next-auth";
import { AuthModal } from "@/components/features/auth";
import { signOut } from "next-auth/react";

const HeaderClient = ({prefetchedUser}:{prefetchedUser?: User}) => {
  return (
    <div className="w-full bg-background h-[70px]">
      <div className="wrapper flex-between">
        <div className="flex-center text-2xl font-bold text-primary gap-5">
          <Link href="/" className="flex flex-col ">
          <span className="text-primary">A-Food</span>
          <span className="text-muted-foreground text-xs">Азия здесь</span>
          </Link>
          <button className="flex gap-1 items-center">
            <MapPin className="w-6 h-6" color="#fff" height={30} width={30}/>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className="text-sm">Адрес доставки или самовывоз</p>
                <ChevronDown
                  className="w-4 h-4" 
                  color="#fff" 
                  height={20}
                  width={20}
                />
              </div>
              <p className="text-xs self-start text-muted-foreground">Выберите где получить заказ</p>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+79198768851" className="text-md text-primary font-medium">+7 (919) 876-88-51</a>
            <Sheet>
            <SheetTrigger><Menu size={18} height={18} width={18}/></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-2">
                {prefetchedUser ? <Link href="/profile" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Профиль</Link> : <></>}
              
                <Link href="/" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Главная</Link>
                <Link href="/" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Бонусная программа</Link>
                <Link href="/" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Вакансии</Link>
                <Link href="/" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Контакты</Link>  
                <Link href="/" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Акции и мероприятия</Link>
                <Link href="/" className="text-md text-primary hover:text-primary/80 transition-all duration-300">Правовая информация</Link>
                <div className="mt-4 w-full">
                {prefetchedUser ? <Button variant='secondary' className="rounded-full w-full h-10" onClick={()=>{signOut()}}><LogOutIcon size={18} height={18} width={18}/> Выйти</Button> : <AuthModal />}
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export { HeaderClient };
