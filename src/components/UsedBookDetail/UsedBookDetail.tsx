import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { usedBookDetailAsync, usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  CategoryArea,
  FlexWrapper,
  SwiperWrapper,
  UsedBookDetailInformationTop,
  UsedBookImg,
  UsedBookStoreInformationLeftWrapper,
} from "./style";
import UsedBookInquiry from "./UsedBookInquiry";
import RelatedUsedBook from "./RelatedUsedBook";
import UsedBookArea from "./UsedBookArea";
import UsedBookStoreInformation from "./UsedBookStoreInformation";
import UsedBookStoreReview from "./UsedBookStoreReview";

const UsedBookDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { params } = useRouteMatch<{ id: string }>();
  const { id } = params;
  const usedBookContent = useTypedSelector(usedBookDetailSelector);
  const { isLoggedIn } = useTypedSelector(userReduceSelector);

  const {
    usedBookId,
    sellerId,
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
    liked,
  } = usedBookContent.content;

  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "3rem",
      width: "35rem",
      height: "700px",
      margin: "21px 0px 0px 0px",
    }),
    [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(usedBookDetailAsync(id));
  }, [dispatch, id]);

  return (
    <>
      <CategoryArea>
        {fstCategory} &gt; {sndCategory}
      </CategoryArea>
      <UsedBookDetailInformationTop>
        <SwiperWrapper>
          <Swiper
            spaceBetween={30}
            slidesPerView={5}
            style={swiperStyle}
            cssMode
            navigation
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
          >
            {images &&
              images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <UsedBookImg src={`${process.env.BASE_URL}/image/${image}`} alt={`image${idx}`} />
                </SwiperSlide>
              ))}
          </Swiper>
        </SwiperWrapper>
        <UsedBookArea
          title={title}
          price={price}
          sellerId={sellerId}
          saleState={saleState}
          bookState={bookState}
          content={content}
          view={view}
          uploadDate={uploadDate}
          tags={tags}
          likeCount={likeCount}
          replyCount={replyCount}
          usedBookId={usedBookId}
          liked={liked}
          checkAuth={() => {
            if (isLoggedIn) {
              return true;
            }
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
              history.replace("/signIn");
            }
            return false;
          }}
        />
      </UsedBookDetailInformationTop>
      <FlexWrapper>
        <UsedBookStoreInformationLeftWrapper>
          <UsedBookStoreInformation />
          <UsedBookStoreReview />
        </UsedBookStoreInformationLeftWrapper>
        <UsedBookInquiry />
      </FlexWrapper>
      <RelatedUsedBook />
    </>
  );
};

export default UsedBookDetail;
