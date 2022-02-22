import styled from "styled-components";

export const RelatedUsedBookSwiper = styled.div`
  cursor: pointer;

  .swiper-wrapper {
    display: flex;
    margin-left: 1rem;
  }

  .swiper-slide {
    width: 10rem;
    color: ${props => props.theme.colors.darkGrey};
  }

  .swiper-pagination {
    bottom: 2.5rem;
  }
  .swiper-pagination-bullet {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
    width: 15px;
    height: 15px;
    box-sizing: content-box;
  }
  .swiper-pagination-bullet-active {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
  }

  .swiper-button-next {
    align-items: center;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    border: 1px solid rgb(249, 249, 249);
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
    background-size: 12px;
    width: 25px;
    height: 25px;
    background-size: 50% auto;
    background-position: center;
  }

  .swiper-button-prev {
    align-items: center;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    border: 1px solid rgb(249, 249, 249);
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
    background-size: 12px;
    width: 25px;
    height: 25px;
    background-size: 50% auto;
    background-position: center;
  }
  --swiper-navigation-size: 12px;
`;

export const RelatedReviewWrapper = styled.div`
  border-top: 1px solid #e6e8eb;
  width: 100%;
  height: 600px;
  margin: 10px auto 0 auto;

  .swiper-button-next {
    position: relative;
    top: -9px;
    left: 40px;
  }

  .swiper-button-prev {
    position: relative;
    top: 10px;
    left: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 18rem;

    .swiper-button-next {
      position: relative;
      top: -9px;
      left: 52px;
    }

    .swiper-button-prev {
      position: relative;
      top: 10px;
      left: 22px;
    }
  }
`;

export const SubContentButtonWrapper = styled.div`
  text-align: right;

  .MuiButtonBase-root {
    position: inherit;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SubReplyFlexBox = styled(FlexBox)`
  padding-left: 28px;
`;
export const FlexBoxWrapper = styled(FlexBox)`
  justify-content: space-between;
`;

export const StoreReviewFlexBoxWrapper = styled(FlexBox)`
  justify-content: space-between;
  padding-left: 10px;
`;

export const PieImg = styled.img`
  width: 80px;
  height: 80px;
  padding: 15px;
`;

export const BigPieImg = styled.img`
  width: 71.3px;
  height: 71.3px;
`;

export const ContentWrapper = styled.div`
  padding-left: 20px;
  width: 90%;
`;

export const SubContentWrapper = styled.div`
  width: 100%;
`;

export const ProfileArea = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 10px 0 0;
  border-radius: 40px;
  background-color: #f2f2f2;
`;

export const SubProfileArea = styled(ProfileArea)`
  margin-bottom: 35px;
`;

export const ProductDetailTitle = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  margin: 20px 7px 16px 0px;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.45px;
  text-align: left;
  color: #4f3629;
  justify-content: space-between;

  ${({ theme }) => theme.media.mobile} {
    .MuiButtonBase-root {
      font-size: 0.5rem;
    }
  }
`;

export const ReplyItemWrapper = styled.div`
  min-height: 160px;
  margin: 0 0 24px;
  padding: 16px;
  border: solid 1px #51382b;
  border-radius: 10px;
  background-color: #fff;
  overflow-wrap: anywhere;
`;

export const SubReplyItemWrapper = styled(ReplyItemWrapper)`
  background-color: #edeae9;
  width: 100%;
  margin-left: 20px;
`;

export const ReplyItemNickName = styled.p`
  margin: 5px 0 5px 0;
  font-size: 18px;
  font-weight: 600;
`;

export const ReplyItemContent = styled.p`
  color: #51382b;
`;

export const SubReplyItemContent = styled(ReplyItemContent)`
  color: #51382b;
  padding-top: 20px;
  margin-bottom: 13px;
  min-height: 100px;
`;

export const ReviewListEmptyWrapper = styled.div`
  width: 100%;
  height: 160px;
  margin: 0 0 20px;
  padding: 16px;
  border: solid 1px #d1d5d9;
  background-color: #fff;
  border-radius: 10px;
`;

export const CardSmallTitle = styled.span`
  margin: 0 40px 6px 0;
  font-size: 16px;
  line-height: 1.88;
  letter-spacing: -0.4px;
  color: #525252;

  ${({ theme }) => theme.media.mobile} {
    margin: 0 0.7rem 6px 0;
    font-size: 0.7rem;
  }
`;

export const WideCardSmallTitle = styled.span`
  margin: 0 3.5rem 6px 0;
  font-size: 16px;
  line-height: 1.88;
  letter-spacing: -0.4px;
  color: #525252;

  ${({ theme }) => theme.media.mobile} {
    margin: 0 2rem 6px 0;
    font-size: 0.7rem;
  }
