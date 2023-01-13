import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { CustomHead } from '../components/custom-head';
import { FullSection } from '../components/full-section';
import { Layout } from '../components/layout';
import { ServicesServiceCard } from '../components/services-service-card';

const ServicesPage: React.FC<PageProps<Queries.ServicesPageQuery>> = ({
  data,
}) => {
  const servicesPageImage = data.servicesPage
    ? getImage(data.servicesPage.childImageSharp)
    : null;
  const consultingImage = data.consulting
    ? getImage(data.consulting.childImageSharp)
    : null;
  const developmentImage = data.development
    ? getImage(data.development.childImageSharp)
    : null;
  const managementImage = data.management
    ? getImage(data.management.childImageSharp)
    : null;
  const designImage = data.design
    ? getImage(data.design.childImageSharp)
    : null;
  const webAppImage = data.webApp
    ? getImage(data.webApp.childImageSharp)
    : null;

  return (
    <Layout
      image={servicesPageImage}
      imageAlt="A Laptop open on a desk with a phone and speakers"
      darken
      content={
        <div className="container mx-auto flex">
          <div className="w-full text-center text-white">
            <h1 className="text-4xl font-bold uppercase">Services</h1>
            <h2 className="text-xl">Your Vision. Our Solutions</h2>
          </div>
        </div>
      }
    >
      <FullSection className="text-center font-medium" container>
        <h1 className="mb-4 text-4xl uppercase">What we offer</h1>
        <p className="mx-auto max-w-xl leading-relaxed">
          We design, build, and manage your web site or web application. Our
          team of experts will work with you one on one to bring your vision to
          reality.
        </p>
      </FullSection>
      <FullSection nopt container>
        <ServicesServiceCard
          title="web application development"
          image={webAppImage}
          imageAlt="Two programmers at work at a table"
          orientation="left"
          highlightColor="blue"
        >
          Got an idea for the next big thing? We can get there! All of our
          services come together to bring you the most experienced team
          dedicated to turning your big idea into the best product on the
          market.
        </ServicesServiceCard>
        <ServicesServiceCard
          title="design"
          image={designImage}
          imageAlt="Notebook beside an iphone on a table"
          orientation="right"
          highlightColor="purple"
        >
          Developing a strong user interface is essential if you're looking to
          attract interest and attention with your target audience. At
          MachineServant, our design services can play an intergal role in
          successfully promoting you and your business.
        </ServicesServiceCard>
        <ServicesServiceCard
          title="website development"
          image={developmentImage}
          imageAlt="Woman looking at her laptop and phone"
          orientation="left"
          highlightColor="gold"
        >
          Let our team of expert developers build your project. We can take over
          an existing codebase, or build you something from scratch. We will
          work with you one on one to bring your dream to reality.
        </ServicesServiceCard>
        <ServicesServiceCard
          title="management + maintenance"
          image={managementImage}
          imageAlt="People with coffee at a meeting"
          orientation="right"
          highlightColor="green"
        >
          We have a strong commitment to Project Management. We’re always
          working to ensure our clients’ needs get the attention they deserve.
          With our Maintenance services and experience, we keep your project up
          to date and looking great!
        </ServicesServiceCard>
        <ServicesServiceCard
          title="consulting"
          image={consultingImage}
          imageAlt="Two people at a computers with shared paper"
          orientation="left"
          highlightColor="blue"
        >
          We provide you and your company with consulting and analysis based on
          the latest technologies to help you make the best choices to achieve
          your vision. Our experts will help you improve your brand, increase
          your audience, and bring your project to life.
        </ServicesServiceCard>
        <div className="text-center text-sm">
          <p className="mb-8">
            Interested in boosting your site with a bit of creative development
            magic? Get in touch with us today!
          </p>
          <Link to="/contact" className="bg-lochmara-500 px-8 py-4 text-white">
            Get in touch
          </Link>
        </div>
      </FullSection>
    </Layout>
  );
};

export default ServicesPage;

export const pageQuery = graphql`
  query ServicesPage {
    servicesPage: file(relativePath: { eq: "services-page.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    consulting: file(relativePath: { eq: "consulting.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    development: file(relativePath: { eq: "development.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    management: file(relativePath: { eq: "management-and-maintenance.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    design: file(relativePath: { eq: "website-design.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    webApp: file(relativePath: { eq: "web-app-development.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export const Head: HeadFC = () => {
  return (
    <CustomHead title="Services" description="Your Vision. Our Solutions." />
  );
};
