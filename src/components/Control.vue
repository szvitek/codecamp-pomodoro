<script setup lang="ts">
import { reactive } from "vue";

defineProps<{ isRunning: boolean; value: number; mode: Mode }>();
const emit = defineEmits(["onDecrement", "onIncrement"]);
const buttonClicks = reactive({
  decrease: false,
  increase: false,
});

function onDecrease() {
  emit("onDecrement");
  buttonClicks.decrease = true;
}

function onIncrease() {
  emit("onIncrement");
  buttonClicks.increase = true;
}
</script>

<template>
  <div class="mx-5">
    <div :id="`${mode}-label`">
      <p class="capitalize">{{ mode }} Length</p>
    </div>
    <div class="flex items-center justify-center">
      <button
        :id="`${mode}-decrement`"
        @click="onDecrease"
        :disabled="isRunning"
        :class="{
          'cursor-not-allowed': isRunning,
          'opacity-50': isRunning,
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-down']"
          :beat="buttonClicks.decrease"
          :style="[
            '--fa-animation-iteration-count: 1',
            '--fa-animation-duration: 0.5s',
            '--fa-beat-scale: 0.5',
          ]"
          @animationend="buttonClicks.decrease = false"
        />
      </button>
      <div :id="`${mode}-length`" class="w-8 md:w-10">{{ value }}</div>
      <button
        :id="`${mode}-increment`"
        @click="onIncrease"
        :disabled="isRunning"
        :class="{
          'cursor-not-allowed': isRunning,
          'opacity-50': isRunning,
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          :beat="buttonClicks.increase"
          :style="[
            '--fa-animation-iteration-count: 1',
            '--fa-animation-duration: 0.5s',
            '--fa-beat-scale: 1.5',
          ]"
          @animationend="buttonClicks.increase = false"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply mx-0 md:mx-3;
}
</style>
