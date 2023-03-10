import styled from '@emotion/styled';
import React from 'react';
import tw from 'twin.macro';
import PrismSyntaxHighlight from '../prism-syntax-highlight/PrismSyntaxHighlight';

export const MainContent = styled.article`
  ${tw`max-w-4xl px-4 py-12 mx-auto my-12 text-black lg:border lg:border-gray-200 lg:p-12`};
  &&& {
    .gatsby-resp-image-wrapper {
      ${tw`w-full mb-8`};
      max-width: 100% !important;
      margin-left: 0 !important;
      margin-right: 0 !important;

      img {
        object-fit: cover;
      }
    }

    code.language-text {
      ${tw`px-2 inline-block`};
    }

    .highlight-line {
      ${tw`bg-gray-600`}
    }

    .table-of-contents {
      ${tw`pb-8`}

      > ul {
        ${tw`p-0`}
      }

      a {
        ${tw`text-black no-underline text-sm`}
      }

      li {
        ${tw`mb-0`}

        > p {
          ${tw`text-sm mb-0`}
        }
      }

      ul {
        ${tw`list-none mb-0`}
      }
    }

    delete {
      ${tw`text-lg line-through`}
    }

    strong {
      ${tw`font-semibold`}
    }
  }
`;

export const H1 = styled.h1`
  ${tw`mb-8 text-3xl font-medium uppercase`};
`;

export const H2 = styled.h2`
  ${tw`mb-8 text-2xl font-medium`}
`;

export const H3 = styled.h3`
  ${tw`mb-8 text-xl font-medium`};
`;

export const H4 = styled.h4`
  ${tw`mb-4 uppercase text-sm font-bold`}
`;

export const H5 = styled.h5`
  ${tw`font-bold text-sm`}
`;

export const H6 = styled.h6``;

export const Paragraph = styled.p`
  ${tw`mb-8 text-lg leading-relaxed`};
`;

export const Blockquote = styled.blockquote`
  ${tw`pl-4 text-gray-700 border-l-2 border-lochmara-500`}
`;

export const Pre = styled.pre`
  &&& {
    ${tw`px-12 py-4 mb-8 -mx-4 sm:mx-0 overflow-x-scroll text-white`};
    ${tw`bg-gray-800`}
    ${tw`px-4 border-l-4 border-amber-500`}
  }
`;

export const Code: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) =>
  className ? (
    <PrismSyntaxHighlight className={className}>
      {children as string}
    </PrismSyntaxHighlight>
  ) : (
    <code>{children}</code>
  );

export const UnorderedList = styled.ul`
  ${tw`pl-5 mb-8 list-disc`}

  > li {
    ${tw`mb-4`}
  }
`;

export const OrderedList = styled.ol`
  ${tw`pl-5 mb-8 list-decimal`}

  > li {
    ${tw`mb-4`}
  }
`;

export const ListElement = styled.li`
  ${tw`text-lg`}
  > p {
    ${tw`mb-0`};
  }
  > blockquote {
    ${tw`mt-4`}
  }
`;

export const Anchor = styled.a`
  ${tw`underline text-lochmara-500`};
`;

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  pre: Pre,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListElement,
  a: Anchor,
  blockquote: Blockquote,
  code: Code,
};
