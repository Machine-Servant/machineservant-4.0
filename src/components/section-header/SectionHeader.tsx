import React, { PropsWithChildren } from 'react';

export const SectionHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className="text-4xl uppercase text-black">{children}</span>;
};
