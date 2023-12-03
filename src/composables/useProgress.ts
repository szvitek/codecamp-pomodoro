import { Ref, computed, ref, watch } from "vue";

type useProgressProps = {
  newMax?: number;
  newRemaining?: number;
};

export function useProgress({
  newMax = 100,
  newRemaining = 0,
}: useProgressProps) {
  const max = ref(newMax);
  const remaining = ref(newRemaining);

  const progress = computed(() => {
    return Math.floor(100 - (remaining.value / max.value) * 100);
  });

  const color = computed(() =>
    progress.value <= 50
      ? `hsl(50,100%, ${100 - Math.floor(progress.value)}%)`
      : `hsl(${50 - Math.floor(progress.value / 2)},100%,50%)`,
  );

  return {
    progress,
    color,
    max,
    remaining,
  };
}
