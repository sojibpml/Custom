<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface Item {
  name: string;
}

const items = ref<Item[]>([
  { name: "Apple" },
  { name: "Banana" },
  { name: "Orange" },
  { name: "Mango" },
]);

const selectedItem = ref<Item | null>(null);
const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const loading = ref(false);

const selectItem = (item: Item) => {
  selectedItem.value = item;
  dropdownOpen.value = false;
};

const toggleDropdown = () => {
  dropdownOpen.value = true;
  loading.value = true;

  // simulate loading delay (e.g., fetching items)
  setTimeout(() => {
    loading.value = false;
  }, 500); // 0.5s delay
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false;
    loading.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="relative w-64" ref="dropdownRef">
      <input
        type="text"
        readonly
        @click="toggleDropdown"
        :value="selectedItem ? selectedItem.name : ''"
        placeholder="Select an item"
        class="w-full border px-3 py-2 rounded cursor-pointer bg-white"
      />

      <ul
        v-if="dropdownOpen"
        class="absolute w-full bg-white border mt-1 rounded shadow z-10 max-h-60 overflow-auto flex flex-col items-center justify-center"
      >
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

        <!-- Show Items when loading is done -->
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
