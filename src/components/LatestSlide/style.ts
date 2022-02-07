import styled from "styled-components";

export const LatestSliderContainer = styled.div`
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  .swiper {
    padding-bottom: 2.5rem;
    width: 1100px;
    margin-left: -1rem;
    transition: width 0.5s ease-in;
  }
  .swiper-slide {
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
  ${({ theme }) => theme.media.tab} {
    margin: 0 -1rem;
    margin-bottom: 1.5rem;
    .swiper {
      padding-bottom: 0;
      width: 1000px;
    }
    .swiper-slide {
      margin-right: 10px !important;
    }
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0 -1rem;
    margin-bottom: 1.5rem;
    .swiper {
      padding-bottom: 0;
      width: 950px;
    }
    .swiper-slide {
      margin-right: 10px !important;
    }
  }
`;

export const LatestSliderCardWrapper = styled.div`
  height: 350px;
  transition: height 0.5s linear;

  ${({ theme }) => theme.media.tab} {
    height: 350px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 300px;
  }
`;

export const LatestSliderCardImage = styled.div`
  border-bottom: 1px solid rgba(99, 110, 114, 0.1);
  height: 80%;

  ${({ theme }) => theme.media.mobile} {
    height: 60%;
  }
`;

export const LatestSliderCardInfo = styled.div`
  height: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  .card__title {
    padding: 0 1rem;
    font-size: 1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.2;
    color: ${p => p.theme.colors.darkGrey};
  }
  .card__price {
    letter-spacing: -0.4px;
    color: ${p => p.theme.colors.info};
    span:nth-child(1) {
      font-size: 0.9rem;
    }
    span:nth-child(2) {
      font-size: 0.8rem;
    }
  }
  .card__state {
    font-size: 1rem;
    line-height: normal;
    letter-spacing: -0.4px;
    color: ${p => p.theme.colors.darkGrey};
  }
  .red {
    font-weight: bold;
    color: ${p => p.theme.colors.error};
  }

  ${({ theme }) => theme.media.tab} {
    .card__title {
      margin-top: 0.2rem;
      font-size: 1.1rem;
      padding: 0 0.8rem;
      min-height: 1.4rem;
    }
    .card__price {
      span:nth-child(1) {
        font-size: 1rem;
      }
      span:nth-child(2) {
        font-size: 0.9rem;
      }
    }
    .card__state {
      font-size: 0.8rem;
      font-weight: bold;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    height: 40%;
    gap: 0.3rem;

    .card__title {
      margin-top: 0.2rem;
      padding: 0 0.8rem;
      font-size: 0.6rem;
      min-height: 1.2rem;
    }

    .card__price {
      span:nth-child(1) {
        font-size: 0.6rem;
      }
      span:nth-child(2) {
        font-size: 0.5rem;
      }
    }
    .card__state {
      font-size: 0.5rem;
      font-weight: bold;
    }
  }
`;
