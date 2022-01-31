import { useHistory } from "react-router";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { UsedBookDetailResponse } from "modules/Slices/usedBookDetail/types";
import { useTypedSelector } from "modules/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useMemo } from "react";
import { Navigation, Pagination } from "swiper";
import { CategoryArea, UsedBookDetailWrapper, UsedBookImg, SwiperWrapper } from "./style";
import UsedBookArea from "./UsedBookContent/UsedBookArea";

const UsedBookInformationTop = ({
  title,
  price,
  content,
  view,
  uploadDate,
  fstCategory,
  sndCategory,
  tags,
  images,
  likeCount,
  replyCount,
  usedBookId,
  sellerId,
  saleState,
  bookState,
}: UsedBookDetailResponse) => {
  const history = useHistory();
  const { isLoggedIn } = useTypedSelector(userReduceSelector);

  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "50px",
      width: "544px",
      height: "700px",
      margin: "21px 28px 50px 0px",
    }),
    [],
  );

  return (
    <>
      <CategoryArea>
        {fstCategory} &gt; {sndCategory}
      </CategoryArea>
      <UsedBookDetailWrapper>
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
      </UsedBookDetailWrapper>
    </>
  );
};

export default UsedBookInformationTop;
