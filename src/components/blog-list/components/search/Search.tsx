import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SearchProps extends React.FormHTMLAttributes<HTMLFormElement> {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = ({
  className,
  searchQuery,
  setSearchQuery,
  ...props
}) => {
  return (
    <form className={twMerge('flex items-center gap-4', className)} {...props}>
      <label htmlFor="search-input">
        <span className="sr-only">Search blog posts</span>
      </label>
      <input
        type="text"
        className="rounded-full border border-gray-600 px-4 py-2 sm:w-96"
        id="search-input"
        name="query"
        placeholder="Search blog posts"
        onInput={(e) => setSearchQuery(e.currentTarget.value)}
        value={searchQuery}
      />
      <button type="button" onClick={() => setSearchQuery('')}>
        Clear Search
      </button>
    </form>
  );
};
