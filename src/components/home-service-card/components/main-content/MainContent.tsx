import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { ColorOptions } from '../../../../types';

interface MainContentProps {
  highlightColor?: ColorOptions;
  to: string;
}

const BaseMainContent: React.FC<PropsWithChildren<MainContentProps>> = ({
  children,
  highlightColor,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={twMerge(
        'mb-4 transition-colors duration-300 lg:mb-0 lg:flex lg:flex-col',
        highlightColor === 'green' && 'hover:bg-lima-500',
        highlightColor === 'gold' && 'hover:bg-copper-500',
        highlightColor === 'purple' && 'hover:bg-purple-heart-500',
        (highlightColor === 'blue' || highlightColor === undefined) &&
          'hover:bg-lochmara-500'
      )}
    >
      {children}
    </Link>
  );
};

export const MainContent = styled(BaseMainContent)`
  @media only screen and (min-width: 1024px) {
    width: 24%;
  }
`;
