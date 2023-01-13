import { graphql, HeadFC } from 'gatsby';
import React from 'react';
import { BlogList } from '../components/blog-list';
import { CustomHead } from '../components/custom-head';

export default BlogList;

export const query = graphql`
  query BlogPaginated($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
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
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            title
            tags
          }
          timeToRead
        }
      }
    }
    tagsGroup: allMarkdownRemark(
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
  }
`;

export const Head: HeadFC = () => {
  return (
    <CustomHead
      title="Blog"
      description="Ideas, discoveries, and technical musings from machineservant.com"
    />
  );
};
