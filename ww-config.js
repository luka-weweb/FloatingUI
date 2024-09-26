export default {
  editor: {
    label: {
      en: "Dropdown",
    },
    icon: "view-grid",
  },
  properties: {
    elementTrigger: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: "3e52c1cd-ede7-4706-bd25-f7286a86ce86",
      },
    },
    elementContent: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: "3049f8aa-e796-4a28-aafd-a282baab589e",
      },
    },
    defaultValue: {
      label: {
        en: "Default",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    disabled: {
      label: {
        en: "Disabled",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    teleport: {
      label: {
        en: "Teleport",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    modal: {
      label: {
        en: "Modal",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    triggerType: {
      label: {
        en: "Trigger",
      },
      type: "TextSelect",
      defaultValue: "click",
      options: {
        options: [
          { value: "click", label: { en: "Click" } },
          { value: "hover", label: { en: "Hover" } },
          { value: "right-click", label: { en: "Right click" } },
        ],
      },
    },
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
      options: (content) => {
        if (content.position === "top" || content.position === "bottom") {
          return {
            choices: [
              {
                value: "start",
                title: { en: "Start" },
                icon: "align-left",
              },
              {
                value: "center",
                title: { en: "Center" },
                icon: "align-center",
              },
              { value: "end", title: { en: "End" }, icon: "align-right" },
            ],
          };
        } else {
          return {
            choices: [
              {
                value: "start",
                title: { en: "Start" },
                icon: "align-y-start",
              },
              {
                value: "center",
                title: { en: "Center" },
                icon: "align-y-center",
              },
              { value: "end", title: { en: "End" }, icon: "align-y-end" },
            ],
          };
        }
      },
      defaultValue: "start",
      classes: true,
      states: true,
    },
    offsetX: {
      type: "Length",
      label: {
        en: "Offset (x)",
        fr: "Taille",
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
        en: "Offset (y)",
        fr: "Taille",
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
  },
};
