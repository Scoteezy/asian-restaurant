
import { type Category } from "@/types"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import AddCategoryModal from "./AddCategoryModal"
import DeleteCategoryModal from "./DeleteCategoryModal"
import EditCategoryModal from "./EditCategoryModal"
import RestoreCategoryModal from "./RestoreCategoryModal"

const CategoryTable = ({categories, caption = "Список всех категорий.", isDeleted = false}: {categories: Category[], caption?: string, isDeleted?: boolean}) => {
  return  (
    <div className="w-full">
      <Table>
        <TableCaption>{caption}</TableCaption>
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
                {!isDeleted && <DeleteCategoryModal category={category} />}
                {isDeleted && <RestoreCategoryModal category={category} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!isDeleted && (
          <TableFooter>
            <TableRow className="w-full">
              <TableCell colSpan={5}>
                <AddCategoryModal />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

export default CategoryTable