`;

export const CardBoldTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.67;
  letter-spacing: -0.45px;
  color: #4f3629;
`;

export const CategoryArea = styled.div`
  margin: 20px 40px 0px 0px;
  text-align: right;
`;

export const ProductDetailCardFlexWrapper = styled.div`
  display: flex;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-bottom: 100px;

  @media screen and (max-width: 930px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const UsedBookStoreInformationLeftWrapper = styled.div`
  flex-direction: column;
  height: 950px;
`;

export const CountWrapper = styled.span`
  color: #dd002c;
`;

export const UsedStoreUserThumbnail = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 8px;
  border-radius: 60px;
  background-color: #f2f2f2;
`;

export const ProductDetailCardWrapper = styled.div`
  width: 100%;
  height: 13rem;
  margin: 16px 27px 80px 0px;
  padding: 16px;
  border-radius: 4px;
  border: solid 1px #4f3629;
  background-color: #fff;

  ${({ theme }) => theme.media.mobile} {
    height: 9rem;
  }
`;

export const UsedBookStoreInformationWrapper = styled.div.attrs<{ height?: string; width?: string }>(props => ({
  type: "text",
  height: props.height,
}))<{ height?: string; width?: string }>`
  width: 88%;
  height: ${props => props.height};
  border-top: 1px solid #4f3629;
  margin-right: 45px;

  @media screen and (max-width: 1030px) {
    margin-right: 0px;
  }

  @media screen and (max-width: 930px) {
    width: ${props => props.width}%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 18rem;
    font-size: 0.7rem;
  }
`;

export const UsedBookDetailButton = styled.button<{ small?: boolean }>`
  font-size: ${props => (props.small ? "14px" : "18px")};
  height: ${props => (props.small ? "35px" : "53px")};
  margin: 0 10px 0 7px;
  border-radius: 5px;
  border: solid 1px #4f3629;
  background-color: #fff;
  color: #4f3629;
  font-weight: 600;
  flex: 1;

  &:hover {
    background-color: #edeae9;
    cursor: pointer;
  }
`;

export const LikeButton = styled.button<{ small?: boolean }>`
  &.UsedBookArea--nomal {
    font-size: ${props => (props.small ? "14px" : "18px")};
    height: ${props => (props.small ? "35px" : "53px")};
    margin: 0 10px 0 7px;
    border-radius: 5px;
    border: solid 1px #4f3629;
    background: rgb(204, 204, 204);
    color: rgb(255, 255, 255);
    font-weight: 600;
    flex: 0.5;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 5px;
  }

  &:hover {
    background-color: #edeae9;
    color: #4f3629;
    cursor: pointer;
  }

  &:active,
  &:hover,
  &:focus {
    .MuiSvgIcon-root {
      color: black;
    }
    span {
      background-color: #edeae9;
      color: #4f3629;
    }
  }

  &.UsedBookArea--active {
    font-size: ${props => (props.small ? "14px" : "18px")};
    height: ${props => (props.small ? "35px" : "53px")};
    margin: 0 10px 0 7px;
    border-radius: 5px;
    border: solid 1px #4f3629;
    font-weight: 600;
    flex: 1;

    .MuiSvgIcon-root {
      color: #dd002c;
    }
    span {
      background-color: #edeae9;
      color: #4f3629;
    }
  }
`;

export const BuyButton = styled.button`
  flex: 1;
  height: 53px;
  margin: 0 0 0 10px;
  border-radius: 5px;
  background-color: #4f3629;
  font-size: 15px;
  font-weight: 600;
  font-style: normal;
  line-height: 1.5;
  color: #fff;
  font-size: 17px;
  font-weight: 600;

  &:hover {
    background-color: #edeae9;
    color: #4f3629;
    cursor: pointer;
  }
`;

export const ProductDetailContent = styled.div`
  height: 15rem;
  margin: 16px 50px 50px 0px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  text-align: left;
  color: #707070;

  @media screen and (max-width: 930px) {
    height: 5rem;
  }
`;

export const RelatedUsedBookItemContentWrapper = styled.div`
  width: 12rem;
  height: 18rem;
  text-align: center;
`;

export const RelatedUsedBookHashTagItem = styled.div`
  color: #434343;
  font-size: 16px;
  font-weight: normal;
`;

export const RelatedUsedBookBoldTitle = styled.div<{ brown?: boolean }>`
  color: ${props => (props.brown ? "#4f3629" : "#222")};
  font-size: 20px;
  font-weight: bold;
  width: 12rem;
  text-align: center;

  @media screen and (max-width: 730px) {
    width: 10rem;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 5rem;
  }
`;

