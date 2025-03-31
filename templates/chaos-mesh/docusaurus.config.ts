
import { themes as prismThemes } from 'prism-react-renderer'
import { getOpenApiPlugins } from './openApiPlugins'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Quantum API Dev Portal',
  tagline: 'A Powerful Documentation Plataform',
  favicon: '/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://konneqti.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/quantum-dev-portal/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'konneqt', // Usually your GitHub org/user name.
  projectName: 'konneqt.io', // Usually your repo name.

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
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
    ...getOpenApiPlugins()
  ],
}

export default config
