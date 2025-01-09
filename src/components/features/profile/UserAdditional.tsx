import { HeartIcon, PlusIcon } from "lucide-react";

import { type User } from "next-auth";

import { Button } from "@/components/ui/button";

const UserAdditional= ({prefetchedUser}: {prefetchedUser: User}) => {
  return <div className="flex flex-col gap-2 p-3 border-2 border-secondary rounded-lg w-full">
      <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold text-primary">Избранное</h2>
      <p className="text-sm text-gray-500 flex items-center gap-2">
      Здесь будут Ваши избранные блюда. Перейдите в меню и выберите их, нажав на иконку <HeartIcon height={18} size={18} width={18}/>
      </p>
    </div>
    <div className=" h-[2px] w-full bg-secondary my-2" ></div>
    <div className="flex flex-col gap-2">
    <h2 className="text-xl font-bold text-primary">Ваши заказы</h2>
    <p className="text-sm text-gray-500 flex items-center">Тут пока что ничего нет</p>
    </div>
    <div className=" h-[2px] w-full bg-secondary my-2" ></div>

    <div className="flex flex-col gap-2">
    <div className="flex-between ">
    <h2 className="text-xl font-bold text-primary">Адреса доставки</h2>
    <Button className="rounded-full  text-white bg-secondary hover:bg-secondary/80" variant="default" > <PlusIcon height={18} size={18} width={18}/> Добавить</Button>
    </div>
    <p className="text-sm text-gray-500 flex items-center">Тут пока что ничего нет.</p>
    </div>
  </div>;
};

export {UserAdditional};
