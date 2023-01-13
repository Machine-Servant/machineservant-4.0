import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Input } from '../../../input';

interface ContactFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const ContactFormInput: React.FC<ContactFormInputProps> = ({
  error = false,
  ...props
}) => {
  return <Input className={twMerge(error && 'border-copper-500')} {...props} />;
};
