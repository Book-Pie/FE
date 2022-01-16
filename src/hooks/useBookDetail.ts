import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bookDetailAsync } from "src/modules/Slices/bookDetail/bookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import { bookInfo } from "src/modules/Slices/bookDetail/types";
import { paramProps } from "src/pages/BookDetail/types";

export const useBookDetail = ({ id, itemId }: paramProps) => {
  itemId = parseInt(itemId);

  const dispatch = useDispatch();
  const bookDetailContent = useTypedSelector(state => state.bookDetailReduce.content.data);
  const [bookContent, setBookContent] = useState<bookInfo[]>([]);

  useEffect(() => {
    dispatch(bookDetailAsync({ itemId, id }));
  }, [dispatch, id, itemId]);

  useEffect(() => {
    if (bookDetailContent !== undefined) {
      setBookContent(bookDetailContent.item);
    }
  }, [bookDetailContent]);

  return {
    bookContent,
  };
};
