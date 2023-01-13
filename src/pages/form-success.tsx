import { graphql, HeadFC, Link, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { CustomHead } from '../components/custom-head';
import { Layout } from '../components/layout';

const FormSuccessPage: React.FC = () => {
  const { formSuccess } = useStaticQuery<Queries.FormSuccessPageQuery>(graphql`
    query FormSuccessPage {
      formSuccess: file(relativePath: { eq: "contact-success.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);

  const image = formSuccess ? getImage(formSuccess.childImageSharp) : null;

  return (
    <Layout
      image={image}
      imageAlt="Stationary, envelope, tablet and man holding pencil in his hand."
      content={
        <>
          <div className="container z-20 mx-auto">
            <h1 className="text-center text-4xl font-bold uppercase text-white">
              Thank You
            </h1>
            <h2 className="text-center text-2xl font-medium text-white">
              We will respond to your message shortly.
            </h2>
          </div>
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gray-900 opacity-30" />
        </>
      }
    >
      <div className="container mx-auto px-4 py-12 xl:px-0">
        <h1 className="text-2xl lg:text-3xl">Thank you for your submission.</h1>
        <h2 className="text-xl">You should hear from us soon.</h2>
        <div className="pt-12">
          <Link to="/" className="text-lg underline">
            Go back home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default FormSuccessPage;

export const Head: HeadFC = () => {
  return (
    <CustomHead
      title="Form Success"
      description="Thank you for your submission"
    />
  );
};
