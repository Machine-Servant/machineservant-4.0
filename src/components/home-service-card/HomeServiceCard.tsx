import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { PropsWithChildren } from 'react';
import { ColorOptions } from '../../types';
import { MainContent } from './components/main-content';
import { TextSection } from './components/text-section';

type ServiceCardType = {
  title: string;
  image?: IGatsbyImageData | null;
  highlightColor: ColorOptions;
};

export const ServiceCard: React.FC<PropsWithChildren<ServiceCardType>> = ({
  children,
  title,
  image,
  highlightColor,
}) => (
  <MainContent highlightColor={highlightColor} to="/services">
    <div className="flex w-full flex-col lg:h-32 lg:w-auto lg:flex-1">
      <div className="lg:mb-2">
        {image && (
          <GatsbyImage className="lg:max-h-40" image={image} alt={title} />
        )}
      </div>
      <TextSection highlightColor={highlightColor}>
        <span className="inline-block justify-self-start pt-8 text-xl uppercase">
          {title}
        </span>
        <p className="p-6">{children}</p>
      </TextSection>
    </div>
  </MainContent>
);
