<script setup>
import { ref, computed } from "vue";
import { useFloating, flip, offset, shift, autoUpdate } from "@floating-ui/vue";
import wwTeleport from "./wwTeleport.vue"; // Add this import

const props = defineProps({
  content: { type: Object, required: true },
  uid: { type: String, required: true },
  wwFrontState: { type: Object, required: true },
  wwEditorState: { type: Object, required: true },
});

const referenceSrc = ref(null);
const floatingSrc = ref(null);
const isDropdownOpen = ref(false);

const reference = computed(() => referenceSrc.value?.componentRef?.$el);
const floating = computed(() => floatingSrc.value?.componentRef?.$el);

const { floatingStyles } = useFloating(reference, floating, {
  placement: "top-start",
  middleware: [flip({ padding: 16 }), offset(10), shift()],
  whileElementsMounted: autoUpdate,
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

import { watch } from "vue";
import { blockInteractions, unblockInteractions } from "./modal";

watch(isDropdownOpen, (newValue) => {
  if (newValue) {
    blockInteractions(floating.value, toggleDropdown);
  } else {
    unblockInteractions(floating.value, toggleDropdown);
  }
});
</script>

<template>
  <div>
    <wwElement
      ref="referenceSrc"
      v-bind="props.content.elementContent"
      @click="toggleDropdown"
    />

    <wwTeleport v-if="isDropdownOpen">
      <wwElement
        ref="floatingSrc"
        v-bind="props.content.elementTrigger"
        :style="floatingStyles"
      />
    </wwTeleport>
  </div>
</template>
