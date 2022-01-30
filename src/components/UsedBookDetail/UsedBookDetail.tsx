import UsedBookInformationTop from "components/UsedBookDetail/UsedBookInformationTop";
import UsedBookStoreInformationBottom from "components/UsedBookDetail/UsedBookStoreInformationBottom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import { usedBookDetailAsync, usedBookSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";

const UsedBookDetail = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { params } = useRouteMatch<{ id: string }>();
  const { id } = params;
  const usedBookContent = useTypedSelector(usedBookSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  useEffect(() => {
    dispatch(usedBookDetailAsync(id));
  }, [dispatch, id]);

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
