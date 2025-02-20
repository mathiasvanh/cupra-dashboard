<template>
  <Card class="w-full">
    <CardContent class="pt-6">
      <div v-if="store.loading" class="flex p-4">
        <span class="text-muted-foreground">Loading...</span>
      </div>
      <div v-else-if="store.error" class="text-red-500">
        Error: {{ store.error }}
      </div>
      <div v-else-if="store.parkingPosition" class="space-y-4">
        <div class="flex flex-col">
          <div class="text-sm">
            Parking Location
          </div>
          <div 
            class="mt-2 h-[400px] w-full rounded-md overflow-hidden border bg-muted relative" 
            ref="mapContainer"
            style="min-height: 400px; z-index: 0;"
          ></div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useVehicleStore } from '../stores/vehicle'
import { Card, CardContent } from '@/components/ui/card'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
})

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN
const mapContainer = ref(null)
let map = null
let marker = null

const initMap = () => {
  if (!store.parkingPosition || !mapContainer.value) return
  console.log('Initializing map with position:', store.parkingPosition)
  console.log('Map container:', mapContainer.value)

  if (!map) {
    console.log('Creating new map instance')
    map = L.map(mapContainer.value, {
      zoomControl: false,
      scrollWheelZoom: false
    }).setView(
      [store.parkingPosition.lat, store.parkingPosition.lon],
      16
    )

    console.log('Adding tile layer')
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({
      position: 'topright'
    }).addTo(map)

    setTimeout(() => {
      console.log('Invalidating map size')
      map.invalidateSize()
    }, 250)
  }

  if (marker) {
    marker.remove()
  }

  marker = L.marker([store.parkingPosition.lat, store.parkingPosition.lon])
    .addTo(map)
    .bindPopup('Your CUPRA Born is parked here')
}

watch(() => store.parkingPosition, initMap, { deep: true })

onMounted(() => {
  store.fetchParkingPosition(VIN).then(() => {
    setTimeout(() => {
      console.log('Attempting to initialize map after delay')
      initMap()
    }, 250)
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script> 