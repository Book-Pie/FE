import UsedBookInformationTop from "components/UsedBookDetail/UsedBookInformationTop";
import UsedBookStoreInformationBottom from "components/UsedBookDetail/UsedBookStoreInformationBottom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usedBookDetailAsync, usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetail";
import { useTypedSelector } from "src/modules/store";
import { MatchProps } from "./types";

const UsedBookDetail = ({ match }: MatchProps) => {
  const { params } = match;
  let { id } = params;
  console.log("UsedBookDetail id : ", id);
  id = parseInt(id);

  const dispatch = useDispatch();
  const usedBookContent = useTypedSelector(usedBookSelector);

  useEffect(() => {
    dispatch(usedBookDetailAsync(id));
  }, [dispatch, id]);

  const {
    usedBookId,
    isbn,
    sellerId,
    sellerName,
    price,
    bookState,
    content,
    fstCategory,
    images,
    saleState,
    sndCategory,
    tags,
    title,
    uploadDate,
    view,
  } = usedBookContent.content;

  return (
    <>
      <UsedBookInformationTop
        usedBookId={usedBookId}
        isbn={isbn}
        sellerId={sellerId}
        sellerName={sellerName}
        price={price}
        title={title}
        content={content}
        uploadDate={uploadDate}
        view={view}
        bookState={bookState}
        saleState={saleState}
        fstCategory={fstCategory}
        sndCategory={sndCategory}
        tags={tags}
        images={images}
      />
      <UsedBookStoreInformationBottom />
    </>
  );
};

export default UsedBookDetail;
