// export const TextSection = styled.div`
//   ${tw`border border-t-4 border-b-4 border-l-0 border-r-0`};
//   ${(props: { highlightColor: ColorOptions }) => {
//     switch (props.highlightColor) {
//       case 'green':
//         return tw`border-lima-500`;
//       case 'gold':
//         return tw`border-copper-500`;
//       case 'purple':
//         return tw`border-purple-heart-500`;
//       default:
//         return tw`border-lochmara-500`;
//     }
//   }}
// `;

import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { ColorOptions } from '../../../../types';

interface TextSectionProps {
  highlightColor?: ColorOptions;
}

export const TextSection: React.FC<PropsWithChildren<TextSectionProps>> = ({
  children,
  highlightColor,
}) => {
  return (
    <div
      className={twMerge(
        'flex-1 justify-between bg-gray-200 text-center',
        'border border-t-4 border-b-4 border-l-0 border-r-0',
        highlightColor === 'green' && 'border-lima-500',
        highlightColor === 'gold' && 'border-copper-500',
        highlightColor === 'purple' && 'border-purple-heart-500',
        (highlightColor === 'blue' || highlightColor === undefined) &&
          'border-lochmara-500'
      )}
    >
      {children}
    </div>
  );
};
