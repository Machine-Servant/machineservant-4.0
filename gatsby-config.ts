import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'MachineServant',
    description: 'Let us bring your vision to reality',
    siteUrl: 'https://www.machineservant.com',
    contact: 'contact@machineservant.com',
    social: {
      linkedIn: 'https://www.linkedin.com/company/machineservant/',
      facebook: 'https://www.facebook.com/MachineServant/',
      instagram: 'https://www.instagram.com/machineservant/',
      github: 'https://github.com/machine-servant/',
    },
    image: 'images/logo.jpg',
    author: '@MachineServant',
    phone: '(330)-808-6557',
    navigation: [
      {
        name: 'Services',
        path: '/services',
      },
      {
        name: 'Contact',
        path: '/contact',
      },
      {
        name: 'Blog',
        path: '/blog',
      },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-148378802-1', 'G-C39WY2Y3KM'],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.machineservant.com',
        sitemap: 'https://www.machineservant.com/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo-small.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './src/content',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- end -->',
        plugins: [
          'gatsby-remark-images',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-table-of-contents',
            options: {
              exclude: 'Table of Contents',
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: 'table-of-contents',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '+>',
            },
          },
        ],
      },
    },
  ],
};

export default config;
