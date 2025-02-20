<template>
  <ThemeProvider :default-theme="theme">
    <div class="min-h-screen">
      <Header />
      <main class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ChargingCard />
          <BatteryCard />
          <MileageCard />
          <RangeCard />
          <ParkingMap class="md:col-span-4" />
        </div>
      </main>
    </div>
  </ThemeProvider>
</template>

<script setup>
import { useTheme } from '@/composables/theme'
import Header from './components/Header.vue'
import BatteryCard from './components/cards/BatteryCard.vue'
import MileageCard from './components/cards/MileageCard.vue'
import RangeCard from './components/cards/RangeCard.vue'
import ChargingCard from './components/cards/ChargingCard.vue'
import ParkingMap from './components/ParkingMap.vue'

const { theme } = useTheme()
</script> 