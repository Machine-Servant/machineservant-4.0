import { graphql, HeadFC, PageProps } from 'gatsby';
import { getImage, StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { CalendlyEmbed } from '../components/calendly-embed';
import { ContactForm } from '../components/contact-form';
import { CustomHead } from '../components/custom-head';
import { FullSection } from '../components/full-section';
import { Layout } from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const ContactPage: React.FC<PageProps<Queries.ContactPageQuery>> = ({
  data,
}) => {
  const contactImage = data.contactImage
    ? getImage(data.contactImage.childImageSharp)
    : null;

  const { title, contact, phone } = useSiteMetadata();

  return (
    <Layout
      image={contactImage}
      imageAlt="Cell phone in hand"
      imageCredits="Photo by Porapak Apichodilok"
      imageCreditsUrl="https://www.pexels.com/photo/person-standing-while-using-phone-369376/"
      darken
      content={
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold uppercase">
            Contact Us
          </h1>
        </div>
      }
    >
      <FullSection className="bg-gray-100">
        <div className="mx-auto flex max-w-4xl flex-col items-start lg:flex-row">
          <div className="w-auto lg:w-1/2">
            <div className="mb-8 flex items-center justify-center">
              <StaticImage
                className="inline-block"
                layout="fixed"
                height={60}
                width={60}
                src="../images/logo-small.png"
                alt={title || 'MachineServant'}
                transformOptions={{}}
                blurredOptions={{}}
              />
              <span className="text-2xl font-bold uppercase text-black md:text-4xl">
                {title}
              </span>
            </div>
            <div className="flex flex-col justify-between px-12">
              <div>
                <span className="text-xl font-medium uppercase lg:text-2xl">
                  Located in Akron, Ohio
                </span>
                <p className="text-lg">
                  We love northeast Ohio, but our abilities know no bounds! We
                  can work with you remotely any time, any place.
                </p>
              </div>
              <div className="mt-12">
                <h5>Akron, Ohio</h5>
                <h5>
                  <a href={`tel:${phone}`} rel="noreferrer" target="_blank">
                    {phone}
                  </a>
                </h5>
                <h5>
                  <a
                    className="underline"
                    href={`mailto:${contact}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {contact}
                  </a>
                </h5>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full pr-6 lg:mt-0 lg:w-1/2 lg:pr-0">
            <ContactForm />
          </div>
        </div>
      </FullSection>
      <FullSection>
        <h1 className="mb-8 text-center text-3xl font-medium uppercase lg:mb-0">
          Schedule a consultation
        </h1>
        <CalendlyEmbed account="machineservant" eventName="30min" />
      </FullSection>
    </Layout>
  );
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPage {
    contactImage: file(relativePath: { eq: "contact-page.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export const Head: HeadFC = () => {
  return (
    <CustomHead
      title="Contact Us"
      description="Want a great website or application? Call, email, or send us a message!"
    />
  );
};
