import React, { PropsWithChildren } from 'react';

export const SectionLabel: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="mb-4 text-center text-4xl font-bold sm:text-5xl">
      {children}
    </h2>
  );
};
