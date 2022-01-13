export interface IProps {
  title?: string;
  event?: () => void;
  children?: React.ReactNode;
}

export interface CardProps {
  bookName?: string;
  bookCategory?: string;
  authorName?: string;
  bookIntroTitle?: string;
  bookIntroText?: string;
  authorIntroTitle?: string;
  authorIntroText?: string;
  anotherBooks?: string;
  bookThumnail?: string;
  image?: string;
  smallImage?: any;
  publisher: string;
}
