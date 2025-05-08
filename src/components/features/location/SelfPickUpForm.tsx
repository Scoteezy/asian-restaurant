import { Loader2, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

import { getUserLocationsAction } from "@/server/actions/location.actions"
import { getRestaurantLocationsAction } from "@/server/actions/restaurant-locations.actions"
import { type Address, type RestaurantPickupLocation } from "@/types"
import { type Location } from "@/types/Location"
const addresses: Address<"selfPickup">[] = [
  {
    id: 1,
    type: "selfPickup",
    address: "ул Горсоветская 49/2",
  },
  {
    id: 2,
    type: "selfPickup",
    address: "ул Пешкова 55",
  },
]
const SelfPickupForm = ({selectedAddress, setSelectedAddress}: {selectedAddress: null | {id: string, type: "delivery" | "selfPickup"}, setSelectedAddress: (address: null | {id: string, type: "delivery" | "selfPickup"}) => void}) => {
  const [locations, setLocations] = useState<RestaurantPickupLocation[]>([])
  const preSelected = localStorage.getItem("selectedAddress")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getRestaurantLocationsAction()

      setLoading(false)
      if (response.success && response.data) {
        setLocations(response.data)
      }
    }

    void fetchLocations()
  }, [])
  const handleClick = (id: string) => {
    if (selectedAddress?.id === id) {
      setSelectedAddress(null)
    } else {
      setSelectedAddress({id, type: "selfPickup"})
    }
  }

  if (loading) {
    return <div className='flex items-center justify-center h-full w-full'><Loader2 className='animate-spin'/></div>
  }
  return (
    <div className="flex flex-col gap-4 mt-4 h-full max-h-[270px] overflow-y-auto"> 
      {locations.map((address) => (
        <button 
          className={`
          flex items-center justify-start gap-2 placeholder:text-muted-foreground 
          px-2 py-3 rounded-md  border  transition-all duration-300 
          ${selectedAddress?.id === address.id ? "bg-primary text-white border-main" : "bg-muted-foreground/10 border-muted-foreground/20"}
        `}
          key={address.id}
          onClick={() => handleClick(address.id)}
        >
          <MapPin className="w-6 h-6"
            color="#fff"
            height={30}
            width={30}
          />
          <p className="text-md font-bold">{address.address}</p>
        </button>
      ))}
     
    </div>
  )

}

export { SelfPickupForm }
