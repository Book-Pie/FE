import styled from "styled-components";

export const Wrapper = styled.div`
  .swiper-button-next {
    border-color: ${props => props.theme.colors.white} !important;
    color: ${props => props.theme.colors.white} !important;
  }
  .swiper-button-prev {
    border-color: ${props => props.theme.colors.white} !important;
    color: ${props => props.theme.colors.white} !important;
  }
  img {
    display: block;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
`;
export const MainBannerContainer = styled.div`
  height: 380px;
  ${p => p.theme.shadow[0]}
`;
