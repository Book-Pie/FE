import styled from "styled-components";

export const BestSellerContainer = styled.div``;

export const BestSellerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 6fr);
  grid-template-rows: repeat(2, 230px);
  row-gap: 10px;
  column-gap: 10px;
  & > div {
    ${props => props.theme.shadow[0]};
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(4, 4fr);
    grid-template-rows: repeat(3, 200px);
  }
  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: auto;
    grid-template-rows: repeat(6, 150px);
  }
`;

export const FirstCardWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  background-color: #7b5845;
  padding: 0.5rem;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  border-radius: 5px;

  & > a {
    height: 100%;
    display: flex;
    padding: 25px 15px 25px 20px;
    gap: 1rem;
    & > div:first-child {
      flex: 4;
    }
    & > div:last-child {
      flex: 7;
    }
  }

  :hover {
    transform: scale(1.02);
  }

  .card__rank {
    width: 70px;
    height: 70px;
    background-color: #ff1544;
    ${props => props.theme.shadow[0]};
    color: ${props => props.theme.colors.white};
    border-radius: 50%;
    font-size: 40px;
    font-weight: 500;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -1.6px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card__title {
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    color: ${props => props.theme.colors.white};
    font-size: 1.5rem;
  }

  .card__rank + .card__title {
    margin-top: 1rem;
  }
  .card__img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    ${props => props.theme.shadow[0]};
  }

  @media screen and (max-width: 800px) {
    .card__rank {
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
    }
    .card__title {
      font-size: 1.2rem;
    }
  }
  ${({ theme }) => theme.media.mobile} {
    .card__rank {
      font-size: 1.2rem;
    }
    .card__title {
      font-size: 0.8rem;
    }
  }
`;

export const CardWrapper = styled.div`
  background-color: #f2f2f2;
  padding: 1rem 0.7rem;
  overflow: hidden;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;

  a {
    display: flex;
    gap: 0.5rem;
    height: 100%;
    & > div:first-child {
      flex: 4;
      overflow: hidden;
    }
    & > div:last-child {
      flex: 6;
    }
  }

  :hover {
    transform: scale(1.02);
  }
  .card__img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    ${props => props.theme.shadow[0]};
  }

  .card__rank {
    padding-right: 3px;
    width: 40px;
    height: 40px;
    margin-left: 0.4rem;
    color: ${props => props.theme.colors.white};
    background-color: #7b5845;

    border-radius: 50%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -1.2px;
    text-align: center;
    ${props => props.theme.shadow[0]};
  }

  .card__title {
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    padding-right: 5px;
    color: ${p => p.theme.colors.darkGrey};
  }

  .card__rank + .card__title {
    margin-top: 10px;
  }

  @media screen and (max-width: 800px) {
    .card__rank {
      margin-left: 0.2rem;
      width: 35px;
      height: 35px;
      font-size: 1rem;
      ${({ theme }) => theme.shadow[0]};
    }
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0.5rem;
    .card__rank {
      margin-left: 0.2rem;
      width: 30px;
      height: 30px;
      font-size: 0.6rem;
      ${({ theme }) => theme.shadow[0]};
    }
    .card__title {
      padding: 0;
      font-size: 0.5rem;
    }
  }
`;

export const FirstCardSkeletonWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  padding: 20px;
  background-color: #edeae9;
  display: flex;
  gap: 20px;
`;
export const SkeletonCardWrapper = styled.div`
  background-color: #edeae9;
  padding: 0.7rem;
  display: flex;
  gap: 0.6rem;
`;
