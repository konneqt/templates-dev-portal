
import { themes as prismThemes } from 'prism-react-renderer'
import { getOpenApiPlugins } from './openApiPlugins'
import stylesConfig from './styles.config.json';
import searchLocal from "@easyops-cn/docusaurus-search-local";


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Quantum API Dev Portal',
  tagline: 'A Powerful Documentation Plataform',
  favicon: '/img/favicon.ico',
  url: 'https://konneqt.io',
  baseUrl: '/',
  organizationName: 'konneqt', 
  projectName: 'konneqt.io', 

  onBrokenLinks: 'warn',
  trailingSlash: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      zh: {
        label: '简体中文',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-T31S4LR9LL',
        },
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem',
          editLocalizedFiles: true,
        },
        theme: {
          customCss: './src/styles/custom.css',
        },
      }),
    ],
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: stylesConfig.logoUrl,
    navbar: {
      hideOnScroll: true,
      title: stylesConfig.companyName,
      logo: {
        alt: 'Quantum Dev Portal',
        src: stylesConfig.logoUrl,
        srcDark: stylesConfig.logoUrlDark,
      },
      items: [
     /*    {
          type: 'docSidebar',
          sidebarId: 'ApiSidebar',
          position: 'left',
          label: 'Introduction',
        }, */
        {
          label: 'Documentation',
          to: '/docs/apis',
        },
        {
          href: 'https://github.com/konneqt/quantum-dev-portal',
          label: 'GitHub',
          position: 'right',
        },
      ], 
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} https://konneqt.io`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: {
        plain: prismThemes.vsDark.plain,
        styles: [
          ...prismThemes.vsDark.styles,
          {
            types: ['function', 'keyword'],
            style: {
              color: '#6379f2',
            },
          },
        ],
      },
      additionalLanguages: ['bash'],
    },
  },
  themes:['docusaurus-theme-openapi-docs',  [
    searchLocal,
    {
      hashed: true,
      indexDocs: true,
      indexBlog: false,
      indexPages: false,
      language: ["en"],
      docsRouteBasePath: "/docs", 
      searchResultLimits: 8,
      searchResultContextMaxLength: 50,
      explicitSearchResultPath: true,
      searchBarShortcut: true,
      searchBarShortcutHint: true,
      highlightSearchTermsOnTargetPage: true,
    }
  ]],

  plugins: [
    ...getOpenApiPlugins(),
    function (context, options) {
      return {
        name: "custom-webpack-config",
        configureWebpack(config, isServer, utils) {
          return {
            module: {
              rules: [
                {
                  test: /\.(yaml|yml)$/,
                  use: "yaml-loader",
                },
              ],
            },
          };
        },
      };
    },
  ],
}

export default config
