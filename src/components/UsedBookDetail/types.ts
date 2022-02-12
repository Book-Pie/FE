export interface MatchProps {
  match: {
    isExact: boolean;
    params: { id: string };
    path: string;
    url: string;
  };
}

export interface UsedBookInformationTopParam {
  title: string;
  price: number;
  content: string;
  view: number;
  uploadDate: Date;
  fstCategory: string;
  sndCategory: string;
  tags: string[];
  usedBookId: number;
  sellerId: number;
  sellerName: string;
  images: string[];
  likeCount: string | number;
  replyCount: number;
  liked: boolean;
  bookState: string;
  saleState: string;
}
