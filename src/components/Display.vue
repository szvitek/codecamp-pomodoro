<script setup lang="ts">
defineProps<{
  label: string;
  color: string;
  minutes: number;
  seconds: number;
}>();
</script>

<template>
  <div class="rounded-3xl border-4 border-green-950 p-6">
    <div class="text-2xl capitalize" id="timer-label">{{ label }}</div>
    <div class="mx-5 mt-6 text-6xl md:mx-12" id="time-left" :style="{ color }">
      {{ minutes.toString().padStart(2, "0") }}:{{
        seconds.toString().padStart(2, "0")
      }}
    </div>
  </div>
</template>

<style scoped></style>
