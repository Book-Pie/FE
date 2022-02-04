import styled from "styled-components";

export const MainBannerWrapper = styled.section`
  .swiper-button-next {
    border-color: ${({ theme }) => theme.colors.white} !important;
    color: ${({ theme }) => theme.colors.white} !important;
  }
  .swiper-button-prev {
    border-color: ${({ theme }) => theme.colors.white} !important;
    color: ${({ theme }) => theme.colors.white} !important;
  }

  img {
    height: 380px;
    display: block;
    margin: 0 auto;
    width: 100%;
    transition: height 0.5s ease-in;
    ${({ theme }) => theme.media.tab} {
      height: 250px;
    }
    ${({ theme }) => theme.media.mobile} {
      height: 200px;
    }
  }
`;
export const MainBannerContainer = styled.div`
  ${p => p.theme.shadow[0]}
`;
