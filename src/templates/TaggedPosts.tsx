import { graphql, HeadFC } from 'gatsby';
import React from 'react';
import { BlogList } from '../components/blog-list';
import { CustomHead } from '../components/custom-head';

export default BlogList;

export const pageQuery = graphql`
  query TaggedPosts($tag: String) {
    posts: allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, published: { eq: true } } }
    ) {
      totalCount
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
