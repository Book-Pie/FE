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

export interface paramProps {
  isbn13: string;
  id?: number;
}

export interface matchProps {
  isExact: boolean;
  params: paramProps;
  url: string;
}

export interface BookDetailProps {
  match: matchProps;
}

export interface bookDetailContentProps {
  bookIntroText: string;
  authorIntroText: string;
  bookId: string;
}
