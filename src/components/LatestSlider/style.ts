import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.mainLightBrown};
`;

export const Image = styled.div`
  width: 100%;
  height: 280px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  width: 200px;
  height: 116px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  .card__title {
    width: 150px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    line-height: 1.2;
  }
  .card__category {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.36px;
    text-align: center;
    word-wrap: break-word;
    color: #434343;
  }
  .card__price {
    height: 24px;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #1565c0;
  }
  .card__state {
    height: 24px;
    font-size: 25px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #4f3629;
  }
`;
export const SwipierWrapper = styled.div`
  margin-bottom: 100px;
  cursor: pointer;

  .swiper-slide {
    width: 190px;
    color: ${props => props.theme.colors.darkGrey};
  }

  .swiper-pagination {
    bottom: 0;
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
