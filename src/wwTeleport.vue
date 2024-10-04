<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  disabled: { type: Boolean, default: false },
});

const target = ref(null);
const isReady = ref(null);

function setupTeleport() {
  const frontDocument = wwLib.getFrontDocument();
  if (!frontDocument || typeof frontDocument.querySelector !== "function") {
    console.error("Invalid front document or missing querySelector method");

    target.value = null;
    isReady.value = false;
    return;
  }

  const appEl = frontDocument.querySelector("#app");
  if (!appEl) {
    console.error("Target element '#app' not found in front document");

    target.value = null;
    isReady.value = false;
    return;
  }

  target.value = appEl;
  isReady.value = true;
}

onMounted(() => {
  if (!props.disabled) {
    setupTeleport();
  }
});
</script>

<template>
  <Teleport :to="target" :disabled="props.disabled" v-if="isReady">
    <slot></slot>
  </Teleport>
</template>
