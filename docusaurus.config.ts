import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'XTrem TDD',
  tagline: 'Your personal craft mentor',
  favicon: 'icon.ico',

  // Set the production url of your site here
  url: 'https://arsero.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/xtrem-tdd/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Arsero', // Usually your GitHub org/user name.
  projectName: 'xtrem-tdd', // Usually your repo name.

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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'images/xtrem-tdd.webp',
    navbar: {
      title: 'XTrem TDD',
      logo: {
        alt: 'XTrem TDD Logo',
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
          href: 'https://github.com/les-tontons-crafters/xtrem-tdd',
          position: 'right',
          html: `<i class="fab fa-github fa-xl" alt="Github" />`,
        },
      ],
    },
    footer: {
      copyright: `
                Copyright © ${new Date().getFullYear()} XTrem TDD, Les Tontons Crafters 
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
                    <img style="margin-bottom: 0;margin-left: 1rem;vertical-align: middle;" 
                      src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" alt="cc-by-sa-4.0" />
                  </a>
              `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: ['docusaurus-lunr-search'],
};

export default config;
