import { graphql, HeadFC, Link, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { CustomHead } from '../components/custom-head';
import { Layout } from '../components/layout';

const Error404Page: React.FC = () => {
  const { errorImage } = useStaticQuery<Queries.ErrorPageQuery>(graphql`
    query ErrorPage {
      errorImage: file(relativePath: { eq: "404.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);

  const image = errorImage ? getImage(errorImage.childImageSharp) : null;

  return (
    <Layout
      image={image}
      imageAlt="Coffee cup spilling coffee on docuements"
      content={
        <>
          <div className="container z-20 mx-auto">
            <h1 className="text-center text-4xl font-bold uppercase text-white">
              Error 404
            </h1>
            <h2 className="text-center text-2xl font-medium text-white">
              The page you're looking for is removed or relocated.
            </h2>
          </div>
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gray-900 opacity-30" />
        </>
      }
    >
      <div className="container mx-auto px-4 py-12 xl:px-0">
        <h1 className="text-2xl lg:text-3xl">OOPS!</h1>
        <h2 className="text-xl">
          We're sorry, but the page you're looking for has either been removed
          or relocated.
        </h2>
        <div className="pt-12">
          <Link to="/" className="text-lg underline">
            Go back home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Error404Page;

export const Head: HeadFC = () => {
  return (
    <CustomHead
      title="Page not found"
      description="The requested page was not found"
      nonCanonical
    />
  );
};
