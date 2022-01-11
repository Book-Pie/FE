import styled from "styled-components";

export const BannerImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 100%;
  width: 100%;
`;

export const Wrapper = styled.div`
  .swiper-button-next {
    border-color: ${props => props.theme.colors.white} !important;
    color: ${props => props.theme.colors.white} !important;
  }
  .swiper-button-prev {
    border-color: ${props => props.theme.colors.white} !important;
    color: ${props => props.theme.colors.white} !important;
  }
`;
