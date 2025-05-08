import { HeartIcon, PlusIcon } from "lucide-react";

import { type User } from "next-auth";

import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import FavoriteList from "../favorite/FavoriteList";
import { LocationList } from "../location/LocationList";
import { LocationModal } from "../location/LocationModal";
import { OrdersList } from "../order/OrdersLIst";
const UserAdditional= ({prefetchedUser}: {prefetchedUser: User}) => {
  return (
    <div className="flex flex-col gap-2 p-3 border-2 border-secondary rounded-lg w-full">
      <Tabs
        className="w-full h-fit"
        defaultValue="favorites"
      >
        <TabsList className="w-full flex flex-wrap h-auto">
          <TabsTrigger className="flex-1 min-w-[120px]"
            value="favorites"
          >Избранное
          </TabsTrigger>
          <TabsTrigger className="flex-1 min-w-[120px]"
            value="orders"
          >Ваши заказы
          </TabsTrigger>
          <TabsTrigger className="flex-1 min-w-[120px]"
            value="addresses"
          >Адреса доставки
          </TabsTrigger>
        </TabsList>
        <TabsContent value="favorites">
          <FavoriteList/>

        </TabsContent>
        <TabsContent value="orders">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-primary">Ваши заказы</h2>
            <OrdersList/>
          </div>
        </TabsContent>
        <TabsContent value="addresses">
          <div className="flex flex-col gap-2">
            <div className="flex-between ">
              <h2 className="text-xl font-bold text-primary">Адреса доставки</h2>
              <LocationModal/>
            </div>
            <div className="flex flex-col gap-2">
              <LocationList/>
            </div>
          </div>
        </TabsContent>
        
      </Tabs>

 
    </div>
  )
};

export {UserAdditional};
