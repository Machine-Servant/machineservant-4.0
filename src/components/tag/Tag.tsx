import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React from 'react';

type TagProps = {
  value?: string | null;
  count?: number;
};

export const Tag: React.FC<TagProps> = ({ value, count }) => {
  if (!value) return null;
  return (
    <Link to={`/tag/${kebabCase(value)}`}>
      <div className="mx-4 mb-4 bg-lochmara-400 px-4 py-2 text-xs text-white">
        <span className="mr-2 font-medium">#{value}</span>
        {count && <span className="ml-2 text-gray-200">({count})</span>}
      </div>
    </Link>
  );
};
