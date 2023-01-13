import { graphql, useStaticQuery } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

type AvatarProps = {
  [name: string]: IGatsbyImageData | undefined;
};

export enum AvatarNames {
  EVAN_STERN = 'Evan Stern',
}

export const useAvatar = (): AvatarProps => {
  const { evan } = useStaticQuery<Queries.AvatarQuery>(graphql`
    query Avatar {
      evan: file(relativePath: { eq: "evan-avatar.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 30, width: 30)
        }
      }
    }
  `);

  if (!evan?.childImageSharp?.gatsbyImageData) {
    throw Error('GraphQL query returned empty results');
  }

  return {
    [AvatarNames.EVAN_STERN]: getImage(evan.childImageSharp.gatsbyImageData),
  };
};
