import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ByLine } from '../../../by-line';

function isParentWithRelativeDirectory(
  parent?: any
): parent is { relativeDirectory: string } {
  if (!parent) return false;
  return !!(parent as any).relativeDirectory;
}
interface RelatedPostProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Queries.BlogPostPageQuery['relatedPosts']['edges'][0]['node'];
}

export const RelatedPost: React.FC<RelatedPostProps> = ({
  className,
  post,
  ...props
}) => {
  const image = post.frontmatter?.featuredImage
    ? getImage(post.frontmatter.featuredImage.childImageSharp)
    : null;

  if (!isParentWithRelativeDirectory(post.parent)) return null;

  return (
    <div className={twMerge('flex flex-col', className)} {...props}>
      {image && (
        <Link
          to={`/blog/${post.parent.relativeDirectory}`}
          className="overflow-hidden rounded-t-md border-l border-t border-r border-lochmara-400"
        >
          <GatsbyImage
            className="h-32"
            image={image}
            alt={post.frontmatter?.imageAlt || ''}
          />
        </Link>
      )}
      <div className="flex-1 rounded-b-md border-l border-r border-b border-lochmara-400 px-4 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs">
            <ByLine author={post.frontmatter?.author} />
          </span>
          <span className="text-xs">{post.frontmatter?.date}</span>
        </div>
        <div className="">
          <Link
            className="transition-colors hover:text-gray-700 hover:underline"
            to={`/blog/${post.parent.relativeDirectory}`}
          >
            <h2 className="flex text-sm font-medium">
              {post.frontmatter?.title}
            </h2>
          </Link>
        </div>
        <p className="mb-4 font-extralight">{post.excerpt}</p>
      </div>
    </div>
  );
};