export const UsedBookThumbnail = styled.img`
  width: 12rem;
  height: 18rem;
  margin: 0 21px 20px 0;
  border: 0.5px solid black;

  @media screen and (max-width: 730px) {
    width: 10rem;
    height: 15rem;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 6rem;
    height: 8rem;
  }
`;

export const RelatedUsedBookWrapper = styled.div`
  border-top: 1px solid #e6e8eb;
  width: 100%;
  height: 600px;
  margin: 10px auto 0 auto;
`;

export const NormalTitle = styled.div`
  margin: 30px 0 10px 0;
  color: #4f3629;
  font-size: 25px;
  font-weight: bold;
  margin-left: 1rem;
`;

export const DeliverySpan = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  text-align: left;
  color: #525252;
  padding-right: 10px;
`;

export const BookStatus = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  text-align: left;
  color: #525252;
  padding-right: 5px;
`;

export const BookPrice = styled.div`
  font-size: 40px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  text-align: left;
  color: #dd002c;
`;

export const UsedBookImg = styled.img`
  width: 30rem;
  height: 45rem;
  object-fit: contain;

  ${({ theme }) => theme.media.mobile} {
    width: 20rem;
    height: 25rem;
  }
`;

export const UsedBookWrapper = styled.div`
  width: 47%;
  margin: 21px 28px 0px 15px;

  @media screen and (max-width: 1030px) {
    margin: 21px 0px 0px 15px;
  }

  @media screen and (max-width: 930px) {
    width: 85%;
    margin: 21px 0px 0px 15px;
  }
`;

export const InteractionArea = styled.div`
  height: 21px;
`;

export const TopInformationArea = styled.div`
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    flex-basis: 45%;
  }

  & > div:last-child {
    min-width: 150px;
    flex-basis: 55%;
    text-align: right;
  }

  @media screen and (max-width: 1100px) {
    flex-wrap: wrap-reverse;
    margin-bottom: 1rem;

    & > div:first-child {
      flex-basis: 60%;
    }

    & > div:last-child {
      min-width: 150px;
      flex-basis: 70%;
      text-align: left;
      padding-bottom: 2rem;

      span:first-child {
        margin-left: 0px;
      }
    }
  }

  @media screen and (max-width: 930px) {
    & > div:first-child {
      flex-basis: 40%;
    }

    & > div:last-child {
      min-width: 150px;
      flex-basis: 60%;
      text-align: right;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
    flex-wrap: wrap-reverse;

    & > div:first-child {
      flex-basis: 50%;
    }

    & > div:last-child {
      min-width: 150px;
      flex-basis: 70%;
      text-align: left;
      padding-bottom: 1.5rem;

      span:first-child {
        margin-left: 0px;
      }
    }
  }
`;

export const InteractionSpan = styled.span`
  margin-left: 14px;
`;

export const UsedStoreUserContentWrapper = styled.div`
  width: 350px;
  height: 120px;
  padding: 5px 0 0 30px;
  margin: 2px 0 6px 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 16px 96px 16px 0px;
  border-radius: 5px;
  background-color: #4f3629;
`;

export const UsedBookArea = styled.div`
  width: 600px;
  height: 700px;
  margin: 21px 28px 60px 0px;
  object-fit: contain;
`;

export const UsedBookDetailTopInformation = styled.div`
  display: flex;

  @media screen and (max-width: 930px) {
    justify-content: center;
  }
`;

export const InteractionArea1 = styled.div`
  width: 226px;
  height: 21px;
`;

export const SwiperWrapper = styled.div`
  cursor: pointer;

  .swiper-slide {
    width: 200px;
    color: ${props => props.theme.colors.darkGrey};
  }

  .swiper-pagination {
    bottom: 2.5rem;
  }
  .swiper-pagination-bullet {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
    width: 15px;
    height: 15px;
    box-sizing: content-box;
  }
  .swiper-pagination-bullet-active {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
  }

  .swiper-button-next {
    border-color: ${props => props.theme.colors.mainDarkBrown} !important;
    color: ${props => props.theme.colors.mainDarkBrown} !important;
  }
  .swiper-button-prev {
    border-color: ${props => props.theme.colors.mainDarkBrown} !important;
    color: ${props => props.theme.colors.mainDarkBrown} !important;
  }

  @media screen and (max-width: 1030px) {
    width: 33rem;
  }

  @media screen and (max-width: 930px) {
    margin-left: 5rem;
  }

  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
    margin-left: 14rem;
  }
`;

