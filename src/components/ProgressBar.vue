<template>
  <div id="progress-bar" class="">
    <div
      id="progress"
      class="h-2 bg-white transition-[width] duration-100 ease-in-out"
      :style="{ width: `${progress}%`, backgroundColor: color }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ color: string; progress: number }>();
</script>

<style scoped>
#progress-bar {
  @apply absolute left-0 right-0 top-0 m-0 w-full bg-teal-900 p-0;
}
</style>
