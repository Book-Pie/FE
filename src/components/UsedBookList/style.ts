import styled from "styled-components";

export const UsedBookFilter = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  min-height: 32px;
  flex-wrap: wrap;
  gap: 10px;

  div {
    cursor: pointer;
  }

  ${({ theme }) => theme.media.mobile} {
    div {
      height: 40px;
    }
  }
`;

export const UsedBookCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export const UsedBookSearchWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.media.mobile} {
    h4 {
      text-align: center;
      font-size: 1.5rem;
    }
  }
  & > div + div {
    position: absolute;
    top: 110%;
    width: 100%;
    z-index: 1;
  }
`;

export const UsedBookCategoryLinkWrapper = styled.span`
  flex: 1;
  a {
    display: block;
  }
`;

export const UsedBookMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;

  p {
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.mainDarkBrown};
  }

  a {
    display: block;
    padding: 15px 14px;
  }
`;

export const DropDownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  div {
    width: 7rem;
    height: 50px;
  }
  a {
    color: ${({ theme }) => theme.colors.darkGrey};
    font-weight: 100;
  }
`;

export const UsedBookCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5rem 1rem 0.5rem;
  border-radius: 5px;

  ${({ theme }) => theme.shadow[0]};
  ${({ theme }) => theme.media.mobile} {
    padding: 0.1rem 0.1rem 0.5rem;
    margin: 2rem -0.5rem 0 -0.5rem;
  }
`;

export const UsedBookCardWrapper = styled.div<{ width?: number }>`
  cursor: pointer;
  width: ${props => props.width}%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  padding: 0 0.5rem;
  margin-top: 15px;
  transition: transform 0.4s, box-shadow 0.4s ease-in;

  &:hover {
    transform: scale(1.02);
  }

  a {
    border: 1px solid #edeae9;
    display: block;
  }
  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .usedBookCard__imgBox {
    position: relative;
    padding-top: 300px;
    border-bottom: 1px solid #edeae9;

    img {
      position: absolute;
      display: block;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .usedBookCard__content {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 0 0 0;

    & > div + div {
      margin: 0.5rem 0;
    }
  }

  .usedBookCard__title {
    height: 2rem;
    font-size: 1rem;
    margin: 0 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  .usedBookCard__price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 1.1rem;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.info};
    text-overflow: ellipsis;
    white-space: nowrap;
    strong {
      font-weight: 900;
    }
  }
  .usedBookCard__state {
    font-size: 1rem;
    text-align: center;
    padding: 0.6rem;
  }

  @media screen and (max-width: 1000px) {
    width: 25%;
    padding: 0 0.3rem;
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 800px) {
    width: 33.3%;
    padding: 0 0.3rem;
    margin-top: 0.8rem;
    .usedBookCard__imgBox {
      padding-top: 250px;
    }
    .usedBookCard__price {
      font-size: 1rem;
      strong {
        font-weight: 900;
        font-size: 1.1rem;
      }
    }
  }

  ${({ theme }) => theme.media.mobile} {
    width: 50%;
    padding: 0 0.2rem;
    margin-top: 0.5rem;
    .usedBookCard__content {
      padding-top: 0.3rem;
    }

    .usedBookCard__imgBox {
      padding-top: 200px;
    }

    .usedBookCard__title {
      font-size: 0.8rem;
      line-height: 1.2;
    }
    .usedBookCard__price {
      font-size: 0.6rem;
      strong {
        font-weight: 900;
        font-size: 0.8rem;
      }
    }
    .usedBookCard__state {
      font-size: 0.7rem;
      text-align: center;
      padding: 0.3rem 0;
    }
  }
`;

export const UsedBookCardEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5rem 0;
  gap: 1.5rem;
  flex: 1;
  margin: 0 auto;

  span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  img {
    width: 100%;
    padding: 0 1rem;
    max-width: 300px;
  }
  ${({ theme }) => theme.media.mobile} {
    gap: 0.5rem;
    span {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }
`;
