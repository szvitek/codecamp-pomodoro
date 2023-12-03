<script setup lang="ts">
import { reactive } from "vue";

defineProps<{ isRunning: boolean }>();
const emit = defineEmits(["onStartStop", "onReset"]);

const buttonClicks = reactive({
  start: false,
  reset: false
});

function onStartClicked() {
  emit('onStartStop')
  buttonClicks.start = true;
}

function onResetClick() {
  emit("onReset");
  buttonClicks.reset = true;
}
</script>

<template>
  <div class="timer-control">
    <button
      id="start_stop"
      class="hover:text-white"
      @click="onStartClicked"
      :class="{ active: isRunning }"
    >
      <font-awesome-icon
        id="start"
        :icon="['fas', 'play']"
        class="hover:text-green-500"
        :class="[!isRunning ? 'opacity-100' : 'opacity-50 hover:text-inherit']"
        :beat="buttonClicks.start"
          :style="[
            '--fa-animation-iteration-count: 1',
            '--fa-animation-duration: 0.5s',
          ]"
          @animationend="buttonClicks.start = false"
      />
      <font-awesome-icon
        id="stop"
        :icon="['fas', 'pause']"
        class="hover:text-green-500"
        :class="[isRunning ? 'opacity-100' : 'opacity-50 hover:text-inherit']"
        :beat="buttonClicks.start"
          :style="[
            '--fa-animation-iteration-count: 1',
            '--fa-animation-duration: 0.5s',
          ]"
          @animationend="buttonClicks.start = false"
      />
    </button>
    <button id="reset" @click="onResetClick">
      <font-awesome-icon
        :icon="['fas', 'arrows-rotate']"
        :spin="buttonClicks.reset"
        :style="[
          '--fa-animation-iteration-count: 1',
          '--fa-animation-duration: 1s',
        ]"
        @animationend="buttonClicks.reset = false"
      />
    </button>
  </div>
</template>

<style scoped></style>
