export interface ReviewsProps {
  bookId: number;
  getReviews: (bookId: number) => void;
}

export interface BookDetailCardWrapperProps {
  renderCondition?: boolean;
  children?: any;
}

export interface BookDetailPanelProps {
  title: string;
  imageUrl?: string;
  isMobile?: boolean;
  useTruncate?: boolean;
  useSkeleton?: boolean;
  authorName?: string;
  authorPhoto?: string;
}

export interface UsedBookRecommendListParam {
  isbn: string;
}

export interface BookRecommendListParam {
  isbn: string;
}
export interface BookDetailParam {
  isbn13: string;
}

export interface TextTruncateProps {
  text: string;
  lines: number;
  lineHeight: number;
  renderExpander?: ({
    isExpanded,
    isTruncated,
    expand,
  }: {
    isExpanded: boolean;
    isTruncated: boolean;
    expand: () => void;
  }) => any;
}

export interface ExpanderProps {
  isExpanded: boolean;
  text: string;
  onClick: (e: React.SyntheticEvent<any>) => void;
}

export interface ParamProps {
  isbn13: string;
  id?: number;
}
