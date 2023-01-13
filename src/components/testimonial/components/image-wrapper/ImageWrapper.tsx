import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ImageWrapperProps {
  imageOrientation: 'left' | 'right';
}

export const ImageWrapper: React.FC<PropsWithChildren<ImageWrapperProps>> = ({
  children,
  imageOrientation,
}) => {
  return (
    <div
      className={twMerge(
        'mx-auto mb-8 sm:mb-0',
        'max-h-[212px] min-h-[212px] min-w-[212px] max-w-[212px]',
        imageOrientation === 'left' ? 'sm:mr-8' : 'sm:ml-8'
      )}
    >
      {children}
    </div>
  );
};
