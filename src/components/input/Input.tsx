import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Input: React.FC<React.HTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={twMerge(
        'mb-4 border-2 border-gray-800 px-4 py-2 text-sm',
        className
      )}
      {...props}
    />
  );
};
