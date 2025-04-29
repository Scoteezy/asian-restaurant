export type Location = {
  id: string
  userId: string
  address: string
  isPrivate: boolean
  entrance: null | string
  doorCode: null | string
  floor: null | string
  apartment: null | string
  comment: null | string
}

export type RawLocation = Omit<Location, "id" | "userId">

export type RawRestaurantPickupLocation = Omit<RestaurantPickupLocation, "id">

export type RestaurantPickupLocation = {
  id: string
  name: string
  address: string
  workingHours: string
  phone: string
  isActive: boolean
}
