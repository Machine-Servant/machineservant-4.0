import React from 'react';
import { twMerge } from 'tailwind-merge';

interface PaginatorProps {
  numPages: number;
  currentPage: number;
}

export const Paginator: React.FC<PaginatorProps> = ({
  numPages,
  currentPage,
}) => {
  // This isn't optimized for a small number of pages, but it's not worth the effort
  if (numPages < 4) return null;

  // if the current page is 1 or 2, return a list of links to the first 3 pages
  // and the last page
  if (currentPage <= 2) {
    return (
      <div className="flex justify-center">
        <ul className="flex flex-row">
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === 1 && 'font-semibold'
              )}
              href="/blog"
            >
              1
            </a>
          </li>
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === 2 && 'font-semibold'
              )}
              href="/blog/2"
            >
              2
            </a>
          </li>
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === 3 && 'font-semibold'
              )}
              href="/blog/3"
            >
              3
            </a>
          </li>
          <li className="px-2">
            <span>...</span>
          </li>
          <li className="px-2">
            <a
              className="text-gray-500 hover:text-gray-900"
              href={`/blog/${numPages}`}
            >
              {numPages}
            </a>
          </li>
        </ul>
      </div>
    );
  }

  // if the current page is the second to last or last page, return a list of
  // links to the first page and the last 3 pages
  if (currentPage >= numPages - 1) {
    return (
      <div className="flex justify-center">
        <ul className="flex flex-row">
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === 1 && 'font-semibold'
              )}
              href="/blog"
            >
              1
            </a>
          </li>
          <li className="px-2">
            <span>...</span>
          </li>
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === numPages - 3 && 'font-semibold'
              )}
              href={`/blog/${numPages - 3}`}
            >
              {numPages - 3}
            </a>
          </li>
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === numPages - 2 && 'font-semibold'
              )}
              href={`/blog/${numPages - 2}`}
            >
              {numPages - 2}
            </a>
          </li>
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === numPages - 1 && 'font-semibold'
              )}
              href={`/blog/${numPages - 1}`}
            >
              {numPages - 1}
            </a>
          </li>
          <li className="px-2">
            <a
              className={twMerge(
                'text-gray-500 hover:text-gray-900',
                currentPage === numPages && 'font-semibold'
              )}
              href={`/blog/${numPages}`}
            >
              {numPages}
            </a>
          </li>
        </ul>
      </div>
    );
  }

  // Otherwise, return a list of links to the first two pages, the current page,
  // and the last two pages
  return (
    <div className="flex justify-center">
      <ul className="flex flex-row">
        <li className="px-2">
          <a className="text-gray-500 hover:text-gray-900" href="/blog">
            1
          </a>
        </li>
        <li className="px-2">
          <a className="text-gray-500 hover:text-gray-900" href={`/blog/2`}>
            2
          </a>
        </li>
        <li className="px-2">
          <span>...</span>
        </li>
        <li className="px-2">
          <a
            className="font-semibold text-gray-500 hover:text-gray-900"
            href={`/blog/${currentPage}`}
          >
            {currentPage}
          </a>
        </li>
        <li className="px-2">
          <span>...</span>
        </li>
        <li className="px-2">
          <a
            className="text-gray-500 hover:text-gray-900"
            href={`/blog/${currentPage + 1}`}
          >
            {currentPage + 1}
          </a>
        </li>
        <li className="px-2">
          <a
            className="text-gray-500 hover:text-gray-900"
            href={`/blog/${numPages}`}
          >
            {numPages}
          </a>
        </li>
      </ul>
    </div>
  );
};
