
import { type RestaurantPickupLocation, } from "@/types"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { DeleteLocationModal } from "./DeleteLocationModal"
import { ManageLocationModal } from "./ManageLocationModal"



const RestaurantsTable = ({locations}: {locations: RestaurantPickupLocation[]}) => {
  return  (
    <div className="w-full">
      <Table>
        <TableCaption>Список всех ресторанов.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Адрес</TableHead>
            <TableHead>Часы работы</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата обновления</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">{location.address}</TableCell>
              <TableCell>{location.workingHours}</TableCell>
              <TableCell>{location.phone}</TableCell>
              <TableCell>{location.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{location.updatedAt.toLocaleDateString()}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <ManageLocationModal location={location}/>
                <DeleteLocationModal location={location} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="w-full">
            <TableCell colSpan={7}>
              <ManageLocationModal />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default RestaurantsTable
