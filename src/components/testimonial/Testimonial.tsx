import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { PropsWithChildren } from 'react';
import { ImageWrapper } from './components/image-wrapper';

type TestimonialProps = {
  image?: IGatsbyImageData | null;
  imageOrientation: 'left' | 'right';
  name: string;
  company: string;
  link?: string;
};

export const Testimonial: React.FC<PropsWithChildren<TestimonialProps>> = ({
  image,
  imageOrientation,
  name,
  company,
  link,
  children,
}) => (
  <div className="mx-auto mb-12 flex max-w-4xl flex-col last-of-type:mb-0 sm:flex-row">
    {imageOrientation === 'left' && (
      <ImageWrapper imageOrientation={imageOrientation}>
        {image && <GatsbyImage image={image} alt={name} />}
      </ImageWrapper>
    )}
    <div className="flex flex-col justify-between px-4 sm:px-0">
      <p className="mb-8 sm:mb-0">{children}</p>
      <div className="text-lg">
        <span>{name}</span>,{' '}
        {link ? (
          <a
            href={link}
            className="italic underline"
            rel="noreferrer noopener"
            target="_blank"
          >
            {company}
          </a>
        ) : (
          <span className="italic">{company}</span>
        )}
      </div>
    </div>
    {imageOrientation === 'right' && (
      <ImageWrapper imageOrientation={imageOrientation}>
        {image && <GatsbyImage image={image} alt={name} />}
      </ImageWrapper>
    )}
  </div>
);
