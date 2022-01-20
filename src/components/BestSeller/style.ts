import styled from "styled-components";

export const BestSellerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 200px);
  grid-template-rows: repeat(2, 200px);
  grid-auto-rows: minmax(100px, auto);
  row-gap: 10px;
  & > div {
    ${props => props.theme.shadow[0]};
  }
`;

export const FirstCardWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  background-color: ${props => props.theme.colors.mainDarkBrown};
  margin: 0 5px;
  padding: 10px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  border-radius: 5px;

  a {
    display: flex;
    padding: 25px 15px 25px 30px;
    gap: 10px;
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
    width: 76px;
    height: 76px;
    background-color: #dd002c;
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
    height: 250px;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0 15px;
    color: ${props => props.theme.colors.white};
    font-size: 30px;
  }

  .card__rank + .card__title {
    margin-top: 15px;
  }
  .card__img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    ${props => props.theme.shadow[0]};
  }
`;

export const CardWrapper = styled.div`
  background-color: #f2f2f2;
  margin: 0 5px;
  padding: 15px 10px;
  overflow: hidden;
  height: 100%;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;

  a {
    display: flex;
    gap: 5px;
    & > div:first-child {
      flex: 3;
    }
    & > div:last-child {
      flex: 7;
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
    width: 40px;
    margin: 0 auto;
    height: 40px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.mainDarkBrown};
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
    width: 60px;
    height: 120px;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0 5px;
    color: ${p => p.theme.colors.darkGrey};
  }

  .card__rank + .card__title {
    margin-top: 10px;
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
