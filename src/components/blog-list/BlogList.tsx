import { Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Layout } from '../layout';
import { Post } from '../post';
import { Tag } from '../tag';

interface PageContext {
  limit?: number;
  skip?: number;
  numPages?: number;
  currentPage?: number;
  totalCount?: number;
  paginated?: boolean;
  renderTagList?: boolean;
  tag?: string;
}

export const BlogList = ({
  data,
  pageContext,
}: {
  data: Queries.BlogPaginatedQuery;
  pageContext: PageContext;
}) => {
  const blogPageImage = data.blogPageImage
    ? getImage(data.blogPageImage.childImageSharp)
    : null;

  const { currentPage, numPages, paginated, renderTagList, tag } = pageContext;

  const canGoBack = paginated && currentPage && currentPage > 1;
  const backPath = canGoBack
    ? currentPage - 1 === 1
      ? '/blog'
      : `/blog/${currentPage - 1}`
    : null;
  const canGoNext =
    paginated && currentPage && numPages && currentPage < numPages;
  const nextPath = canGoNext && currentPage ? `/blog/${currentPage + 1}` : null;

  const sortedTags = renderTagList
    ? [...data.tagsGroup.group].sort((a, b) => b.totalCount - a.totalCount)
    : [];

  return (
    <Layout
      image={blogPageImage}
      imageAlt="Cup Filled With Coffee Near Notebook and Tablet"
      imageCredits="Photo by Pixabay"
      imageCreditsUrl="https://www.pexels.com/photo/black-and-white-blog-business-coffee-261579/"
      content={
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold uppercase">Blog</h1>
        </div>
      }
    >
      {tag && (
        <>
          <h1 className="mt-12 mb-4 text-center text-3xl font-medium">
            All posts tagged <pre className="inline">#{tag}</pre>
          </h1>
          <div className="text-center">
            <Link className="underline" to="/blog">
              Back to all posts
            </Link>
          </div>
        </>
      )}
      {renderTagList && (
        <div className="container mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-evenly">
          {sortedTags.slice(0, 5).map(({ fieldValue, totalCount }) => (
            <Tag key={fieldValue} value={fieldValue} count={totalCount} />
          ))}
          <Link to="/tags" className="mx-4 mb-4 px-4 py-2 text-xs underline">
            View all tags
          </Link>
        </div>
      )}
      <div className="container mx-auto pt-8 pb-12 lg:py-12">
        {data.posts.edges.map(({ node: post }) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      {paginated && (
        <div className="container mx-auto mb-12 max-w-5xl">
          <div className="flex justify-around lg:justify-between">
            {backPath ? (
              <Link
                className="w-32 bg-lochmara-500 px-4 py-2 text-center text-lg text-white"
                to={backPath}
              >
                Back
              </Link>
            ) : (
              <div />
            )}
            {nextPath ? (
              <Link
                className="w-32 bg-lochmara-500 px-4 py-2 text-center text-lg text-white"
                to={nextPath}
              >
                Next
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};
