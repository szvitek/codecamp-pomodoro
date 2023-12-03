<script setup lang="ts">
defineProps<{ isRunning: boolean }>();
const emit = defineEmits(["onStartStop", "onReset"]);
</script>

<template>
  <div class="timer-control">
    <button
      id="start_stop"
      @click="emit('onStartStop')"
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
    <button id="reset" @click="emit('onReset')">
      <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
    </button>
  </div>
</template>

<style scoped></style>
