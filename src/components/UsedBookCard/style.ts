import styled from "styled-components";

interface WrapperProps {
  width?: number;
}

export const Wrapper = styled.div<WrapperProps>`
  cursor: pointer;
  width: ${props => props.width}%;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.4s, box-shadow 0.4s ease-in;
  ${props => props.theme.shadow[30]};

  &:hover {
    transform: scale(1.02);
    ${props => props.theme.shadow[50]};
  }
  a {
    height: 100%;
  }

  .usedBookCard__imgBox {
    position: relative;
    padding-top: 200px;
    img {
      position: absolute;
      display: block;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .usedBookCard__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    & > div + div {
      margin-top: 1rem;
    }
  }

  .usedBookCard__title {
    font-weight: 900;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    line-height: 1.2;
    color: ${props => props.theme.colors.mainDarkBrown};
  }

  .usedBookCard__price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 1.1rem;
    strong {
      font-weight: 900;
    }
  }
`;

export const EmptyWrapper = styled.div`
  width: 20%;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;
