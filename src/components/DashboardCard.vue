<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
    <div class="text-gray-600">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script> 