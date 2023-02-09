import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { CustomHead } from '../components/custom-head';
import { Layout } from '../components/layout';
import { Tag } from '../components/tag';

export const TagsPage: React.FC<PageProps<Queries.TagsPageQuery>> = ({
  data,
}) => {
  const blogImage = data.blogImage
    ? getImage(data.blogImage.childImageSharp)
    : null;

  const sortedTags = [...data.allMdx.group].sort(
    (a, b) => b.totalCount - a.totalCount
  );

  return (
    <Layout
      image={blogImage}
      imageAlt="Cup Filled With Coffee Near Notebook and Tablet"
      imageCredits="Photo by Pixabay"
      imageCreditsUrl="https://www.pexels.com/photo/black-and-white-blog-business-coffee-261579/"
      content={
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold uppercase">Blog</h1>
        </div>
      }
    >
      <h1 className="my-12 text-center text-3xl font-medium">
        All tags for all posts
      </h1>
      <div className="mx-auto mb-12 max-w-5xl text-center">
        <Link className="underline" to="/blog">
          Back to blog list page
        </Link>
      </div>
      <div className="container mx-auto flex max-w-5xl flex-wrap items-center justify-evenly pb-12 lg:justify-between">
        {sortedTags.map((tag) => (
          <Tag value={tag.fieldValue!} count={tag.totalCount} />
        ))}
      </div>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsPage {
    blogImage: file(relativePath: { eq: "blog.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    allMdx(filter: { frontmatter: { published: { eq: true } } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head: HeadFC = () => {
  return (
    <CustomHead
      title="Post tags | MachineServant"
      description="All the tags for all the posts"
    />
  );
};
