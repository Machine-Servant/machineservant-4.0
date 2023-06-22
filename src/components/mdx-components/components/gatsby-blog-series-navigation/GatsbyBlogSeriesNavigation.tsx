import React from 'react';
import { SeriesLinks } from '../series-links';

export enum GatsbyBlogSeriesPage {
  P1_CREATING_PROJECT = 'CREATING_PROJECT',
  P2_LAYOUT_AND_PAGES = 'LAYOUT_AND_PAGES',
  P3_BLOG_PAGES = 'BLOG_PAGES',
  P4_FEATURED_IMAGES = 'FEATURED_IMAGES',
  P5_SEO = 'SEO',
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
    {
      page: GatsbyBlogSeriesPage.P5_SEO,
      url: '2023-02-22-p5-gatsby-js-blog-seo',
      label: 'Part 5: SEO',
    },
  ];

  return <SeriesLinks pageMap={pageMap} currentPage={currentPage} />;
};
