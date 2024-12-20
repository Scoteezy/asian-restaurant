import { ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full bg-background h-[70px]">
      <div className="wrapper flex-between">
        <div className="flex-center text-2xl font-bold text-primary gap-5">
          <Link href="/">
            Logo
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
         
      </div>
    </div>
  );
};

export { Header };
