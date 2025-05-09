'use client'
import { Loader2, Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import { toast } from "@/hooks/use-toast"
import { addToBasket, deleteFromBasket, getBasket } from "@/server/actions/basket.actions"
import { createOrderAction } from "@/server/actions/order.actions"
import { changeBonusesAction, getUserAction } from "@/server/actions/user.actions"
import { type BasketWithItems } from "@/types"
import { OrderStatus, type User } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LocationList } from "../location/LocationList"
import { OrderLocationList } from "../location/OrderLocationList"
import { SelfPickupForm } from "../location/SelfPickUpForm"
import { OrderForm } from "./OrderForm"

const OrderModal = ({totalPrice}: {totalPrice?: number}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [basket, setBasket] = useState<BasketWithItems | null>(null)
  const [user, setUser] = useState<null | User>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState<null | {id: string, type: "delivery" | "selfPickup"}>(null)
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    payment: "card",
    comment: "",
    useBonuses: false,
  });

  const fetchBasket = async () => {
    const response = await getBasket()

    setBasket(response.data)
  }
  const fetchUser = async () => {
    const response = await getUserAction()

    if (response.success && response.data) {
      setUser(response.data)
      setForm((prev) => ({ ...prev, name: response.data!.name ?? "", phone: response.data!.phone ?? "", email: response.data!.email ?? "" }))
    }
  }

  useEffect(() => {
    setInitialLoad(true)

    if (open) {
      void fetchBasket()
      void fetchUser()
    }
    setInitialLoad(false)

  }, [open])

  const handleFormChange = (field: string, value: boolean | string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const calculateBonuses = () => {
    if(!basket) {
      return 0
    }
    return Math.floor(basket.items.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 0.05)
  }
  const handleFormSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!basket || !user) {
      toast({
        title: "Корзина пуста ",
        description: "Пожалуйста, добавьте товары в корзину",
      })
      return
    }
    if(!selectedAddress){
      toast({
        title: "Адрес не выбран",
        description: "Пожалуйста, выберите адрес",
      })
      return
    }
    const price = totalPrice ? totalPrice + 400 - (form.useBonuses ? user.bonuses : 0) : 0

    if(form.payment === "card"){
      const orderData = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        payment: form.payment,
        comment: form.comment,
        userId: user.id,
        selectedLocation: selectedAddress,
        totalPrice: price,
        useBonuses: form.useBonuses,
        bonuses: form.useBonuses ? user.bonuses : calculateBonuses(),
        items: basket.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      router.push(`/mock-payment?data=${encodeURIComponent(JSON.stringify(orderData))}`);
      return;
    }
    
    const order = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      payment: form.payment,
      comment: form.comment,
      userId: user.id,
      useBonuses: form.useBonuses,
      bonuses: form.useBonuses ? user.bonuses : calculateBonuses(),
      locationId: selectedAddress.type==="delivery"?selectedAddress.id:null,
      restaurantId: selectedAddress.type==="selfPickup"?selectedAddress.id:null,
      totalPrice: price,
      items: basket.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    }
    const response = await createOrderAction(order)

    if (response.success) {
      toast({
        title: "Заказ успешно оформлен",
        description: "Вы можете отследить его в разделе 'Мои заказы'",
      })
      router.push('/profile')
    }else{
      toast({
        title: "Ошибка при оформлении заказа",
        description: "Пожалуйста, попробуйте еще раз",
      })
    }
    // Здесь будет отправка на сервер
    console.log("Order form submitted:", form);
    console.log("Order response:", response);
  };

  return (
    <Dialog 
      modal
      onOpenChange={setOpen}
      open={open}

    >
      <DialogTrigger asChild>
        <Button className=" text-md bg-main text-white flex items-center justify-center gap-2 "
              
          variant="destructive"
        >  
          Оформить заказ -
          <p className=" ">
            {totalPrice} ₽
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full" >
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
        </DialogHeader>
        {initialLoad && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin"
              size={24}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 w-full" >
          <div className="w-1/2 flex flex-col">
            <Tabs 
              className="w-full "
              defaultValue="selfPickup"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selfPickup">Самовывоз</TabsTrigger>
                <TabsTrigger 
                  value="delivery"
                >
                  Доставка
                </TabsTrigger>
              </TabsList>
              <TabsContent value="selfPickup">
                <SelfPickupForm selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              </TabsContent>
              <TabsContent value="delivery">
                <OrderLocationList selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              </TabsContent>
            </Tabs>
            <OrderForm 
              bonuses={user?.bonuses ?? null}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              values={form}
            />
            <div>
              
            </div>
          </div>
          {basket?.items.length != 0 && (
            <div className=" flex flex-col self-start gap-3   w-1/2 ">
              <div className="flex flex-col gap-2 ">
                <p className="text-lg font-bold">Итого {totalPrice ? totalPrice+400 - (form.useBonuses ? user?.bonuses ?? 0 : 0) : 0} ₽</p>

                <p className="text-sm flex-between">В корзине {basket?.items.length} товаров <span>{basket?.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)} ₽ </span></p>
                <p className="text-sm flex-between">Доставка 400 ₽ <span>400 ₽</span></p>
                {!form.useBonuses && (
                  <p className="text-sm flex-between">Начислено бонусов <span>{calculateBonuses()} ₽</span></p>
                )}
              </div>
              <div className="border-b-2 border-[hsla(0,0%,100%,.1)] w-full "></div>
              <Button className=" text-md bg-main text-white flex items-center justify-center gap-2 "
                onClick={handleFormSubmit}
                variant="destructive"
              >  
                Оформить заказ
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
