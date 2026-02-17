<script setup lang="ts">
import { ref } from "vue";
const loading = ref(false);
function handleFocus() {
  loading.value = true;
}
</script>
<template>
  <div class="mt-5 px-10">
    <div class="relative w-full">
      <input
        type="text"
        class="border border-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 rounded px-3 py-2 outline-none transition-all duration-200 w-full"
        placeholder="Type something..."
        @focus="handleFocus"
      />

      <div v-if="loading" class="absolute inset-y-0 right-3 flex items-center">
        <svg
          class="animate-spin h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
