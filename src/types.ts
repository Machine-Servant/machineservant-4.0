export type ColorOptions = 'green' | 'blue' | 'gold' | 'purple';

export interface BlogPageContext {
  readonly limit?: number;
  readonly skip?: number;
  readonly numPages?: number;
  readonly currentPage?: number;
  readonly totalCount?: number;
  readonly paginated?: boolean;
  readonly renderTagList?: boolean;
}

export interface TaggedPostsContext {
  readonly tag: string;
}
