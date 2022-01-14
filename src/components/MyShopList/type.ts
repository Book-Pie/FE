export interface IPage {
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

export interface IList {
  pageCount: number;
  pages: IPage[];
  page: number;
  isEmpty: boolean;
}
export interface AxioseReponse {
  success: boolean;
  data: {
    pageCount: number;
    pages: IPage[];
  };
  error: null;
}

export type StateEnumType = {
  [key: string]: string;
};

export interface IContent {
  pages: IPage[];
  handleLatestClick: (id: number) => () => void;
  titleFilter: string | undefined;
  select: string;
}
