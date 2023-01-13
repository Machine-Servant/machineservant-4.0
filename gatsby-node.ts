import { CreateNodeArgs, CreatePagesArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { kebabCase } from 'lodash';
import path from 'path';

exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
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

  const result = await graphql<Queries.GatsbyNodeQuery>(`
    query GatsbyNode {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          id
          fields {
            slug
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

  const posts = result.data?.allMarkdownRemark?.nodes || [];
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
    reporter.log(`Created blog page ${paginatedPath}`);
  });

  result.data?.allMarkdownRemark.group.forEach((tag) => {
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
