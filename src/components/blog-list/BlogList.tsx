import { Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React, { useMemo, useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { twMerge } from 'tailwind-merge';
import { useIsSsr } from '../../hooks/is-ssr';
import { BlogPageContext } from '../../types';
import { Layout } from '../layout';
import { Post } from '../post';
import { PostVertical } from '../post-vertical';
import { Tag } from '../tag';
import { Paginator } from './components/paginator';
import { Search } from './components/search';

export const BlogList = ({
  data,
  pageContext,
}: {
  data: Queries.BlogPaginatedQuery;
  pageContext: BlogPageContext;
}) => {
  const blogPageImage = data.blogPageImage
    ? getImage(data.blogPageImage.childImageSharp)
    : null;

  const isSsr = useIsSsr();

  const { search } = isSsr ? { search: '' } : window.location;

  const query = useMemo(() => {
    if (search.length === 0) return null;
    return new URLSearchParams(search).get('query');
  }, [search]);

  const [searchQuery, setSearchQuery] = useState<string>(query || '');

  const results = useFlexSearch(
    searchQuery,
    data.localSearchPosts?.index || null,
    data.localSearchPosts?.store || null
  );

  const posts = results.length
    ? results
    : data.posts.edges.map((edge) => edge.node);

  const { currentPage, numPages, paginated, renderTagList, tag } = pageContext;

  const showNavigation = useMemo(() => {
    return paginated && searchQuery.length === 0;
  }, [paginated, searchQuery]);
  const showSearch = useMemo(() => {
    return !tag;
  }, [tag]);

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
          <h2 className="mt-12 mb-4 text-center text-3xl font-medium">
            All posts tagged <pre className="inline">#{tag}</pre>
          </h2>
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
      {showSearch && (
        <Search
          className="container mx-auto mt-8 flex max-w-5xl justify-center"
          action="/blog"
          method="get"
          autoComplete="off"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <div className="container mx-auto gap-8 xl:flex">
        {data.featuredPosts && (
          <div className="pt-8 pb-12 lg:py-12 xl:w-1/3">
            <h2 className="mb-4 text-center text-3xl font-medium">
              Featured Posts
            </h2>
            {data.featuredPosts.edges.map(({ node: post }) => (
              <div
                key={post.id}
                className="mx-4 mb-8 last-of-type:mb-0 xl:mx-0"
              >
                <PostVertical {...post} />
              </div>
            ))}
          </div>
        )}
        <div className="flex-1 pt-8 pb-12 lg:py-12">
          {!tag && (
            <h3 className="mb-4 text-center text-3xl font-medium">All Posts</h3>
          )}
          {posts.map((post: any) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
      {showNavigation && (
        <div className="container mx-auto mb-12 max-w-5xl">
          <div className="flex items-center justify-around lg:justify-between">
            <Link
              className={twMerge(
                'w-32 bg-lochmara-500 px-4 py-2 text-center text-lg text-white',
                !backPath && 'cursor-not-allowed opacity-20'
              )}
              to={backPath || '#'}
              onClick={(e) => {
                if (!backPath) {
                  e.preventDefault();
                }
              }}
            >
              Back
            </Link>
            <Paginator
              numPages={numPages || 0}
              currentPage={currentPage || 0}
            />
            <Link
              className={twMerge(
                'w-32 bg-lochmara-500 px-4 py-2 text-center text-lg text-white',
                !nextPath && 'cursor-not-allowed opacity-20'
              )}
              to={nextPath || '#'}
              onClick={(e) => {
                if (!nextPath) {
                  e.preventDefault();
                }
              }}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};
