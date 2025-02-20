<template>
  <ThemeProvider :default-theme="theme">
    <div class="min-h-screen">
      <Header />
      <main class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ChargingInfo />
          <BatteryLevel />
          <MileageInfo />
          <RangeInfo />
          <ParkingMap class="md:col-span-4" />
        </div>
      </main>
    </div>
  </ThemeProvider>
</template>

<script setup>
import { useTheme } from '@/composables/theme'
import Header from './components/Header.vue'
import BatteryLevel from './components/BatteryLevel.vue'
import MileageInfo from './components/MileageInfo.vue'
import RangeInfo from './components/RangeInfo.vue'
import ChargingInfo from './components/ChargingInfo.vue'
import ParkingMap from './components/ParkingMap.vue'

const { theme } = useTheme()
</script> 