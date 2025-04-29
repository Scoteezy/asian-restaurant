export type RawRestaurantPickupLocation = Omit<RestaurantPickupLocation, "createdAt" | "id" | "updatedAt">

export type RestaurantPickupLocation = {
  id: string
  name: string
  address: string
  workingHours: string
  phone: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
} 
