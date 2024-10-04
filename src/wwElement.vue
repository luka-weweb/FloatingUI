<script setup>
import { ref, computed, nextTick } from "vue";
import { useFloating, flip, offset, shift, autoUpdate } from "@floating-ui/vue";
import wwTeleport from "./wwTeleport.vue";
import { useModalBlocking } from "./modal";

const props = defineProps({
  content: { type: Object, required: true },
  uid: { type: String, required: true },
  wwFrontState: { type: Object, required: true },
  wwEditorState: { type: Object, required: true },
});

const referenceSrc = ref(null);
const floatingSrc = ref(null);
const isDropdownOpen = ref(false);
const isDropdownVisible = ref(false);

const reference = computed(() => referenceSrc.value?.componentRef?.$el);
const floating = computed(() => floatingSrc.value?.componentRef?.$el);

const { floatingStyles } = useFloating(reference, floating, {
  placement: computed(() => {
    const position = props.content.position;
    const alignment = props.content.alignment;
    return alignment === "center" ? position : `${position}-${alignment}`;
  }),
  middleware: computed(() => [
    ...(props.content.avoidCollisions
      ? [flip({ padding: props.content.collisionOffset }), shift()]
      : []),
    offset(props.content.offsetX, props.content.offsetY),
  ]),
  whileElementsMounted: autoUpdate,
});

const isEditMode = computed(() => {
  return (
    props.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
  );
});

function handleClick() {
  if (!isEditMode.value) {
    toggleDropdown();
  }
}

function handleOverlayClick() {
  if (!isEditMode.value) {
    isDropdownOpen.value = false;
  }
}

async function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    await nextTick();
    isDropdownVisible.value = true;
  } else {
    await nextTick();
    isDropdownVisible.value = false;
  }
}

useModalBlocking(isDropdownOpen, floating, handleOverlayClick);
</script>

<template>
  <div>
    <wwElement
      ref="referenceSrc"
      v-bind="props.content.elementContent"
      @click="handleClick"
    />

    <Transition name="fade">
      <div v-show="isDropdownOpen" class="dropdown-content"></div>
    </Transition>

    <wwTeleport v-if="isDropdownOpen">
      <wwElement
        ref="floatingSrc"
        v-bind="props.content.elementTrigger"
        :style="floatingStyles"
      />
    </wwTeleport>
  </div>
</template>

<style scoped>
.dropdown-content {
  width: 100px;
  height: 100px;
  background-color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
