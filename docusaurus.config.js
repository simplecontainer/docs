// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'simplecontainer.io',
  tagline: 'Simplecontainer manager a.k.a smr. Standalone and cluster mode, GitOps, Secrets, Reconciliation, and YAML definitions for Docker. ',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.simplecontainer.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'simplecontainer', // Usually your GitHub org/user name.
  projectName: 'smr', // Usually your repo name.

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: false
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Simplecontainer',
        logo: {
          alt: 'simplecontainer.io',
          src: 'img/logo.png',
        },
        items: [
          // {
          //   type: 'docsVersionDropdown',
          // },
          {
            type: 'html',
            value: `<a href="https://www.example.com" style="display: flex; align-items: center;"><img src="https://img.shields.io/github/v/release/simplecontainer/smr" alt="My Image" style="width: auto;" /></a>`,
            position: 'right',
          },
          {
            href: 'https://github.com/simplecontainer/smr',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Installation',
                to: '/category/installation',
              },
              {
                label: 'Client',
                href: 'https://github.com/simplecontainer/client',
              },
              {
                label: 'Examples',
                href: 'https://github.com/simplecontainer/examples',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/QREJCprg',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://simplecontainer.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} simplecontainer.io`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
