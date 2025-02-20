<template>
  <Card class="w-full">
    <CardContent class="pt-6">
      <div v-if="loading" class="flex p-4">
        <span class="text-muted-foreground">Loading...</span>
      </div>
      <div v-else-if="error" class="text-red-500">
        Error: {{ error }}
      </div>
      <div v-else class="space-y-4">
        <div class="flex flex-col">
          <div class="text-sm">
            {{ title }}
          </div>
          <slot></slot>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card'

defineProps({
  title: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})
</script> 