import { graphql, HeadFC } from 'gatsby';
import React from 'react';
import { BlogList } from '../components/blog-list';
import { CustomHead } from '../components/custom-head';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { TaggedPostsContext } from '../types';

export default BlogList;

export const pageQuery = graphql`
  query TaggedPosts($tag: String) {
    posts: allMdx(
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
        }
      }
    }
    blogPageImage: file(relativePath: { eq: "blog.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export const Head: HeadFC<Queries.TaggedPostsQuery, TaggedPostsContext> = ({
  pageContext,
}) => {
  const { title } = useSiteMetadata();
  return (
    <CustomHead
      title={`Blogs tagged "${pageContext.tag}" | ${title}`}
      description="We're big tech nerds at MachineServant and we think about this kind of stuff all day. Sometimes we think cool things then we write about them."
      noindex
    />
  );
};
