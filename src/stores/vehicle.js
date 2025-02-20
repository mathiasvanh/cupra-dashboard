import { defineStore } from 'pinia'
import { vehicleApi } from '../services/api'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    batteryStatus: null,
    mileage: null,
    parkingPosition: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchBatteryStatus(vin) {
      this.loading = true
      try {
        this.batteryStatus = await vehicleApi.getBatteryStatus(vin)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchMileage(vin) {
      this.loading = true
      try {
        this.mileage = await vehicleApi.getMileage(vin)
        this.error = null
      } catch (error) {
        this.error = error.message
        this.mileage = null
      } finally {
        this.loading = false
      }
    },

    async fetchParkingPosition(vin) {
      this.loading = true
      this.error = null
      
      try {
        this.parkingPosition = await vehicleApi.getParkingPosition(vin)
        console.log('Fetched parking position:', this.parkingPosition)
      } catch (error) {
        console.error('Error fetching parking position:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}) 