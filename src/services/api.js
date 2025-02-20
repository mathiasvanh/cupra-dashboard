import { cache } from '@/utils/cache'
const BASE_URL = '/api' // Using Vite proxy
const API_TOKEN = import.meta.env.VITE_API_TOKEN

// Cache expiration times
const CACHE_TIMES = {
  BATTERY_STATUS: 30 * 1000, // 30 seconds
  MILEAGE: 5 * 60 * 1000, // 5 minutes
  USER_INFO: 30 * 60 * 1000, // 30 minutes
  PARKING_POSITION: 5 * 60 * 1000
}

export const vehicleApi = {
  async getBatteryStatus(vin) {
    const cacheKey = `battery_${vin}`
    const cachedData = cache.get(cacheKey)
    
    if (cachedData) {
      return cachedData
    }

    try {
      const response = await fetch(`${BASE_URL}/vehicles/${vin}/charging/status`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const transformedData = {
        chargeLevel: data.status.battery.currentSOC_pct,
        range: data.status.battery.cruisingRangeElectric_km,
        chargingStatus: data.status.charging.chargingState,
        chargePower: data.status.charging.chargePower_kW,
        chargeRate: data.status.charging.chargeRate_kmph,
        plugStatus: data.status.plug.plugConnectionState,
        timestamp: data.status.battery.carCapturedTimestamp
      }

      cache.set(cacheKey, transformedData, CACHE_TIMES.BATTERY_STATUS)
      return transformedData
    } catch (error) {
      console.error('Error fetching battery status:', error)
      throw error
    }
  },

  async getMileage(vin) {
    const cacheKey = `mileage_${vin}`
    const cachedData = cache.get(cacheKey)
    
    if (cachedData) {
      return cachedData
    }

    try {
      const response = await fetch(`${BASE_URL}/v1/vehicles/${vin}/mileage`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const transformedData = {
        totalMileage: data.mileageKm
      }

      cache.set(cacheKey, transformedData, CACHE_TIMES.MILEAGE)
      return transformedData
    } catch (error) {
      console.error('Error fetching mileage:', error)
      throw error
    }
  },

  async getParkingPosition(vin) {
    const cacheKey = `parking_${vin}`
    const cachedData = cache.get(cacheKey)
    
    if (cachedData) {
      return cachedData
    }

    try {
      const response = await fetch(`${BASE_URL}/v1/vehicles/${vin}/parkingposition`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      cache.set(cacheKey, data, CACHE_TIMES.PARKING_POSITION)
      return data
    } catch (error) {
      console.error('Error fetching parking position:', error)
      throw error
    }
  }
} 