import styled from "styled-components";

export const Wrapper = styled.div`
  cursor: pointer;
  width: 20%;
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

  .usedBookCard__cotent {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    & > div + div {
      margin-top: 1rem;
    }
  }

  .usedBookCard__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    text-align: center;
    font-weight: 900;
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
