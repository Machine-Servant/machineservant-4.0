import React from 'react';

interface PhotoCreditsProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  credits: string;
}

export const PhotoCredits: React.FC<PhotoCreditsProps> = ({
  href,
  credits,
}) => {
  return (
    <div className="mb-8">
      <a href={href} rel="nofollow noreferrer" target="_blank">
        <span className="text-xs font-extralight">{credits}</span>
      </a>
    </div>
  );
};
