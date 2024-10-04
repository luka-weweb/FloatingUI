import dropdownOptions from "./src/dropdownOptions";

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
        type: "b94af123-0a1f-4110-bbfc-6caaad3e5a19",
      },
    },
    ...dropdownOptions,
  },
};
