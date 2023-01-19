import styled from '@emotion/styled';
import tw from 'twin.macro';

export const UL = styled.ul`
  ${tw`pl-5 mb-8 list-none`}
`;

export const LI = styled.li`
  ${tw`mb-0`}
  > ul {
    ${tw`mb-0`}
  }
`;

export const Anchor = styled.a`
  ${tw``}
`;
