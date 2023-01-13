import React from 'react';
import { IconProps } from './types';

export const InspectionIcon: React.FC<IconProps> = ({ ref, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M19,3h-4.184C14.403,1.837,13.304,1,12,1S9.597,1.837,9.184,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14 c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M12,3c0.552,0,1,0.448,1,1c0,0.552-0.448,1-1,1s-1-0.448-1-1 C11,3.448,11.448,3,12,3z M11,16.414l-3.772-3.772l1.414-1.414L11,13.586l4.792-4.792l1.414,1.414L11,16.414z M19,19H5V5h14V19z" />
    </svg>
  );
};
