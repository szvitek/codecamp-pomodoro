<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from "vue";
import Beep from "../assets/audio/BeepSound.wav";
import Control from "./Control.vue";
import ProgressBar from "./ProgressBar.vue";
import { useProgress } from "../composables/useProgress";
import TimerControl from "./TimerControl.vue";
import Display from "./Display.vue";

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

// composable might be overkill here but I wanted to practice how to make/use them
const { max, remaining, color, progress } = useProgress({
  newMax: timer[mode.value] * 60,
  newRemaining: remainingTime[mode.value].total,
});

watch(
  [() => timer[mode.value] * 60, () => remainingTime[mode.value].total],
  ([newMax, newRemaining]) => {
    max.value = newMax;
    remaining.value = newRemaining;
  },
);

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
    <ProgressBar :progress="progress" :color="color" />
    <div class="controls flex flex-col items-center justify-center md:flex-row">
      <Control
        mode="break"
        :is-running="isRunning"
        :value="timer.break"
        @on-decrement="timer.break > 1 && timer.break--"
        @on-increment="timer.break < 60 && timer.break++"
      />
      <Control
        mode="session"
        :is-running="isRunning"
        :value="timer.session"
        @on-decrement="timer.session > 1 && timer.session--"
        @on-increment="timer.session < 60 && timer.session++"
      />
    </div>
    <Display
      :label="mode"
      :color="color"
      :minutes="remainingTime[mode].minutes"
      :seconds="remainingTime[mode].seconds"
    />
    <TimerControl
      @on-start-stop="handleStartStop"
      @on-reset="handleReset()"
      :is-running="isRunning"
    />
    <audio id="beep" :src="Beep" ref="audio" />
  </div>
</template>

<style>
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
