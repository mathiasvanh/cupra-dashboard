<template>
  <Card class="w-full">
    <CardContent class="pt-6">
      <div v-if="store.loading" class="flex p-4">
        <span class="text-muted-foreground">Loading...</span>
      </div>
      <div v-else-if="store.error" class="text-red-500">
        Error: {{ store.error }}
      </div>
      <div v-else-if="store.batteryStatus" class="space-y-4">
        <div class="flex flex-col">
          <div class="text-sm">
            Range
          </div>
          <div class="text-4xl font-bold">
            {{ store.batteryStatus.range }} <span class="text-xl">km</span>
          </div>
          <div class="text-sm text-muted-foreground mt-2">
            Estimated remaining range
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'
import MetricCard from './MetricCard.vue'
import { Card, CardContent } from '@/components/ui/card'

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN

onMounted(() => {
  store.fetchBatteryStatus(VIN)
})
</script> 