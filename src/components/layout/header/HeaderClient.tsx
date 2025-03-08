'use client'
import { LogOutIcon, Menu} from "lucide-react";
import { signOut } from "next-auth/react";

import { type User } from "next-auth";
import Link from "next/link";

import { AuthModal } from "@/components/features/auth";
import { LocationModal } from "@/components/features/location";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
const HeaderClient = ({prefetchedUser}:{prefetchedUser?: User}) => {
  return (
    <div className="w-full bg-background h-[70px]">
      <div className="wrapper flex-between">
        <div className="flex-center text-2xl font-bold text-primary gap-5">
          {prefetchedUser?.role !== 'ADMIN' ? 
            <Link className="flex flex-col "
              href="/"
            >
              <span className="text-primary">A-Food</span>
              <span className="text-muted-foreground text-xs">Азия здесь</span>
            </Link>: <></>}
          {prefetchedUser ? prefetchedUser.role === 'ADMIN' ? <Link href="/admin">Админ панель</Link> : <LocationModal /> : <></>}
        </div>
        <div className="flex items-center gap-4">
          <a className="text-md text-primary font-medium"
            href="tel:+79198768851"
          >+7 (919) 876-88-51
          </a>
          <Sheet>
            <SheetTrigger><Menu height={18}
              size={18}
              width={18}
            />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-2">
                {prefetchedUser ? 
                  <>
                    <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                      href="/profile"
                    >Профиль
                    </Link> 
                    <Link className="block text-md text-primary hover:text-primary/80 transition-all duration-300"
                      href="/basket"
                    >Корзина
                    </Link> 
                  </>
                  : <></>}
              
                <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                  href="/"
                >Главная
                </Link>
                <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                  href="/"
                >Бонусная программа
                </Link>
                <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                  href="/"
                >Вакансии
                </Link>
                <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                  href="/"
                >Контакты
                </Link>  
                <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                  href="/"
                >Акции и мероприятия
                </Link>
                <Link className="text-md text-primary hover:text-primary/80 transition-all duration-300"
                  href="/"
                >Правовая информация
                </Link>
                <div className="mt-4 w-full">
                  {prefetchedUser ? 
                    <Button className="rounded-full w-full h-10"
                      onClick={()=>{
                        void signOut()
                      }}
                      variant='secondary'
                    >
                      <LogOutIcon height={18}
                        size={18}
                        width={18}
                      /> Выйти
                    </Button> : <AuthModal />}
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
