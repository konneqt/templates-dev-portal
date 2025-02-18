// src/utils/createDocPlugin.js

export function create_doc_plugin({
  sidebarPath = require.resolve('../../sidebars-default.ts'),
  ...options
}) {
  return [
    '@docusaurus/plugin-content-docs',
    {
      ...defaultSettings,
      sidebarPath,
      ...options,
    },
  ];
}
