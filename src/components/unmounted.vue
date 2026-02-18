<script setup>
import { ref, onMounted } from "vue";

const el = ref();

onMounted(() => {
  el.value;
});
</script>

<template>
  <div ref="el"></div>
</template>
