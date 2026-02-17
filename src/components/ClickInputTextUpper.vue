<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface Item {
  name: string;
}

// Dropdown items
const items = ref<Item[]>([
  { name: "Apple" },
  { name: "Banana" },
  { name: "Orange" },
  { name: "Mango" },
]);

// Selected item
const selectedItem = ref<Item | null>(null);

// Dropdown state
const dropdownOpen = ref(false);
const loading = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Toggle dropdown with loading spinner
const toggleDropdown = () => {
  dropdownOpen.value = true;
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500); // spinner delay
};

// Select item
const selectItem = (item: Item) => {
  selectedItem.value = item;
  dropdownOpen.value = false;
};

// Close dropdown if clicked outside
const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false;
    loading.value = false;
  }
};

// Add/remove event listener
onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside),
);
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="relative w-64" ref="dropdownRef">
      <!-- Input with floating label -->
      <div class="relative w-full">
        <input
          type="text"
          readonly
          @click="toggleDropdown"
          :value="selectedItem ? selectedItem.name : ''"
          placeholder=" "
          class="peer w-full border px-3 py-2 rounded bg-white focus:outline-none"
        />
        <label
          class="absolute left-3 transition-all duration-200"
          :class="{
            '-top-5 text-gray-600 text-sm': selectedItem || dropdownOpen,
            'top-2 text-gray-400 text-sm': !selectedItem && !dropdownOpen,
          }"
        >
          Select an item
        </label>
      </div>

      <!-- Dropdown -->
      <ul
        v-if="dropdownOpen"
        class="absolute w-full bg-white border mt-1 rounded shadow z-10 max-h-60 overflow-auto flex flex-col items-center justify-center"
      >
        <!-- Loading spinner -->
        <li v-if="loading" class="py-4 flex justify-center w-full">
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
        </li>

        <li
          v-else
          v-for="item in items"
          :key="item.name"
          @click="selectItem(item)"
          class="px-3 py-2 hover:bg-gray-200 cursor-pointer w-full"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
