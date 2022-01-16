import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bookDetailAsync } from "src/modules/Slices/bookDetail/bookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import { bookInfo } from "src/modules/Slices/bookDetail/types";

export const useBookDetail = (itemId: number) => {
  const dispatch = useDispatch();
  const bookDetailContent = useTypedSelector(state => state.bookDetailReduce.content.data);
  const [bookContent, setBookContent] = useState<bookInfo[]>([]);

  useEffect(() => {
    dispatch(bookDetailAsync(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    if (bookDetailContent !== undefined) {
      setBookContent(bookDetailContent.item);
    }
  }, [bookDetailContent]);

  return {
    bookContent,
  };
};