export const RelatedProductSwiperWrapper = styled.div`
  cursor: pointer;

  .swiper-pagination {
    bottom: 2.5rem;
  }

  .swiper-pagination-bullet {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
    width: 15px;
    height: 15px;
    box-sizing: content-box;
  }
  .swiper-pagination-bullet-active {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
  }

  .swiper-button-next {
    border-color: ${props => props.theme.colors.mainDarkBrown} !important;
    color: ${props => props.theme.colors.mainDarkBrown} !important;
  }
  .swiper-button-prev {
    border-color: ${props => props.theme.colors.mainDarkBrown} !important;
    color: ${props => props.theme.colors.mainDarkBrown} !important;
  }

  @media screen and (max-width: 1030px) {
    width: 33rem;
  }

  @media screen and (max-width: 930px) {
    margin-left: 0rem;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-left: 0rem;
  }
`;

export const TagContent = styled.span`
  padding: 5px;
  color: #dd002c;
`;

export const TagArea = styled.div`
  margin-bottom: 20px;
`;

export const RedContent = styled.span`
  color: #dd002c;
`;

export const WideRedContent = styled.span`
  margin-left: 10px;
  color: #dd002c;
`;

export const ButtonArea = styled.div`
  display: flex;
`;

export const DisabledButton = styled.div`
  flex: 2;
  padding: 15px;
  border: 1px solid #d1d5d9;
  border-radius: 5px;
  color: #d1d5d9;
  text-align: center;

  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
`;

export const HeartArea = styled.span`
  margin-top: 10px;
`;

export const DateContent = styled.div`
  color: #4f3629;
  font-weight: 700;
`;

export const SecretItem = styled.div`
  color: #d1d5d9;
`;

export const SellerNameTitle = styled.div`
  margin-left: 1.2rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 70px;
`;

export const ProfileImg = styled.div<{ storeReview: boolean }>`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    border-radius: 50%;
    height: ${props => (props.storeReview ? "70px" : "200px")};
    width: ${props => (props.storeReview ? "70px" : "200px")};
    ${({ theme }) => theme.shadow[0]};
  }
`;

export const NoneProfileImg = styled(ProfileImg)`
  img {
    padding: ${props => (props.storeReview ? "13px" : "30px")};
  }
`;

export const ReviewDate = styled.div`
  color: #d6d0cd;
  margin-right: 50px;
`;

export const RatingContent = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
`;

export const StoreReviewItemFlexBox = styled(FlexBox)`
  justify-content: space-between;
`;

export const StoreReviewItemWrapper = styled.div`
  height: 130px;
  margin: 0 0 20px;
  padding: 16px;
  background-color: #51382b;
  border-radius: 8px;
`;

export const StoreReviewItemContent = styled.div`
  width: 20rem;
  height: 39px;
  margin: 8px 40px 12px 0px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.4px;
  text-align: left;
  color: #d6d0cd;

  ${({ theme }) => theme.media.mobile} {
    width: 12rem;
  }
`;

export const StoreReviewItemNickName = styled.div`
  width: 200px;
  height: 21px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.45px;
  text-align: left;
  color: #fff;
`;

export const UsedBookStoreProfileImg = styled.div`
  flex: 6;
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    margin-bottom: 8px;
    border-radius: 80%;
  }
`;

export const UsedBookStoreNoneProfileImg = styled.div`
  flex: 6;
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    margin-bottom: 8px;
    border-radius: 80%;
  }
`;

export const StoreReviewProfileImg = styled.div`
  flex: 6;
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
    border-radius: 80%;
  }
`;

export const StoreReviewNoneProfileImg = styled(StoreReviewProfileImg)`
  img {
    padding: 10px;
  }
`;

export const FollowButton = styled.div`
  margin-left: 10px;

  .MuiButtonBase-root {
    margin-left: 10px;
  }

  .MuiTooltip-tooltip {
    width: 160px;
  }

  ${({ theme }) => theme.media.mobile} {
    .MuiButtonBase-root {
      font-size: 0.6rem;
    }
  }
`;

export const ProductDetailProfileImg = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    ${({ theme }) => theme.shadow[0]};
  }
`;

export const ProductDetailNoneProfileImg = styled(ProductDetailProfileImg)`
  img {
    padding: 20px;
  }
`;

export const BottomArea = styled.div`
  margin-top: 20px;
`;

export const UsedStoreFlexBox = styled.div`
  display: flex;
  height: 80px;

  div {
    margin-right: 30px;
  }
`;

export const UsedBookDetailInformationTop = styled.div`
  display: flex;

  @media screen and (max-width: 930px) {
    flex-wrap: wrap;
    margin-bottom: 1rem;
    justify-content: center;
    margin-bottom: 40px;

    .SwiperWrapper {
      margin-left: 150px;
    }
  }
`;
