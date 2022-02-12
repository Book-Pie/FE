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
}
