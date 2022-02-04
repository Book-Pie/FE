import styled from "styled-components";

export const MainBannerWrapper = styled.div`
  .swiper-button-next {
    border-color: ${props => props.theme.colors.white} !important;
    color: ${props => props.theme.colors.white} !important;
  }
  .swiper-button-prev {
    border-color: ${props => props.theme.colors.white} !important;
    color: ${props => props.theme.colors.white} !important;
  }

  img {
    min-height: 200px;
    display: block;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
`;
export const MainBannerContainer = styled.div`
  max-height: 380px;
  ${p => p.theme.shadow[0]}
`;
