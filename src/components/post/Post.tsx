import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { ByLine } from '../by-line';

function isParentWithRelativeDirectory(
  parent?: any
): parent is { relativeDirectory: string } {
  if (!parent) return false;
  return !!(parent as any).relativeDirectory;
}

export const Post: React.FC<
  Queries.BlogPaginatedQuery['posts']['edges'][0]['node']
> = ({ frontmatter, fields, excerpt, parent }) => {
  if (!isParentWithRelativeDirectory(parent)) return null;

  const image = frontmatter?.featuredImage
    ? getImage(frontmatter.featuredImage.childImageSharp)
    : null;

  return (
    <div className="mx-4 mb-8 flex max-w-3xl flex-col border border-gray-300 shadow-md md:mx-auto md:h-72 md:flex-row">
      <div className="flex h-60 flex-1 md:h-auto md:w-5/12">
        {image && (
          <GatsbyImage
            className="w-full"
            image={image}
            alt={frontmatter?.title || ''}
          />
        )}
      </div>
      <div className="md:w-7/12">
        <div className="flex h-full flex-col px-8 py-8">
          <div className="mb-8 flex">
            <div className="flex flex-col">
              <span className="mb-2 text-xs">
                <ByLine author={frontmatter?.author} />
              </span>
              <span className="text-xs">
                {frontmatter?.date} &bull;{' '}
                {fields?.timeToRead?.minutes && (
                  <span>{Math.ceil(fields?.timeToRead?.minutes)} min</span>
                )}
              </span>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between">
            <h2 className="text-xl font-medium">
              <Link
                className="transition-colors hover:text-gray-700 hover:underline"
                to={`/blog/${parent.relativeDirectory}`}
              >
                {frontmatter?.title}
              </Link>
            </h2>
            <p className="mb-4 font-extralight">{excerpt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
