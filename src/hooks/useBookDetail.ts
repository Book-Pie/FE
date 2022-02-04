import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bookDetailAsync } from "modules/Slices/book/bookSlice";
import { useTypedSelector } from "modules/store";
import { bookInfo } from "modules/Slices/book/types";
import { paramProps } from "components/BookDetail/types";

export const useBookDetail = ({ isbn13 }: paramProps) => {
  const dispatch = useDispatch();
  const bookDetailContent = useTypedSelector(state => state.bookReduce.content.data);
  const [bookContent, setBookContent] = useState<bookInfo[]>([]);

  useEffect(() => {
    dispatch(bookDetailAsync({ isbn13 }));
  }, [dispatch, isbn13]);

  useEffect(() => {
    if (bookDetailContent !== undefined) {
      setBookContent(bookDetailContent.item);
    }
  }, [bookDetailContent]);

  return {
    bookContent,
  };
};
