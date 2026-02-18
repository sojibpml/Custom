<script setup lang="ts">
import { ref } from "vue";

const value = ref<string>("");
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="relative w-80">
      <input
        v-model="value"
        type="text"
        placeholder=" "
        class="peer w-full border border-gray-400 rounded px-3 py-3 bg-transparent focus:outline-none focus:border-blue-500"
      />

      <label
        class="absolute left-3 px-1 text-gray-500 bg-gray-100 transition-all top-3 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-gray-100"
        :class="{
          '-top-2 text-sm text-blue-500 bg-gray-100': value,
        }"
      >
        Your Name
      </label>
    </div>
  </div>
</template>
