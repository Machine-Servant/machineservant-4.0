import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TextArea } from '../../../text-area';

interface ContactFormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const ContactFormTextArea: React.FC<ContactFormTextAreaProps> = ({
  error,
  className,
  ...props
}) => {
  return (
    <TextArea
      {...props}
      className={twMerge(className, error && 'border-copper-500')}
    />
  );
};
