import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'MachineServant',
    description:
      'MachineServant is here to help build your online solution. With decades of experience building websites and applications, let us bring your vision to reality.',
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
    {
      resolve: 'gatsby-plugin-advanced-sitemap',
      options: {
        exclude: [
          '/form-success',
          '/404',
          '404.html',
          /tag\/.+/,
          /blog\/[0-9]+\//,
        ],
      },
    },
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
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
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'posts',
        engine: 'flexsearch',
        query: `
          {
            allMdx(filter: { frontmatter: { published: { eq: true } } }) {
              nodes {
                id
                body
                excerpt(pruneLength: 160)
                fields {
                  timeToRead {
                    minutes
                  }
                }
                parent {
                  ... on File {
                    id
                    relativeDirectory
                  }
                }
                frontmatter {
                  author
                  date(formatString: "MMMM DD, YYYY")
                  featuredImage {
                    childImageSharp {
                      gatsbyImageData(layout: FULL_WIDTH)
                    }
                  }
                  title
                  tags
                }
              }
            }
          }
        `,
        index: ['title', 'tags', 'body'],
        store: ['id', 'parent', 'fields', 'frontmatter', 'parent', 'excerpt'],
        normalizer: ({ data }: any) => {
          return data.allMdx.nodes.map((node: any) => ({
            id: node.id,
            parent: node.parent,
            fields: node.fields,
            frontmatter: node.frontmatter,
            excerpt: node.excerpt,
            body: node.body,
            title: node.frontmatter.title,
            tags: node.frontmatter.tags,
          }));
        },
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            output: '/rss.xml',
            title: 'MachineServant Blog RSS Feed',
            match: '^/blog/',
            serialize: ({ query: { site, allMdx } }: { query: any }) => {
              return allMdx.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/blog/${node.parent.relativeDirectory}`,
                  guid: `${site.siteMetadata.siteUrl}/blog/${node.parent.relativeDirectory}`,
                  enclosure: node.frontmatter.featuredImage?.childImageSharp
                    ?.gatsbyImageData
                    ? {
                        url: `${site.siteMetadata.siteUrl}${node.frontmatter.featuredImage.childImageSharp.gatsbyImageData.images.fallback?.src}`,
                        type: 'image/jpeg',
                      }
                    : undefined,
                });
              });
            },
            query: `
              {
                allMdx(filter: { frontmatter: { published: { eq: true } } }, sort: { frontmatter: { date: DESC }}) {
                  nodes {
                    id
                    excerpt(pruneLength: 160)
                    parent {
                      ... on File {
                        id
                        relativeDirectory
                      }
                    }
                    frontmatter {
                      author
                      date(formatString: "MMMM DD, YYYY")
                      title
                      tags
                      featuredImage {
                        childImageSharp {
                          gatsbyImageData(layout: FULL_WIDTH)
                        }
                      }
                    }
                  }
                }
              } 
            `,
          },
        ],
      },
    },
  ],
};

export default config;
