import {
  FavoriteCategories,
  UsedBookDetailReplyResponse,
  UsedBookDetailSubReplyResponse,
} from "src/modules/Slices/usedBookDetail/types";

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
  likeCount: number;
  replyCount: number;
  liked: boolean;
  bookState: string;
  saleState: string;
}

export interface UsedBookAreaProps {
  title: string;
  price: number;
  content: string;
  view: number;
  uploadDate: Date;
  tags: string[];
  likeCount: number;
  replyCount: number;
  usedBookId: number;
  sellerId: number;
  saleState: string;
  bookState: string;
  liked: boolean;
  checkAuth: () => boolean;
}

export interface UsedBookReplyListParam {
  review: UsedBookDetailReplyResponse;
  sellerId: number;
  sellerName: string;
  idx: number;
  page: number;
}

export interface SubmitParam {
  usedBookId: number;
  userId: number;
  content: string;
}

export interface SubReplyParam {
  sx: {
    width: string;
    fontSize: string;
    padding: string;
    right: string;
  };
  sellerName: string;
  subReply?: UsedBookDetailSubReplyResponse;
  replyId: number;
  isSubReplyAdd?: boolean;
  sellerId: number;
  page: number;
}

export interface UsedStoreUserContentParam {
  sellerName: string;
  favoriteCategories: FavoriteCategories[];
  totalSales: number;
}
