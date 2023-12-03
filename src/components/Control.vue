<script setup lang="ts">
defineProps<{ isRunning: boolean; value: number; mode: Mode }>();
const emit = defineEmits(["onDecrement", "onIncrement"]);
</script>

<template>
  <div class="mx-5">
    <div :id="`${mode}-label`">
      <p class="capitalize">{{ mode }} Length</p>
    </div>
    <div class="flex items-center justify-center">
      <button
        :id="`${mode}-decrement`"
        @click="emit('onDecrement')"
        :disabled="isRunning"
        :class="{
          'cursor-not-allowed': isRunning,
          'opacity-50': isRunning,
        }"
      >
        <font-awesome-icon :icon="['fas', 'arrow-down']" />
      </button>
      <div :id="`${mode}-length`" class="w-8 md:w-10">{{ value }}</div>
      <button
        :id="`${mode}-increment`"
        @click="emit('onIncrement')"
        :disabled="isRunning"
        :class="{
          'cursor-not-allowed': isRunning,
          'opacity-50': isRunning,
        }"
      >
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply mx-0 md:mx-3;
}
</style>
