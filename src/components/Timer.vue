<script setup lang="ts">
import { ref } from "vue";

const timeBreak = ref(5);
const timeSession = ref(25);
</script>

<template>
  <div class="timer flex flex-grow flex-col items-center justify-center">
    <div class="controls flex flex-col items-center justify-center md:flex-row">
      <div class="mx-5">
        <div id="break-label">
          <p>Break Length</p>
        </div>
        <div class="flex items-center justify-center">
          <button id="break-decrement">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </button>
          <div id="break-length">{{ timeBreak }}</div>
          <button id="break-increment">
            <font-awesome-icon :icon="['fas', 'arrow-up']" />
          </button>
        </div>
      </div>
      <div class="mx-5">
        <div id="session-label">
          <p>Session Length</p>
        </div>
        <div class="flex flex-grow items-center justify-center">
          <button id="session-decrement">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </button>
          <div id="session-length">{{ timeSession }}</div>
          <button id="session-increment">
            <font-awesome-icon :icon="['fas', 'arrow-up']" />
          </button>
        </div>
      </div>
    </div>
    <div class="rounded-3xl border-4 p-6">
      <div class="text-2xl" id="timer-label">Session</div>
      <div class="mx-5 md:mx-12 mt-6 text-6xl" id="time-left">60:00</div>
    </div>
    <div class="timer-control">
      <button id="start_stop">
        <font-awesome-icon :icon="['fas', 'play']" />
        <font-awesome-icon :icon="['fas', 'pause']" />
      </button>
      <button id="reset">
        <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.timer {
  @apply md:min-w-[500px];
}
.timer > div {
  @apply py-5 md:py-10;
}
button {
  @apply px-3;
}
</style>
