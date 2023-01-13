import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface FullSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  nopt?: boolean;
  nopb?: boolean;
}

export const FullSection: React.FC<PropsWithChildren<FullSectionProps>> = ({
  children,
  container,
  nopt,
  nopb,
  className,
  ...props
}) => {
  return (
    <section
      className={twMerge(
        className,
        container && 'container mx-auto lg:px-0',
        nopt ? 'pt-0' : 'pt-12',
        nopb ? 'pb-0' : 'pb-12'
      )}
      {...props}
    >
      {children}
    </section>
  );
};
