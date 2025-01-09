type Address<T extends "delivery" | "selfPickup" = "delivery" | "selfPickup"> = T extends "delivery" 
  ? DeliveryAddress 
  : SelfPickupAddress

  type DeliveryAddress = {
    id: number
    type: "delivery"
    userId: string
    city: string
    street: string
    house: string
    comment?: string
    isPrivateHouse: boolean
  } & (
    | { isPrivateHouse: false }
    | { isPrivateHouse: true; floor?: string; apartment?: string }
  )

type SelfPickupAddress = {
  id: number
  type: "selfPickup"
  address: string
}

export type { Address }
