'use client'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getUserLocationsAction } from '@/server/actions/location.actions'
import { type Location } from '@/types/Location'

import { LocationItem } from './LocationItem'
export const OrderLocationList = ({selectedAddress, setSelectedAddress}: {selectedAddress: null | {id: string, type: "delivery" | "selfPickup"}, setSelectedAddress: (address: null | {id: string, type: "delivery" | "selfPickup"}) => void}) => {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchLocations = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const response = await getUserLocationsAction()

      if (response.success && response.data) {
        setLocations(response.data)
      } else {
        setError(true)
      }
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => { 
    
    void fetchLocations()
  }, [])

  

  if (loading) {
    return <div className='flex items-center justify-center h-full w-full'><Loader2 className='animate-spin'/></div>
  }
  if (error) {
    return <div className='flex items-center justify-center h-full w-full'>Ошибка при загрузке адресов</div>
  }
  return (
    <div className='flex flex-col gap-4 mt-4 max-h-[270px] overflow-y-auto'>
      {locations.map((location) => (
        <LocationItem address={location}
          isEdit={false}
          key={location.id}
          selectedAddress={selectedAddress}
          setActive={(active) => setSelectedAddress({id: active, type: "delivery"})}
        />
      ))}
    </div>
  )
}
