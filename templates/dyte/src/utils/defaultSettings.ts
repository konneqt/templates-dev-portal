// src/utils/defaultSettings.js
const defaultSettings = {
  breadcrumbs: true,
  editUrl: 'https://github.com/dyte-io/docs/tree/main/',
  showLastUpdateTime: true,
  sidebarCollapsible: true,
  remarkPlugins: [
    [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
  ],
  sidebarPath: require.resolve('./sidebars-default.ts'),
};

module.exports = {
  defaultSettings,
};
