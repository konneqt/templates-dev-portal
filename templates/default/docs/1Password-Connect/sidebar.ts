import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "1Password-Connect/1-password-connect",
    },
    {
      type: "category",
      label: "Items",
      link: {
        type: "doc",
        id: "1Password-Connect/items",
      },
      items: [
        {
          type: "doc",
          id: "1Password-Connect/get-vault-items",
          label: "Get all items for inside a Vault",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "1Password-Connect/create-vault-item",
          label: "Create a new Item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "1Password-Connect/delete-vault-item",
          label: "Delete an Item",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "1Password-Connect/get-vault-item-by-id",
          label: "Get the details of an Item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "1Password-Connect/patch-vault-item",
          label: "Update a subset of Item attributes",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "1Password-Connect/update-vault-item",
          label: "Update an Item",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Vaults",
      link: {
        type: "doc",
        id: "1Password-Connect/vaults",
      },
      items: [
        {
          type: "doc",
          id: "1Password-Connect/get-vaults",
          label: "Get all Vaults",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "1Password-Connect/get-vault-by-id",
          label: "Get Vault details and metadata",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Activity",
      link: {
        type: "doc",
        id: "1Password-Connect/activity",
      },
      items: [
        {
          type: "doc",
          id: "1Password-Connect/get-api-activity",
          label: "Retrieve a list of API Requests that have been made.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Health",
      items: [
        {
          type: "doc",
          id: "1Password-Connect/get-server-health",
          label: "Get state of the server and its dependencies.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "1Password-Connect/get-heartbeat",
          label: "Ping the server for liveness",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Metrics",
      items: [
        {
          type: "doc",
          id: "1Password-Connect/get-prometheus-metrics",
          label: "Query server for exposed Prometheus metrics",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Files",
      items: [
        {
          type: "doc",
          id: "1Password-Connect/get-item-files",
          label: "Get all the files inside an Item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "1Password-Connect/get-details-of-file-by-id",
          label: "Get the details of a File",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "1Password-Connect/download-file-by-id",
          label: "Get the content of a File",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "1Password-Connect/schemas/apirequest",
          label: "APIRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/field",
          label: "Field",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/file",
          label: "File",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/fullitem",
          label: "FullItem",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/generatorrecipe",
          label: "GeneratorRecipe",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/item",
          label: "Item",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/patch",
          label: "Patch",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/servicedependency",
          label: "ServiceDependency",
          className: "schema",
        },
        {
          type: "doc",
          id: "1Password-Connect/schemas/vault",
          label: "Vault",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
