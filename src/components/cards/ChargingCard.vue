<template>
  <MetricCard 
    title="Charging"
    :loading="store.loading"
    :error="store.error"
  >
    <div class="space-y-2 mt-2">
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Status</span>
        <Badge variant="outline">
          {{ store.batteryStatus?.chargingStatus }}
        </Badge>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Power</span>
        <span class="font-medium">{{ store.batteryStatus?.chargePower }} kW</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Rate</span>
        <span class="font-medium">{{ store.batteryStatus?.chargeRate }} km/h</span>
      </div>
    </div>
  </MetricCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'
import MetricCard from './MetricCard.vue'
import { Badge } from '@/components/ui/badge'

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN

onMounted(() => {
  store.fetchBatteryStatus(VIN)
})
</script> 