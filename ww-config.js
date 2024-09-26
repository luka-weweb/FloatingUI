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
  },
};
