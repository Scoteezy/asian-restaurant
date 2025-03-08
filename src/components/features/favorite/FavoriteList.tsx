import { HeartIcon } from "lucide-react";

import { getFavorites } from "@/server/actions/favorite.actions";

import FavoriteItem from "./FavoriteItem";

export const FavoriteList = async () => {
  const favorite = await getFavorites()

  if(favorite.error || !favorite.data){
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-primary">Избранное</h2>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          Произошла ошибка при получении избранных блюд. Попробуйте позже.
        </p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2 w-full max-h-[400px]">
      <h2 className="text-xl font-bold text-primary">Избранное</h2>
     
      {favorite.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2   gap-2 scroll-y-auto ">
          {favorite.data?.map((item) => (
            <FavoriteItem favorite={item}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          Здесь будут Ваши избранные блюда. Перейдите в меню и выберите их, нажав на иконку <HeartIcon height={18}
            size={18}
            width={18}
          />
        </p>
      )}
    </div>
  );
};

export default FavoriteList;
