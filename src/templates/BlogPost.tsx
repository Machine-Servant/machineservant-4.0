import { graphql, HeadFC } from 'gatsby';
import React from 'react';
import { BlogPost } from '../components/blog-post';
import { CustomHead } from '../components/custom-head';

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostPage($id: String!, $relatedPosts: [String]!) {
    mdx(id: { eq: $id }) {
      id
      fields {
        timeToRead {
          minutes
        }
      }
      excerpt(pruneLength: 160)
      tableOfContents
      parent {
        ... on File {
          id
          relativeDirectory
        }
      }
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        fromNow: date(fromNow: true)
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        imageAlt
        imageCredits
        imageCreditsUrl
        socialImage: featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        title
        tags
      }
    }
    relatedPosts: allMdx(
      filter: { internal: { contentFilePath: { in: $relatedPosts } } }
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
            fromNow: date(fromNow: true)
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            imageAlt
            title
          }
        }
      }
    }
  }
`;

export const Head: HeadFC<Queries.BlogPostPageQuery, unknown> = ({ data }) => {
  const imgUrl =
    data.mdx?.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData
      .images.fallback?.src;

  return (
    <CustomHead
      title={data.mdx?.frontmatter?.title || ''}
      description={data.mdx?.excerpt || ''}
      image={imgUrl}
      article
    />
  );
};
