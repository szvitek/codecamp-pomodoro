<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from "vue";
import Beep from "../assets/audio/BeepSound.wav";

type Mode = "session" | "break";

const interval = ref<number>();
const mode = ref<Mode>("session");
const isRunning = ref(false);
const audio = ref<HTMLAudioElement | null>(null);
const timer = reactive({
  session: 25,
  break: 5,
});

watch(timer, () => {
  remainingTime.session = {
    total: timer.session * 60,
    minutes: timer.session,
    seconds: 0,
  };
  remainingTime.break = {
    total: timer.break * 60,
    minutes: timer.break,
    seconds: 0,
  };
});

const remainingTime = reactive({
  session: {
    total: timer.session * 60,
    minutes: timer.session,
    seconds: 0,
  },
  break: {
    total: timer.break * 60,
    minutes: timer.break,
    seconds: 0,
  },
});

function handleReset() {
  if (interval.value) {
    clearInterval(interval.value);
  }
  audio.value?.pause();
  if (audio.value) {
    audio.value.currentTime = 0;
  }
  isRunning.value = false;
  timer.break = 5;
  timer.session = 25;
  switchMode("session");
}

function getRemainingTime(endTime: number) {
  const currentTime = Date.parse(new Date().toString());
  const difference = endTime - currentTime;

  const total = Math.floor(difference / 1000);
  const minutes = Math.floor((total / 60) % 60);
  const seconds = Math.floor(total % 60);

  return {
    total,
    minutes,
    seconds,
  };
}

function handleStartStop() {
  if (isRunning.value) {
    // pause
    clearInterval(interval.value);
    isRunning.value = false;
  } else {
    // start
    startTimer();
  }
}

function startTimer() {
  isRunning.value = true;
  let { total } = remainingTime[mode.value];
  const endTime = Date.parse(new Date().toString()) + total * 1000;

  interval.value = setInterval(function () {
    remainingTime[mode.value] = getRemainingTime(endTime);

    total = remainingTime[mode.value].total;
    if (total === 0) {
      audio.value?.play();
    }
    if (total < 0) {
      clearInterval(interval.value);

      if (mode.value === "session") {
        switchMode("break");
      } else {
        switchMode("session");
      }

      startTimer();
    }
  }, 1000);
}

function switchMode(newMode: Mode) {
  mode.value = newMode;
  remainingTime.session = {
    total: timer.session * 60,
    minutes: timer.session,
    seconds: 0,
  };
  remainingTime.break = {
    total: timer.break * 60,
    minutes: timer.break,
    seconds: 0,
  };
}

onUnmounted(() => {
  interval.value && clearInterval(interval.value);
});
</script>

<template>
  <div class="timer flex flex-grow flex-col items-center justify-center">
    <div class="controls flex flex-col items-center justify-center md:flex-row">
      <div class="mx-5">
        <div id="break-label">
          <p>Break Length</p>
        </div>
        <div class="flex items-center justify-center">
          <button
            id="break-decrement"
            @click="timer.break > 1 && timer.break--"
            :disabled="isRunning"
            :class="{
              'cursor-not-allowed': isRunning,
              'opacity-50': isRunning,
            }"
          >
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </button>
          <div id="break-length">{{ timer.break }}</div>
          <button
            id="break-increment"
            @click="timer.break < 60 && timer.break++"
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
      <div class="mx-5">
        <div id="session-label">
          <p>Session Length</p>
        </div>
        <div class="flex flex-grow items-center justify-center">
          <button
            id="session-decrement"
            @click="timer.session > 1 && timer.session--"
            :disabled="isRunning"
            :class="{
              'cursor-not-allowed': isRunning,
              'opacity-50': isRunning,
            }"
          >
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </button>
          <div id="session-length">{{ timer.session }}</div>
          <button
            id="session-increment"
            @click="timer.session < 60 && timer.session++"
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
    </div>
    <div class="rounded-3xl border-4 border-green-950 p-6">
      <div class="text-2xl capitalize" id="timer-label">{{ mode }}</div>
      <div class="mx-5 mt-6 text-6xl md:mx-12" id="time-left">
        {{ remainingTime[mode].minutes.toString().padStart(2, "0") }}:{{
          remainingTime[mode].seconds.toString().padStart(2, "0")
        }}
      </div>
    </div>
    <div class="timer-control">
      <button
        id="start_stop"
        @click="handleStartStop()"
        :class="{ active: isRunning }"
      >
        <font-awesome-icon
          id="start"
          :icon="['fas', 'play']"
          :class="[!isRunning ? 'opacity-100' : 'opacity-50']"
        />
        <font-awesome-icon
          id="stop"
          :icon="['fas', 'pause']"
          :class="[isRunning ? 'opacity-100' : 'opacity-50']"
        />
      </button>
      <button id="reset" @click="handleReset">
        <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
      </button>
    </div>
    <audio id="beep" :src="Beep" ref="audio" />
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
  @apply mx-3 hover:text-green-500;
}
</style>
