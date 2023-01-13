import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { ContactForm } from '../components/contact-form';
import { CustomHead } from '../components/custom-head';
import { FeatureCard } from '../components/feature-card';
import { FullSection } from '../components/full-section';
import { ServiceCard } from '../components/home-service-card';
import {
  InspectionIcon,
  MoneyBoxIcon,
  PhoneIcon,
  TimeIcon,
} from '../components/icons';
import { InnovationIcon } from '../components/icons/innovation-icon';
import { Layout } from '../components/layout';
import { SectionHeader } from '../components/section-header';
import { Testimonial } from '../components/testimonial';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  const headerImage = data.headerImage
    ? getImage(data.headerImage.childImageSharp)
    : null;
  const websiteDesign = data.websiteDesign
    ? getImage(data.websiteDesign.childImageSharp)
    : null;
  const coding = data.coding ? getImage(data.coding.childImageSharp) : null;
  const webApplication = data.webApplication
    ? getImage(data.webApplication.childImageSharp)
    : null;
  const projectManagement = data.projectManagement
    ? getImage(data.projectManagement.childImageSharp)
    : null;
  const features = data.features
    ? getImage(data.features.childImageSharp)
    : null;
  const engeloRumoraProfile = data.engelo
    ? getImage(data.engelo.childImageSharp)
    : null;
  const contactUs = data.contactUs
    ? getImage(data.contactUs.childImageSharp)
    : null;

  const { title } = useSiteMetadata();

  return (
    <Layout
      image={headerImage}
      imageAlt="Desktop with large monitor and a drink."
      imageCredits="Photo by Sathesh D"
      imageCreditsUrl="https://www.pexels.com/photo/closeup-photo-of-black-computer-keyboard-s-left-side-keys-698808/"
      isLargeImage
      darken
      content={
        <div className="container mx-auto px-4 xl:px-0">
          <div className="inline-block rounded-lg rounded-tl-none rounded-br-none bg-lochmara-500 bg-opacity-80 p-8 text-white shadow-2xl">
            <span className="block text-lg font-medium">At {title} we</span>
            <span className="block text-3xl font-bold uppercase">
              Design + Build + Manage
            </span>
            <span className="block text-lg font-medium">
              websites, web applications, software, and more.
            </span>
            <div className="mt-8 text-center">
              <Link
                to="/services"
                className="px-4 py-2 text-xl font-medium text-white underline"
              >
                Check out our services!
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      }
    >
      <div className="bg-gray-100 py-8 lg:py-24">
        <div className="mb-4 flex w-full items-center justify-center">
          <div className="hidden lg:inline-block">
            <StaticImage
              className="inline-block"
              layout="fixed"
              height={70}
              width={70}
              src="../images/logo-small.png"
              alt={title || 'MachineServant'}
            />
          </div>
          <span className="text-xl font-bold uppercase text-black sm:text-5xl lg:text-3xl">
            {title}
          </span>
        </div>
        <div className="mx-auto sm:flex sm:max-w-4xl sm:items-center sm:justify-center">
          <div className="sm:mr-8 sm:w-96">
            <div className="mb-4 text-center text-2xl text-black sm:mb-0 sm:text-right sm:text-4xl">
              We're The Experts
            </div>
          </div>
          <div className="px-4 text-center sm:px-0 sm:text-left">
            <p className="mb-4 sm:mb-0">
              Your professional source for online innovation.
            </p>
            <p>
              {title} is a web and software development shop that builds
              solutions for your business. We work with you from the initial
              stages of idea conception to execution. Your vision becomes our
              vision and we help you to implement your ideas into working
              solutions that will take your business to the next level.
            </p>
          </div>
        </div>
        <p className="mt-4 text-center">
          <Link className="text-lg underline" to="/contact">
            Tell us about your project
          </Link>
        </p>
      </div>
      <FullSection container>
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <SectionHeader>Services</SectionHeader>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            <ServiceCard
              title="Website Design"
              image={websiteDesign}
              highlightColor="blue"
            >
              Functional and beautiful outcomes with hierarchy, balance, space,
              alignments and contrast creating the perfect eye flow.
            </ServiceCard>
            <ServiceCard
              title="Web Application Development"
              image={webApplication}
              highlightColor="gold"
            >
              If you have a great idea for a product, we have top-notch
              solutions! We'll handle the heavy lifting and let you keep coming
              up with amazing ideas.
            </ServiceCard>
            <ServiceCard title="Coding" image={coding} highlightColor="purple">
              Top notch knowledge and expertise on all your coding needs. We're
              the experts. We know our stuff.
            </ServiceCard>
            <ServiceCard
              title="Project Management"
              image={projectManagement}
              highlightColor="green"
            >
              We will manage your project one on one, every step of the way,
              bringing your project to life in your timeframe.
            </ServiceCard>
          </div>
        </div>
      </FullSection>
      <div className="relative">
        {features && (
          <GatsbyImage
            className="h-60 lg:h-96"
            image={features}
            alt="Office Table With Computers"
          />
        )}
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-gray-900 opacity-30" />
        <div className="absolute top-0 left-0 z-20 flex h-full w-full flex-col justify-center text-center text-white">
          <span className="inline-block text-4xl font-bold uppercase">
            features
          </span>
          <span className="inline-block text-lg">Going Above and Beyond</span>
        </div>
      </div>
      <FullSection container>
        <div className="mx-auto justify-between lg:flex lg:max-w-5xl">
          <FeatureCard title="Free Consultation" icon={PhoneIcon}>
            No robots here! From consultation to design, building, publishing,
            and maintenance - we only offer one on one human interaction every
            step of the way.
          </FeatureCard>
          <FeatureCard title="Cost Effective" icon={MoneyBoxIcon}>
            After all, we work for small and midsize businesses. Our prices are
            competitive yet affordable. To find out more about our
            cost-effective rates, scroll down to schedule a free consultation
            with us.
          </FeatureCard>
          <FeatureCard title="Fast Results" icon={TimeIcon}>
            Need to start now? We're fast, quick, and snappy! However you put
            it, you'll get your website or web application in your timeframe
            with the best quality results.
          </FeatureCard>
          <FeatureCard title="In Depth Knowledge" icon={InnovationIcon}>
            With over 15 years of experience in software and website/web
            application development, we will go the distance in every aspect.
          </FeatureCard>
          <FeatureCard title="Satisfaction Guaranteed" icon={InspectionIcon}>
            If you want changes, you'll get changes. As many as you need until
            you're happy with the results. We'll create solutions based on your
            consumer needs and company goals.
          </FeatureCard>
        </div>
      </FullSection>
      <FullSection className="bg-gray-100">
        <Testimonial
          image={engeloRumoraProfile}
          imageOrientation="left"
          name="Engelo Rumora"
          company="OhioCashFlow"
          link="https://www.ohiocashflow.com"
        >
          "After countless individuals and companies along with hundreds of
          thousands of dollars in losses, we have finally found a company that
          we trust. Machine Servant is affordable, efficient and they definitely
          know their stuff. Led by Evan who is not only a true professional but
          through our working relationship has also become a friend. I highly
          recommend taking them on for any project that you have in mind."
        </Testimonial>
      </FullSection>
      <FullSection container>
        <div className="mx-auto sm:px-4 lg:max-w-5xl lg:px-0">
          <div className="mb-12 text-center">
            <SectionHeader>Contact Us</SectionHeader>
          </div>
          <div className="sm:flex sm:flex-row sm:justify-between">
            {contactUs && (
              <GatsbyImage
                className="mb-12 w-full sm:mb-0 sm:w-1/2"
                image={contactUs}
                alt="Programmers doing their thing"
              />
            )}
            <div className="w-full sm:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </FullSection>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    headerImage: file(relativePath: { eq: "home-page-header.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    websiteDesign: file(relativePath: { eq: "website-design.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    coding: file(relativePath: { eq: "coding.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    webApplication: file(relativePath: { eq: "web-application.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    projectManagement: file(relativePath: { eq: "project-management.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    features: file(relativePath: { eq: "features.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    engelo: file(relativePath: { eq: "engelorumora-profile.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    contactUs: file(relativePath: { eq: "contact-us.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export const Head: HeadFC = () => {
  return <CustomHead title="Home" />;
};
