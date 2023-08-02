<script setup>
import { useUiStore } from '../../store/uiStore';

const { error } = defineProps(['error'])
const uiStore = useUiStore()
const { clearError } = uiStore
</script>

<template>
    <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-if="error">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="clearError"></div>

    <div class="absolute max-h-ful max-w-xl md:max-w-2xl lg:max-w-3xl full:max-w-full md:min-w-2xl">
      <div class="container bg-white overflow-hidden md:rounded">
        <div class="px-4 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none">
          <h3>Error</h3>
          <div @click="clearError" class="text-2xl hover:text-gray-600 cursor-pointer">
            &#215;
          </div>
        </div>

        <div class="max-h-full px-4 py-4">
          <slot></slot>
          <div class="flex justify-end mt-4">
            <button @click="clearError" class="px-4 py-2 text-sm bg-gray-100 border border-gray-400 text-gray-600 focus:outline-none hover:underline">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>