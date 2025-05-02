import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "Medical-API/medical-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "Medical-API/retrieve-doctors",
          label: "Retrieve Doctors",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Medical-API/retrieve-specialties",
          label: "Retrieve Specialties",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
