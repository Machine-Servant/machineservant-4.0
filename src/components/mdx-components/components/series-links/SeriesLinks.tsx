import { Link } from 'gatsby';
import React from 'react';

export interface SeriesLinksProps<T> {
  currentPage: string;
  pageMap: {
    page: T;
    url: string;
    label: string;
  }[];
}

export function SeriesLinks<T>({ pageMap, currentPage }: SeriesLinksProps<T>) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-medium">
        Building a Gatsby Blog Series
      </h2>
      <ul>
        {pageMap.map(({ page, url, label }) => (
          <li>
            {page === currentPage ? (
              <p>➩ {label}</p>
            ) : (
              <Link to={`/blog/${url}`} className="text-lochmara-500 underline">
                <p>{label}</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
