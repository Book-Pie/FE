import styled from "styled-components";

export const BookReviewListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SmallCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const BookReviewContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  min-height: 1200px;
`;

export const ReviewListSkeletonRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  &:first-child {
    margin-top: 0;
  }
`;

export const BookReviewTitle = styled.div`
  height: 23px;
  color: #40474d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 5px 10px 10px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const BookReviewBox = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 230px;
  height: 200px;
  margin: 20px;
`;

export const CategoryWrapper = styled.div`
  margin-top: 30px;
`;

export const ReviewHomeListWrapper = styled.div`
  margin-bottom: 150px;
  padding: 0 16px 0 16px;
`;

export const ReviewListWrapper = styled.div`
  padding: 0 16px 0 16px;
`;

export const ImgWrapper = styled.div``;

export const ImageItem = styled.img`
  height: 140px;
  width: 100px;
  margin: 0 60px 0 65px;
`;

export const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
export const LinkWrapper = styled.span`
  flex: 1;
  a {
    display: block;
  }
`;

export const ThumbnailWrapper = styled.div`
  overflow: hidden;
`;

export const MainTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin-top: 50px;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin: 50px 0px 22px 0px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(99, 110, 114, 0.1);
`;

export const BestsellerItemWrapper = styled.div`
  width: 220px;
  height: 360px;
`;

export const BestsellerThumbnail = styled.img`
  width: 205px;
  height: 290px;
  margin: 0 21px 20px 0;
  border: 0.5px solid rgba(99, 110, 114, 0.1);
  border-radius: 5px;
  transition: transform 0.4s, box-shadow 0.4s ease-in;

  :hover {
    transform: scaleX(1.02) scaleY(1.02);
  }
`;

export const ListTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const BestSellerWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin: 10px auto 0 auto;
`;

export const BestSellerListWrapper = styled.div`
  display: flex;
`;

export const BookReviewMainTap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid rgba(189, 195, 199, 0.4);

  .reviewHome {
    margin-right: 30px;
  }

  .category {
    margin-left: 30px;
  }

  .reviewMainButton--Active {
    font-weight: bold;
    border-bottom: 2px solid black;
  }

  a {
    padding: 1rem;
    align-items: center;
    // font-weight: bold;
    opacity: 0.5;
    text-align: center;
  }
`;

export const SwiperWrapper = styled.div`
  cursor: pointer;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-wrapper {
    width: 1200px;
    display: flex;
  }

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
`;
