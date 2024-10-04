export default {
  position: {
    label: {
      en: "Position",
    },
    type: "TextSelect",
    defaultValue: "bottom",
    options: {
      options: [
        { value: "top", label: { en: "Top" } },
        { value: "right", label: { en: "Right" } },
        { value: "bottom", label: { en: "Bottom" } },
        { value: "left", label: { en: "Left" } },
      ],
    },
  },
  alignment: {
    label: { en: "Align" },
    type: "TextRadioGroup",
    options: {
      choices: [
        { value: "start", label: "Start" },
        { value: "center", label: "Center" },
        { value: "end", label: "End" },
      ],
    },
    defaultValue: "start",
    classes: true,
    states: true,
  },
  offsetX: {
    type: "Length",
    label: {
      en: "Offset (X)",
    },
    bindable: true,
    options: {
      unitChoices: [
        { value: "px", label: "px", min: 1, max: 1000 },
        { value: "%", label: "%", min: 1, max: 100 },
      ],
      noRange: true,
      useVar: true,
    },
    bindingValidation: {
      type: "string",
      tooltip: "A string that defines size of offset in px or %",
    },
  },
  offsetY: {
    type: "Length",
    label: {
      en: "Offset (Y)",
    },
    bindable: true,
    options: {
      unitChoices: [
        { value: "px", label: "px", min: 1, max: 1000 },
        { value: "%", label: "%", min: 1, max: 100 },
      ],
      noRange: true,
      useVar: true,
    },
    bindingValidation: {
      type: "string",
      tooltip: "A string that defines size of offset in px or %",
    },
  },
  avoidCollisions: {
    type: "OnOff",
    label: {
      en: "Avoid Collisions",
    },
    bindable: true,
    /* wwEditor:start */
    bindingValidation: {
      type: "boolean",
      tooltip: "Avoid collisions with other elements",
    },
  },
  collisionOffset: {
    type: "Length",
    label: {
      en: "Collision Offset",
    },
    bindable: true,
    options: {
      unitChoices: [
        { value: "px", label: "px", min: 1, max: 1000 },
        { value: "%", label: "%", min: 1, max: 100 },
      ],
      noRange: true,
      useVar: true,
    },
    bindingValidation: {
      type: "string",
      tooltip: "A string that defines size of collision offset in px or %",
    },
  },
};
