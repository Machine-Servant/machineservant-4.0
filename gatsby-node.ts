import { CreateNodeArgs, CreatePagesArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { kebabCase } from 'lodash';
import path from 'path';
import readingTime from 'reading-time';

exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
    });
    createNodeField({
      name: 'timeToRead',
      node,
      value: readingTime(node.body as string),
    });
  }
};

exports.createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createRedirect, createPage } = actions;

  createRedirect({ fromPath: '/about', toPath: '/services' });
  createRedirect({
    fromPath: '/blog/2021-11-19-what-about-security',
    toPath: '/blog/2021-01-19-what-about-security',
  });

  const BlogPaginated = path.resolve('./src/templates/BlogPaginated.tsx');
  const TaggedPosts = path.resolve('./src/templates/TaggedPosts.tsx');
  const BlogPost = path.resolve('./src/templates/BlogPost.tsx');

  const result = await graphql<Queries.GatsbyNodeQuery>(`
    query GatsbyNode {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          id
          body
          fields {
            slug
          }
          frontmatter {
            relatedPosts
          }
          internal {
            contentFilePath
          }
        }
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      result.errors
    );
    return;
  }

  result.data?.allMdx.nodes.forEach((node) => {
    const relatedPosts =
      node.frontmatter?.relatedPosts?.map(
        (rp) => `${__dirname}/src/content/${rp}/index.mdx`
      ) || [];
    createPage({
      path: `/blog${node.fields?.slug}`,
      component: `${BlogPost}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        relatedPosts,
      },
    });
    reporter.log(`Created blog post: /blog${node.fields?.slug}`);
  });

  const posts = result.data?.allMdx?.nodes || [];
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);

  if (posts.length === 0) {
    reporter.warn('No posts found');
    createPage({
      path: '/blog',
      component: BlogPaginated,
      context: {
        limit: postsPerPage,
        skip: 0,
        numPages,
        currentPage: 1,
        totalCount: 0,
        paginated: false,
        renderTagList: false,
      },
    });
    return;
  }

  Array.from({ length: numPages }).forEach((_, i) => {
    const paginatedPath = i === 0 ? '/blog' : `/blog/${i + 1}`;
    createPage({
      path: paginatedPath,
      component: BlogPaginated,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        totalCount: posts.length,
        paginated: true,
        renderTagList: true,
      },
    });
    reporter.log(`Created blog paginated page: ${paginatedPath}`);
  });

  result.data?.allMdx.group.forEach((tag) => {
    if (!tag.fieldValue) return;

    const value = kebabCase(tag.fieldValue);
    const taggedPostPath = `/tag/${value}`;

    createPage({
      path: taggedPostPath,
      component: TaggedPosts,
      context: {
        tag: tag.fieldValue,
      },
    });

    reporter.log(`Created tagged posts page: ${taggedPostPath}`);
  });
};
