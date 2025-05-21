
import { themes as prismThemes } from 'prism-react-renderer'
import { getOpenApiPlugins } from './openApiPlugins'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Quantum API Dev Portal',
  tagline: 'A Powerful Documentation Plataform',
  favicon: '/img/favicon.ico',
  url: 'https://konneqti.io',
  baseUrl: '/quantum-dev-portal/',
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
    image: "img/just_q_blue.png",
    navbar: {
      hideOnScroll: true,
      title: 'Quantum API Dev Portal',
      logo: {
        alt: 'Quantum Dev Portal',
        src: 'img/logos/just_q_blue.png',
        srcDark: 'img/logos/just_q_blue.png',
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
          to: '/quantum-dev-portal/docs/apis',
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
  themes:['docusaurus-theme-openapi-docs'],

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
