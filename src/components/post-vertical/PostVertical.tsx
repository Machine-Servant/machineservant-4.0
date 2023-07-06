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

export const PostVertical: React.FC<
  Queries.BlogPaginatedQuery['featuredPosts']['edges'][0]['node']
> = ({ frontmatter, fields, excerpt, parent }) => {
  if (!isParentWithRelativeDirectory(parent)) return null;

  const image = frontmatter?.featuredImage
    ? getImage(frontmatter.featuredImage.childImageSharp)
    : null;

  return (
    <div className="flex flex-col border border-gray-300 shadow-md">
      {image && (
        <GatsbyImage
          className="h-60 w-full"
          image={image}
          alt={frontmatter?.title || ''}
        />
      )}
      <div className="flex flex-1 flex-col p-8">
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
  );
};
