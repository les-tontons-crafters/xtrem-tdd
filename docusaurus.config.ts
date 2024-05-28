import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import templates from './src/templates';

const config: Config = {
  title: 'Xtrem T.D.D',
  tagline: 'Your personal craft mentor',
  favicon: 'icon.ico',

  // Set the production url of your site here
  url: 'https://xtrem-tdd.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: './content',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-MEDGE7N79Z',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content: `agile, software, developer, software craftmanship, craft, xtrem-tdd, Xtrem T.D.D, 
          tdd, bdd, ddd, architectur, design, practices, refactoring, testing`,
      },
    ],
    image: 'images/xtrem-tdd.webp',
    navbar: {
      title: 'Xtrem T.D.D',
      logo: {
        alt: 'Xtrem T.D.D Logo',
        src: 'icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'topicSidebar',
          position: 'left',
          label: 'Categories',
        },
        {
          type: 'html',
          position: 'right',
          value: templates.github,
        },
      ],
    },
    footer: {
      copyright: templates.copyright,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['csharp', 'java'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    'docusaurus-lunr-search',
    [
      'docusaurus-graph',
      {
        path: 'content',
      },
    ],
  ],
};

export default config;
