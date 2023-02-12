import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import GithubButton from 'react-github-btn';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../icons';

export const Footer: React.FC = () => {
  const { title, contact, social, phone } = useSiteMetadata();

  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto flex flex-col justify-evenly py-12 sm:flex-row">
        <div className="mb-12 sm:mb-0">
          <div className="mb-4 flex items-center justify-center sm:-ml-6">
            <StaticImage
              className="inline-block"
              layout="fixed"
              height={20}
              width={20}
              src="../../images/logo-small.png"
              alt={title || 'MachineServant'}
            />
            <span className="text-xl font-bold uppercase text-black sm:text-xl">
              {title}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="block">Akron, Ohio</span>
            <span className="block">
              <a rel="noreferrer" target="_blank" href={`tel:${phone}`}>
                {phone}
              </a>
            </span>
            <span className="block">
              <a
                className="underline"
                rel="noreferrer"
                target="_blank"
                href={`mailto:${contact}`}
              >
                {contact}
              </a>
            </span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <ul className="mb-4 flex items-center justify-center text-3xl sm:-ml-2 sm:justify-start">
            {social?.linkedIn && (
              <li className="px-2">
                <a
                  href={social.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  title="Linkedin"
                >
                  <LinkedinIcon className="h-6 w-6 fill-gray-800" />
                </a>
              </li>
            )}
            {social?.facebook && (
              <li className="px-2">
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                >
                  <FacebookIcon className="h-6 w-6 fill-gray-800" />
                </a>
              </li>
            )}
            {social?.instagram && (
              <li className="px-2">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                >
                  <InstagramIcon className="h-6 w-6 fill-gray-800" />
                </a>
              </li>
            )}
          </ul>
          {social?.github && (
            <span className="mb-3 block">
              <GithubButton href={social.github}>
                Follow me @machine-servant
              </GithubButton>
            </span>
          )}
          <span className="mb-4 block">
            <a
              rel="me"
              href="https://indieweb.social/@machineservant"
              className="underline"
            >
              Join me on Mastodon
            </a>
          </span>
          <span className="block">
            ©{new Date().getFullYear()} by {title}.
          </span>
        </div>
      </div>
    </footer>
  );
};
