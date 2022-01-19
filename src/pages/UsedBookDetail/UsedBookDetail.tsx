import UsedBookInformationTop from "components/UsedBookDetail/UsedBookInformationTop";
import UsedBookStoreInformationBottom from "components/UsedBookDetail/UsedBookStoreInformationBottom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usedBookDetailAsync, usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import { MatchProps } from "./types";

const UsedBookDetail = ({ match }: MatchProps) => {
  const dispatch = useDispatch();
  const { params } = match;
  const { id } = params;
  const usedBookContent = useTypedSelector(usedBookSelector);

  useEffect(() => {
    dispatch(usedBookDetailAsync(id));
  }, [dispatch, id]);

  const {
    usedBookId,
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
    likeCount,
    replyCount,
  } = usedBookContent.content;

  return (
    <>
      <UsedBookInformationTop
        usedBookId={usedBookId}
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
        likeCount={likeCount}
        replyCount={replyCount}
      />
      <UsedBookStoreInformationBottom />
    </>
  );
};

export default UsedBookDetail;
