import { MDXProvider } from '@mdx-js/react';
import { DiscussionEmbed } from 'disqus-react';
import { PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { components, MainContent } from '../../components/blog-post';
import { ByLine } from '../../components/by-line';
import { Layout } from '../../components/layout';
import { PhotoCredits } from '../../components/photo-credits';
import { Tag } from '../../components/tag';
import { RelatedPost } from '../related-post';
import { TableOfContents } from './components/table-of-contents';

function isParentWithRelativeDirectory(
  parent?: any
): parent is { relativeDirectory: string } {
  if (!parent) return false;
  return !!(parent as any).relativeDirectory;
}

export const BlogPost: React.FC<PageProps<Queries.BlogPostPageQuery>> = ({
  data,
  children,
}) => {
  const featuredImage = data.mdx?.frontmatter?.featuredImage
    ? getImage(data.mdx.frontmatter.featuredImage.childImageSharp)
    : null;

  if (!isParentWithRelativeDirectory(data.mdx?.parent)) return null;

  const disqusConfig = {
    shortname: 'machineservant',
    config: {
      identifier: data?.mdx?.parent.relativeDirectory,
      title: data?.mdx?.frontmatter?.title || '',
    },
  };

  return (
    <Layout
      image={featuredImage}
      imageAlt={data?.mdx?.frontmatter?.imageAlt || 'Featured Image'}
      imageCredits={data?.mdx?.frontmatter?.imageCredits}
      imageCreditsUrl={data.mdx?.frontmatter?.imageCreditsUrl}
      isLargeImage
      content={
        <>
          <div className="container mx-auto flex h-full items-end justify-center py-12">
            <div className="z-20 text-center text-4xl font-bold uppercase text-white">
              {data?.mdx?.frontmatter?.title}
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gray-900 opacity-30" />
        </>
      }
    >
      <MainContent>
        <div className="mb-8 flex items-center text-sm font-extralight">
          <ByLine author={data?.mdx?.frontmatter?.author} />
          <span className="mx-2">&bull;</span>
          <span className="">{data?.mdx?.frontmatter?.date}</span>
          {data.mdx?.fields?.timeToRead?.minutes && (
            <>
              <span className="mx-2">&bull;</span>
              <span className="">
                {Math.ceil(data.mdx?.fields?.timeToRead.minutes)} min
              </span>
            </>
          )}
        </div>
        <TableOfContents data={data.mdx?.tableOfContents} />
        <MDXProvider
          components={{
            ...components,
            PhotoCredits,
          }}
        >
          {children}
        </MDXProvider>
        <hr className="mb-4" />
        <div className="flex flex-wrap justify-between">
          {data?.mdx?.frontmatter?.tags?.map((tag) => (
            <Tag value={tag} key={tag} />
          ))}
        </div>
        <hr className="mb-8" />
        {data.relatedPosts.edges.length > 0 && (
          <div>
            <span className="mb-4 block text-lg font-bold text-black">
              Read Next
            </span>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.relatedPosts.edges.map(({ node }) => (
                <RelatedPost key={node.id} post={node} />
              ))}
            </div>
            <hr className="mb-8" />
          </div>
        )}
        <DiscussionEmbed {...disqusConfig} />
      </MainContent>
    </Layout>
  );
};
