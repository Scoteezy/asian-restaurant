import { MapPin } from "lucide-react"
import { useState } from "react"

import { type Address } from "@/types"

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
const SelfPickupForm = () => {
  const preSelected = localStorage.getItem("selectedAddress")
  const [selectedAddress, setSelectedAddress] = useState<null | number>(
    preSelected ? parseInt(preSelected) : null
  )

  return (
    <div className="flex flex-col gap-4 mt-4 h-full"> 
      {addresses.map((address) => (
        <button 
          className={`
          flex items-center justify-start gap-2 placeholder:text-muted-foreground 
          px-2 py-3 rounded-md bg-muted-foreground/10 border border-muted-foreground/20 transition-all duration-300
          ${selectedAddress === address.id ? "bg-primary text-white" : ""}
        `}
          key={address.id}
          onClick={() => setSelectedAddress(address.id)}
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
