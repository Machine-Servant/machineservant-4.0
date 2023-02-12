import { graphql, HeadFC } from 'gatsby';
import React, { useMemo } from 'react';
import { BlogList } from '../components/blog-list';
import { CustomHead } from '../components/custom-head';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { BlogPageContext } from '../types';

export default BlogList;

export const query = graphql`
  query BlogPaginated($skip: Int!, $limit: Int!) {
    posts: allMdx(
      limit: $limit
      skip: $skip
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
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
    tagsGroup: allMdx(
      limit: 2000
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    blogPageImage: file(relativePath: { eq: "blog.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    localSearchPosts {
      index
      store
    }
  }
`;

export const Head: HeadFC<Queries.BlogPaginatedQuery, BlogPageContext> = ({
  pageContext,
}) => {
  const { title } = useSiteMetadata();

  const pageTitle = useMemo(() => {
    const { currentPage } = pageContext;
    if (currentPage === 1) {
      return `Blog | ${title}`;
    }
    return `Blog page ${currentPage} | ${title}`;
  }, [pageContext, title]);

  return (
    <CustomHead
      title={pageTitle}
      description="Ideas, discoveries, and technical musings from machineservant.com"
      noindex={pageContext.currentPage !== 1}
    />
  );
};
