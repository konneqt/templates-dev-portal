import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import { EnumChangefreq } from 'sitemap';
import { getOpenApiPlugins } from './openApiPlugins';

const a11yEmoji = require('@fec/remark-a11y-emoji');

const config: Config = {
  title: 'Quantum API Dev Portal',
  url: 'https://konneqt.io',
  baseUrl: '/quantum-dev-portal',
  favicon: 'img/favicon.ico',
  // Used for publishing to GitHub Pages
  organizationName: 'konneqt',
  projectName: 'documentation',
  // Has to be set even if not using translations
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  markdown: {
    mermaid: true,
    format: 'detect',
  },

  themes: ['@docusaurus/theme-mermaid', 'docusaurus-theme-openapi-docs'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editLocalizedFiles: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: EnumChangefreq.WEEKLY,
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Quantum API Dev Portal',
      logo: {
        alt: 'Konneqt Logo',
        src: 'img/just_q_blue.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ApiSidebar',
          position: 'left',
          label: 'Introduction',
        },
        {
          label: 'Quantum Dev Portal',
          to: '/quantum-dev-portal/docs/apis',
        },
        {
          href: 'https://github.com/konneqt/quantum-dev-portal',
          label: 'GitHub',
          position: 'right',
        },
      ],
      hideOnScroll: false,
    },
    footer: {
     
      copyright: `<span class="copyright_text">Copyright © ${new Date().getFullYear()} https://konneqt.io`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      defaultLanguage: 'bash',
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    metadata: [
      {
        name: 'keywords',
        content: 'Homarr, Dashboard, Selfhosted, Hosting, Modules, Open-Source',
      },
    ],
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        margin: 80,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    ...getOpenApiPlugins()
  ],
};

export default config;
