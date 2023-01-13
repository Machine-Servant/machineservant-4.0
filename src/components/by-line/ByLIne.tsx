import { GatsbyImage } from 'gatsby-plugin-image';
import { get } from 'lodash';
import React from 'react';
import { useAvatar } from '../../hooks/use-avatar';

type ByLineProps = {
  author?: string | null;
};

export const ByLine: React.FC<ByLineProps> = ({ author }) => {
  const avatarCollection = useAvatar();

  if (!author) return null;

  const avatar = get(avatarCollection, author, null);

  return (
    <div className="flex items-center text-sm font-extralight">
      {avatar && <GatsbyImage className="mr-2" image={avatar} alt={author} />}{' '}
      {author}
    </div>
  );
};
