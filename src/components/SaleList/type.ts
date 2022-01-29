export interface Page {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: string;
  modifiedDate: string | null;
  state: string;
  likeCount: number;
  replyCount: number;
}

export interface ListState {
  pageCount: number;
  pages: Page[];
  page: number;
  isEmpty: boolean;
}
export interface Response {
  success: boolean;
  data: {
    pageCount: number;
    pages: Page[];
  };
  error: null;
}

export type StateEnumType = {
  [key: string]: string;
};

export interface Content {
  pages: Page[];
  handleLatestClick: (id: number) => () => void;
  titleFilter: string | null;
  select: string;
}
