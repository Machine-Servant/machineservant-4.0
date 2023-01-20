import React from 'react';
import { Anchor, LI, UL } from './styles';

interface TocItem {
  url: string;
  title: string;
  items?: Array<TocItem>;
}

interface TableOfContentsProps {
  data?: Record<string, unknown> | null;
}

function isItems(items: Array<any>): items is Array<TocItem> {
  return items.every((item) => item.url && item.title);
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ data }) => {
  const renderItems = (items?: Array<unknown> | null) => {
    if (!items) return;
    if (!isItems(items)) return;

    return (
      <UL>
        {items?.map((item) => (
          <LI key={item.url}>
            <Anchor href={item.url}>{item.title}</Anchor>
            {item.items && renderItems(item.items)}
          </LI>
        ))}
      </UL>
    );
  };

  return (
    <details>
      <summary className="mb-4 cursor-pointer text-2xl font-medium">
        Table of Contents
      </summary>
      {renderItems(data?.items as Array<unknown>)}
    </details>
  );
};
