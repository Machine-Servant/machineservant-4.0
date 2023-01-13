import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContactFormHelpTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const ContactFormHelpText: React.FC<
  PropsWithChildren<ContactFormHelpTextProps>
> = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge('mb-4 text-sm text-copper-500', className)}
      {...props}
    >
      {children}
    </span>
  );
};
