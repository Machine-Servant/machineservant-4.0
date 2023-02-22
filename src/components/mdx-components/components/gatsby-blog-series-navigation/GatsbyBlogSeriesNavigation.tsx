import { Link } from 'gatsby';
import React from 'react';

export enum GatsbyBlogSeriesPage {
  P1_CREATING_PROJECT = 'CREATING_PROJECT',
  P2_LAYOUT_AND_PAGES = 'LAYOUT_AND_PAGES',
  P3_BLOG_PAGES = 'BLOG_PAGES',
  P4_FEATURED_IMAGES = 'FEATURED_IMAGES',
}

interface GatsbyBlogSeriesNavigationProps {
  currentPage: GatsbyBlogSeriesPage;
}

export const GatsbyBlogSeriesNavigation: React.FC<
  GatsbyBlogSeriesNavigationProps
> = ({ currentPage }) => {
  const pageMap = [
    {
      page: GatsbyBlogSeriesPage.P1_CREATING_PROJECT,
      url: '2023-02-18-p1-gatsby-js-blog-starting-the-project',
      label: 'Part 1: Starting the Project',
    },
    {
      page: GatsbyBlogSeriesPage.P2_LAYOUT_AND_PAGES,
      url: '2023-02-18-p2-gatsby-js-blog-layout-and-pages',
      label: 'Part 2: Layout and Pages',
    },
    {
      page: GatsbyBlogSeriesPage.P3_BLOG_PAGES,
      url: '2023-02-18-p3-gatsby-js-blog-list-and-posts',
      label: 'Part 3: Blog and Posts Pages',
    },
    {
      page: GatsbyBlogSeriesPage.P4_FEATURED_IMAGES,
      url: '2023-02-21-p4-gatsby-js-blog-featured-image',
      label: 'Part 4: Featured Images',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-medium">
        Building a Gatsby Blog Series
      </h2>
      <ul>
        {pageMap.map(({ page, url, label }) => (
          <li>
            {page === currentPage ? (
              <p>➩ {label}</p>
            ) : (
              <Link to={`/blog/${url}`} className="text-lochmara-500 underline">
                <p>{label}</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
