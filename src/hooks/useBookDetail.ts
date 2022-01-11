import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookDetailAsync } from "src/modules/Slices/bookDetail/bookDetailSlice";
import { useTypedSelector } from "src/modules/store";

export const useBookDetail = (itemId: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const bookDetailContent = useTypedSelector(state => state.bookDetailReduce.content.data);

  if (itemId && bookDetailContent === undefined) {
    dispatch(bookDetailAsync(itemId));
  }
  const bookDetailItem = bookDetailContent?.item[0];

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return {
    bookDetailItem,
    loading,
  };
};
