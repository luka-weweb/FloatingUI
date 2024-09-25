export default {
  editor: {
    label: {
      en: "DialogRoot",
    },
    icon: "view-grid",
  },
  properties: {
    elementTrigger: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: "63912cf2-b4fe-4cf8-aa7e-e6f29bf4157f",
      },
    },
    elementOverlay: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: "7572eedc-3d73-43e1-8d16-bf977b0c8e05",
      },
    },
    elementContent: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: "3049f8aa-e796-4a28-aafd-a282baab589e",
      },
    },
    type: {
      label: {
        en: "Type",
      },
      type: "TextSelect",
      defaultValue: "dialog",
      options: {
        options: [
          { value: "dialog", label: { en: "Dialog" } },
          { value: "modal", label: { en: "Modal" } },
          { value: "sheet", label: { en: "Sheet" } },
          { value: "drawer", label: { en: "Drawer" } },
          { value: "alert", label: { en: "Alert" } },
        ],
      },
    },
    sheetSide: {
      label: {
        en: "Side",
      },
      type: "TextSelect",
      defaultValue: "dialog",
      options: {
        options: [
          { value: "top", label: { en: "Top" } },
          { value: "right", label: { en: "Right" } },
          { value: "bottom", label: { en: "Bottom" } },
          { value: "left", label: { en: "Left" } },
        ],
      },
      hidden: (content) => {
        return content.type !== "sheet";
      },
    },
    modalAlignment: {
      label: {
        en: "Align",
      },
      type: "TextSelect",
      defaultValue: "dialog",
      options: {
        options: [
          { value: "top", label: { en: "Top" } },
          { value: "center", label: { en: "Center" } },
          { value: "bottom", label: { en: "Bottom" } },
        ],
      },
      hidden: (content) => {
        return content.type !== "modal";
      },
    },
    modalSide: {
      label: {
        en: "Side",
      },
      type: "TextSelect",
      defaultValue: "dialog",
      options: {
        options: [
          {
            value: "left",
            label: { en: "Left" },
          },
          {
            value: "center",
            label: { en: "Center" },
          },
          { value: "right", label: { en: "Right" } },
        ],
      },
      hidden: (content) => {
        return content.type !== "modal";
      },
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

    manualControl: {
      label: {
        en: "Manual control",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    value: {
      label: {
        en: "Value",
      },
      hidden: (content) => {
        return !content.manualControl;
      },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    trigger: {
      label: {
        en: "Trigger",
      },
      hidden: (content) => {
        return content.manualControl;
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    overlay: {
      label: {
        en: "Overlay",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    escapeClose: {
      label: {
        en: "ESC closes",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
  },
};
