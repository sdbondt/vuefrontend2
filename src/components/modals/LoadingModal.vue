<script setup>
    const { loading } = defineProps(['loading'])
</script>

<template>
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  </template>