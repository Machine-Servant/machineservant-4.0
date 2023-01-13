import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery<{
    site: { siteMetadata: Queries.SiteSiteMetadata };
  }>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          contact
          image
          author
          phone
          social {
            facebook
            linkedIn
            instagram
            github
          }
          navigation {
            name
            path
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
