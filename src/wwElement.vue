<script setup>
import { ref, computed } from "vue";
import { useFloating, flip, offset, shift, autoUpdate } from "@floating-ui/vue";

const props = defineProps({
  content: { type: Object, required: true },
  uid: { type: String, required: true },
  wwFrontState: { type: Object, required: true },
  wwEditorState: { type: Object, required: true },
});

const referenceSrc = ref(null);
const floatingSrc = ref(null);

const reference = computed(() => referenceSrc.value?.componentRef?.$el);
const floating = computed(() => floatingSrc.value?.componentRef?.$el);

const { floatingStyles } = useFloating(reference, floating, {
  placement: "top-start",
  middleware: [flip({ padding: 16 }), offset(10), shift()],
  whileElementsMounted: autoUpdate,
});
</script>

<template>
  <div>
    <wwElement ref="referenceSrc" v-bind="props.content.elementContent" />

    <wwElement
      ref="floatingSrc"
      v-bind="props.content.elementTrigger"
      :style="floatingStyles"
    />
  </div>
</template>
