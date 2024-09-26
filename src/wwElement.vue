<template>
  <div>
    <wwElement
      v-bind="this.content.elementTrigger"
      @click="dialogOpen = !dialogOpen"
    />
    <wwElement
      v-bind="this.content.elementContent"
      :type="this.content.type"
      :styleSettings="this.styleSettings"
      :teleport="this.content.teleport"
      :open="this.isDialogOpen"
      style="pointer-events: auto"
      @keyup.escape="
        this.content.escapeCloses ? (this.dialogOpen = false) : null
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
    wwFrontState: { type: Object, required: true },
    wwEditorState: { type: Object, required: true },
  },
  data() {
    return {
      dialogOpen: false,
    };
  },
  computed: {
    isDialogOpen() {
      if (this.content.manualControl) {
        return this.content.value;
      } else {
        return this.dialogOpen;
      }
    },
  },
  watch: {
    isDialogOpen(newValue) {
      if (newValue) {
        const frontDocument = wwLib.getFrontDocument();
        const appEl = frontDocument.querySelector("body");
        if (appEl) {
          // appEl.style.pointerEvents = "none";
        }
      } else {
        // appEl.style.pointerEvents = "auto";
      }
    },
  },
};
</script>
