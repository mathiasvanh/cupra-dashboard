<template>
  <Card class="w-full">
    <CardContent class="pt-6">
      <div v-if="store.loading" class="flex p-4">
        <span class="text-muted-foreground">Loading...</span>
      </div>
      <div v-else-if="store.error" class="text-red-500">
        Error: {{ store.error }}
      </div>
      <div v-else-if="store.mileage" class="space-y-4">
        <div class="flex flex-col">
          <div class="text-sm">
            Mileage
          </div>
          <div class="text-4xl font-bold">
            {{ formatNumber(store.mileage.totalMileage) }} <span class="text-xl">km</span>
          </div>
          <div class="text-sm text-muted-foreground mt-2">
            Total Distance Driven
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVehicleStore } from '../stores/vehicle'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN

const formatNumber = (number) => {
  return new Intl.NumberFormat('de-DE').format(number).replace(/\./g, '.')
}

onMounted(() => {
  store.fetchMileage(VIN)
})
</script> 