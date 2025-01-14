'use client'

import { PlusIcon, SoupIcon } from "lucide-react"

import Image from "next/image"

import { Button } from "@/components/ui/button"

const MenuItem = () => {
  return (
    <div className="flex flex-col gap-2 relative rounded-md bg-muted-foreground/10 overflow-hidden  group cursor-pointer">
      <div className="absolute top-2 left-2 z-40 flex-center text-white p-1  rounded-full  bg-red-500/50 gap-1 flex items-center">
        <p className="text-xs">Остро</p>
        <SoupIcon size={16} />
      </div>
      <div className="relative overflow-hidden h-[270px] w-full">
        <Image alt="item"
          className="rounded-t-md w-full group-hover:scale-110 transition-all duration-700 absolute top-0 inset-0 h-[270px] z-30"
          height={270}
          src={'/udon-placeholder.webp'}
          width={240}
        />
      </div>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex-between ">
          <p className="text-lg group-hover:text-main transition-all duration-700 max-w-[150px]">Удон с курицей том ям</p> 
          <div className="border-2 border-muted-foreground/20 rounded-full px-2 py-1 text-xs text-muted-foreground/80">
            <p>330 г</p>
          </div>
        </div>
        <p className="text-muted-foreground/80 text-xs">Удон, куриное филе, шпинат, репчатый лук, сливки, соус том ям</p>

        <div className="flex-between">
          <p className="text-lg font-semibold transition-all duration-700 ">500 ₽</p>
          <Button className="flex-center gap-2 rounded-full bg-transparent border 
          border-main text-main font-bold group-hover:bg-main group-hover:text-white transition-all duration-700"
          >
            Выбрать <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { MenuItem }
