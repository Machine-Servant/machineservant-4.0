import { DiscussionEmbed } from 'disqus-react';
import { PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';
import { components, MainContent } from '../../components/blog-post';
import { ByLine } from '../../components/by-line';
import { Layout } from '../../components/layout';
import { Tag } from '../../components/tag';
import { RelatedPost } from './components/related-post';

function isParentWithRelativeDirectory(
  parent?: any
): parent is { relativeDirectory: string } {
  if (!parent) return false;
  return !!(parent as any).relativeDirectory;
}

export const BlogPost: React.FC<PageProps<Queries.BlogPostPageQuery>> = ({
  data,
}) => {
  const [PageContent, SetPageContent] = useState<React.ReactElement | null>(
    null
  );

  console.log(data.relatedPosts);

  const featuredImage = data.markdownRemark?.frontmatter?.featuredImage
    ? getImage(data.markdownRemark.frontmatter.featuredImage.childImageSharp)
    : null;

  useEffect(() => {
    if (data.markdownRemark?.html) {
      unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
          createElement: React.createElement,
          components,
          Fragment: React.Fragment,
        })
        .process(data.markdownRemark.html)
        .then((file) => SetPageContent(file.result));
    }
  }, [data]);

  if (!isParentWithRelativeDirectory(data.markdownRemark?.parent)) return null;

  const disqusConfig = {
    shortname: 'machineservant',
    config: {
      identifier: data?.markdownRemark?.parent.relativeDirectory,
      title: data?.markdownRemark?.frontmatter?.title || '',
    },
  };

  return (
    <Layout
      image={featuredImage}
      imageAlt={data?.markdownRemark?.frontmatter?.imageAlt || 'Featured Image'}
      imageCredits={data?.markdownRemark?.frontmatter?.imageCredits}
      imageCreditsUrl={data.markdownRemark?.frontmatter?.imageCreditsUrl}
      isLargeImage
      content={
        <>
          <div className="container mx-auto flex h-full items-end justify-center py-12">
            <div className="z-20 text-center text-4xl font-bold uppercase text-white">
              {data?.markdownRemark?.frontmatter?.title}
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gray-900 opacity-30" />
        </>
      }
    >
      <MainContent>
        <div className="mb-8 flex items-center text-sm font-extralight">
          <ByLine author={data?.markdownRemark?.frontmatter?.author} />
          <span className="mx-2">&bull;</span>
          <span className="">{data?.markdownRemark?.frontmatter?.date}</span>
          <span className="mx-2">&bull;</span>
          <span className="mr-2">
            {data?.markdownRemark?.timeToRead} min read
          </span>
        </div>
        {PageContent}
        <hr className="mb-4" />
        <div className="flex flex-wrap justify-between">
          {data?.markdownRemark?.frontmatter?.tags?.map((tag) => (
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
