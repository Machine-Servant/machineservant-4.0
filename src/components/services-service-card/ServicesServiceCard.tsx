import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { ColorOptions } from '../../types';

interface ServicesServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  image?: IGatsbyImageData | null;
  imageAlt: string;
  orientation: 'left' | 'right';
  highlightColor: ColorOptions;
}

export const ServicesServiceCard: React.FC<
  PropsWithChildren<ServicesServiceCardProps>
> = ({ title, image, imageAlt, orientation, highlightColor, children }) => {
  return (
    <div className="mx-auto mb-8 flex max-w-5xl flex-col sm:flex-row md:h-auto lg:h-96">
      {image && orientation === 'left' && (
        <GatsbyImage className="w-full sm:w-3/5" image={image} alt={imageAlt} />
      )}
      <div
        className={twMerge(
          'w-full bg-gray-100 px-6 py-12 sm:w-2/5',
          'border border-t-0 border-b-0',
          orientation === 'left'
            ? 'border-l-0 border-r-4'
            : 'border-r-0 border-l-4',
          highlightColor === 'green' && 'border-lima-500',
          highlightColor === 'blue' && 'border-lochmara-500',
          highlightColor === 'gold' && 'border-copper-500',
          (highlightColor === undefined || highlightColor === 'purple') &&
            'border-purple-heart-500'
        )}
      >
        <h2 className="mb-12 text-3xl font-medium uppercase">{title}</h2>
        <p className="text-lg leading-relaxed">{children}</p>
      </div>
      {image && orientation === 'right' && (
        <GatsbyImage className="w-full sm:w-3/5" image={image} alt={imageAlt} />
      )}
    </div>
  );
};
