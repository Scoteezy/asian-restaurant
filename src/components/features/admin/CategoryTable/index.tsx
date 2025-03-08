import { Trash } from "lucide-react"

import { type Category } from "@/types"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import AddCategoryModal from "./AddCategoryModal"
import DeleteCategoryModal from "./DeleteCategoryModal"
import EditCategoryModal from "./EditCategoryModal"

const CategoryTable = ({categories}: {categories: Category[]}) => {
  return  (
    <div className="w-full">
      <Table>
        <TableCaption>Список всех категорий.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата обновления</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{category.updatedAt.toLocaleDateString()}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <EditCategoryModal category={category} />
                <DeleteCategoryModal category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="w-full">
            <TableCell colSpan={5}>
              <AddCategoryModal />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default CategoryTable
