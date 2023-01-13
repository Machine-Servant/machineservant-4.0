import { IGatsbyImageData } from 'gatsby-plugin-image';
import React, { PropsWithChildren } from 'react';
import { Footer } from '../footer';
import { Navbar } from '../navbar';
import { HeaderImage } from './styles';

interface LayoutProps {
  image?: IGatsbyImageData | null;
  imageAlt?: string;
  imageCredits?: string | null;
  imageCreditsUrl?: string | null;
  isLargeImage?: boolean;
  content?: React.ReactNode;
  darken?: boolean;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  image,
  imageAlt,
  imageCredits,
  imageCreditsUrl,
  isLargeImage = false,
  content,
  darken = false,
}) => {
  return (
    <main className="font-sans font-light">
      <Navbar />
      {image && (
        <div className="relative">
          <HeaderImage
            image={image}
            alt={imageAlt || ''}
            isLargeImage={isLargeImage}
          />
          {content && (
            <>
              <div className="inset-0 z-20 hidden flex-col justify-center text-white shadow-xl sm:absolute sm:flex">
                {content}
                {imageCredits && imageCreditsUrl ? (
                  <a
                    className="absolute bottom-4 z-10 mb-4 ml-4 text-sm opacity-50"
                    href={imageCreditsUrl}
                    rel="noreferrer nofollow"
                    target="_blank"
                  >
                    {imageCredits}
                  </a>
                ) : (
                  <div className="mb-4 ml-4 text-sm">{imageCredits}</div>
                )}
              </div>
              {darken && (
                <div className="absolute inset-0 z-10 bg-gray-900 opacity-30" />
              )}
            </>
          )}
        </div>
      )}
      {children}
      <Footer />
    </main>
  );
};
