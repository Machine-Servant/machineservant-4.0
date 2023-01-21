import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

export const HeaderImage = styled(GatsbyImage, {
  shouldForwardProp: (prop) => prop !== 'isLargeImage',
})`
  height: 200px;

  @media only screen and (min-width: 640px) {
    height: ${(props: { isLargeImage: boolean }) =>
      props.isLargeImage ? '500px' : '300px'};
  }
`;
