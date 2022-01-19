import styled from "styled-components";

export const FlexBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const PieImg = styled.img`
  width: 45px;
  height: 45px;
`;

export const BigPieImg = styled.img`
  width: 71.3px;
  height: 71.3px;
`;

export const ContentWrapper = styled.div`
  padding-left: 20px;
`;

export const ProfileArea = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 10px 0 0;
  padding: 16.5px 15.3px 16.5px 15.3px;
  border-radius: 40px;
  background-color: #f2f2f2;
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
`;

export const ReplyItemWrapper = styled.div`
  // width: 100%;
  height: 112px;
  margin: 0 0 20px;
  padding: 16px;
  border: solid 1px #51382b;
  border-radius: 10px;
  background-color: #fff;
`;

export const ReplyItemNickName = styled.p`
  margin: 5px 0 5px 0;
  font-size: 18px;
  font-weight: 600;
`;

export const ReplyItemContent = styled.p`
  color: #51382b;
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
`;

export const CardBoldTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.67;
  letter-spacing: -0.45px;
  color: #4f3629;
`;

export const CategoryArea = styled.div`
  margin: 20px 30px 0px 0px;
  text-align: right;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const UsedBookStoreInformationLeftWrapper = styled.div`
  flex-direction: column;
`;

export const CountWrapper = styled.span`
  color: #dd002c;
`;

export const UsedStoreUserThumbnail = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 8px;
  padding: 22.8px 21px;
  border-radius: 60px;
  background-color: #f2f2f2;
`;

export const ProductDetailCardWrapper = styled.div`
  width: 543px;
  height: 200px;
  margin: 16px 27px 80px 0px;
  padding: 16px 158px 16px 16px;
  border-radius: 4px;
  border: solid 1px #4f3629;
  background-color: #fff;
`;

export const UsedBookStoreInformationWrapper = styled.div.attrs(props => ({
  type: "text",
  height: props.height,
}))`
  width: 544px;
  height: ${props => props.height};
  border-top: 1px solid #4f3629;
  margin-right: 45px;
`;

export const UsedBookDetailButton = styled.button`
  font-size: ${props => (props.small ? "14px" : "18px")};
  width: ${props => (props.small ? "100px" : "160px")};
  height: ${props => (props.small ? "35px" : "53px")};
  margin: 0 10px 0 7px;
  border-radius: 5px;
  border: solid 1px #4f3629;
  background-color: #fff;
  color: #4f3629;
  font-weight: 600;

  &:hover {
    background-color: #edeae9;
    cursor: pointer;
  }
`;

export const BuyButton = styled.button`
  width: 200px;
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
  width: 533px;
  height: 327px;
  margin: 16px 50px 87px 0px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  text-align: left;
  color: #707070;
`;

export const RelatedUsedBookItemContentWrapper = styled.div`
  width: 187px;
  height: 140px;
  text-align: center;
`;

export const RelatedUsedBookHashTagItem = styled.div`
  color: #434343;
  font-size: 16px;
  font-weight: normal;
`;

export const RelatedUsedBookBoldTitle = styled.div`
  color: ${props => (props.brown ? "#4f3629" : "#222")};
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0px 10px 0px;
  width: 187px;
`;

export const UsedBookThumbnail = styled.div`
  width: 187px;
  height: 281px;
  margin: 0 21px 20px 0;
  border: 0.5px solid black;
`;

export const RelatedUsedBookWrapper = styled.div`
  border-top: 1px solid #4f3629;
  width: 100%;
  height: 450px;
  margin: 10px auto 0 auto;
`;

export const NormalTitle = styled.div`
  margin: 30px 0 30px 0;
  color: #4f3629;
  font-size: 25px;
  font-weight: bold;
`;

export const ProductDetail = styled.div``;

export const DeliverySpan = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  text-align: left;
  color: #525252;
`;

export const DeliveryArea = styled.div``;

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
  width: 544px;
  height: 700px;
  margin: 21px 28px 50px 0px;
  object-fit: contain;
`;

export const UsedBookWrapper = styled.div`
  width: 600px;
  height: 700px;
  margin: 21px 28px 50px 0px;
  object-fit: contain;
`;

export const InteractionArea = styled.div`
  width: 240px;
  height: 21px;
`;

export const TopInformationArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InteractionSpan = styled.span`
  // color: rgb(204, 204, 204);
  margin-left: 14px;
`;

export const UsedStoreUserContentWrapper = styled.div`
  width: 287px;
  height: 120px;
  padding: 5px 0 0 30px;
  margin: 2px 0 6px 0;
`;

export const Line = styled.div`
  width: 600px;
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

export const UsedBookDetailWrapper = styled.div`
  display: flex;
`;

export const InteractionArea1 = styled.div`
  width: 226px;
  height: 21px;
`;

export const SwiperWrapper = styled.div`
  cursor: pointer;

  .swiper-slide {
    width: 190px;
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
`;
