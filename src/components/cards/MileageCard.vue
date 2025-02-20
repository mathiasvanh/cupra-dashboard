<template>
  <MetricCard 
    title="Mileage"
    :loading="store.loading"
    :error="store.error"
  >
    <div class="text-4xl font-bold">
      {{ formatNumber(store.mileage?.totalMileage) }} <span class="text-xl">km</span>
    </div>
    <div class="text-sm text-muted-foreground mt-2">
      Total Distance Driven
    </div>
  </MetricCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'
import MetricCard from './MetricCard.vue'

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN

const formatNumber = (number) => {
  return new Intl.NumberFormat('de-DE').format(number || 0).replace(/\./g, '.')
}

onMounted(() => {
  store.fetchMileage(VIN)
})
</script> 