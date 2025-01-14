
import { type ProductWithCategory } from "@/types"
import { type Category } from "@prisma/client"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import AddProductModal from "./AddProductModal"

const MenuTable = ({products, categories}: {products: ProductWithCategory[], categories: Category[]}) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>Список всех позиций меню.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Название</TableHead>
            <TableHead>Цена (₽)</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата обновления</TableHead>
            <TableHead>Острая</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Изображение</TableHead>

            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{product.updatedAt.toLocaleDateString()}</TableCell>
              <TableCell>{product.isCpicy ? "Да" : "Нет"}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="text-right">
                {product.image ? <Image alt="product"
                  className="rounded-md w-[100px] h-[100px]"
                  height={100}
                  src={product.image as string}
                  width={100}
                /> : (
                  <div className="w-[100px] h-[100px] bg-muted-foreground/10 rounded-md flex-center">
                    <p className="text-xs text-muted-foreground/80 text-center"> Нет <br/>изображения</p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="w-full">
            <TableCell colSpan={9}>
              <AddProductModal categories={categories} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
     
    </div>
  )
}

export default MenuTable
