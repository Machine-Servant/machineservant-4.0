import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from '../icons';

export const Navbar: React.FC = () => {
  const { title, social, navigation } = useSiteMetadata();

  return (
    <header className="bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 pb-4 sm:w-auto sm:pb-0 lg:px-0"
        >
          <StaticImage
            src="../../images/logo-small.png"
            alt={title || 'MachineServant'}
            layout="fixed"
            height={35}
            width={35}
          />
          <span className="text-xl font-bold uppercase transition-colors duration-500 hover:text-gray-600">
            {title}
          </span>
        </Link>
        <nav className="flex w-full items-center justify-between text-sm sm:w-auto">
          <ul className="flex justify-between px-2 sm:px-0">
            {navigation?.map(
              (nav) =>
                nav?.path && (
                  <li key={nav?.name} className="px-2 sm:px-4">
                    <Link to={nav.path}>{nav?.name}</Link>
                  </li>
                )
            )}
          </ul>
          <ul className="flex justify-between gap-1">
            {social?.linkedIn && (
              <li>
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
              <li>
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
              <li>
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
            {social?.github && (
              <li>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noreferrer"
                  title="Github"
                >
                  <GithubIcon className="h-6 w-6 fill-gray-800" />
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
