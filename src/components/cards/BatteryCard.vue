<template>
  <MetricCard 
    title="Battery Level"
    :loading="store.loading"
    :error="store.error"
  >
    <div class="mt-2 space-y-2">
      <div class="text-4xl font-bold">
        {{ batteryLevel }}%
      </div>
      <div class="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          class="h-full bg-green-500 transition-all duration-500"
          :class="{'bg-yellow-500': batteryLevel <= 30, 'bg-red-500': batteryLevel <= 15}"
          :style="{ width: `${batteryLevel}%` }"
        />
      </div>
      <div class="text-sm text-muted-foreground">
        Target: 100%
      </div>
    </div>
  </MetricCard>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'
import MetricCard from './MetricCard.vue'

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN

const batteryLevel = computed(() => {
  return store.batteryStatus?.chargeLevel || 0
})

onMounted(() => {
  store.fetchBatteryStatus(VIN)
})
</script> 