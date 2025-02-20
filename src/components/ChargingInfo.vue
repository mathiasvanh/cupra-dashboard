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
            Charging
          </div>
          <div class="space-y-2 mt-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Status</span>
              <Badge variant="outline">
                {{ store.batteryStatus.chargingStatus }}
              </Badge>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Power</span>
              <span class="font-medium">{{ store.batteryStatus.chargePower }} kW</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Rate</span>
              <span class="font-medium">{{ store.batteryStatus.chargeRate }} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVehicleStore } from '../stores/vehicle'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const store = useVehicleStore()
const VIN = import.meta.env.VITE_VEHICLE_VIN

onMounted(() => {
  store.fetchBatteryStatus(VIN)
})
</script> 