<script setup>
import { reactive } from 'vue'
import { usePostsStore } from '../../store/postsStore';

const postsStore = usePostsStore()
const { changeParams } = postsStore
const { searchParams } = reactive(postsStore)

const handleParamsChange = (e) => changeParams(e.target.name, e.target.value)
</script>

<template>
<div class="flex flex-start">
  <div class="mb-4 px-2">
    <label class="block mb-1 text-sm" for="direction">Order:</label>

    <div class="relative w-40">
      <select
        class="w-full border px-4 pr-8 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none appearance-none"
        id="direction"
        name="direction"
        :value="searchParams.direction"
        @change="handleParamsChange"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
  <div class="mb-4 px-2">
    <label class="block mb-1 text-sm" for="limit">Limit:</label>

    <div class="relative w-40">
      <select
        class="w-full border px-4 pr-8 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none appearance-none"
        id="limit"
        name="limit"
        @change="handleParamsChange"
        :value="searchParams.limit"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
</template>
