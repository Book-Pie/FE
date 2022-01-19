import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bookDetailAsync } from "src/modules/Slices/bookDetail/bookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import { bookInfo } from "src/modules/Slices/bookDetail/types";
import { paramProps } from "src/pages/BookDetail/types";

export const useBookDetail = ({ isbn13 }: paramProps) => {
  const dispatch = useDispatch();
  const bookDetailContent = useTypedSelector(state => state.bookDetailReduce.content.data);
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
