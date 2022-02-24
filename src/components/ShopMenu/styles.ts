import styled from "styled-components";

export const ShopUserReviewWrapper = styled.div`
  margin-top: 50px;
`;

export const ShopContentWrapper = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;
  flex: 1;

  @media screen and (max-width: 630px) {
    width: 100%;
  }
`;

export const ShopUserReviewHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const UserReviewTitleSpan = styled.span`
  margin: 0 130px 20px 20px;
`;

export const ShopReviewListEmptyWrapper = styled.div`
  width: 100%;
  margin: 0 0 20px;
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
`;

export const DateWrapper = styled.div`
  text-align: center;

  span {
    margin-right: 10px;
  }
  strong {
    font-weight: 500;
  }

  ${({ theme }) => theme.media.mobile} {
    padding-top: 0.5rem;
    span {
      font-size: 0.7rem;
      margin-right: 0;
    }
  }
`;

export const ShopTitle = styled.div`
  width: 100%;
  height: 30px;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.67;
  letter-spacing: -0.45px;
  text-align: left;
  color: #4f3629;
  margin-bottom: 20px;
`;

export const ShopSaleTableHeader = styled.div`
  display: flex;
  & > div {
    text-align: center;
    flex: 1;
    border-top: 1px solid rgba(99, 110, 114, 0.2);
    border-bottom: 1px solid rgba(99, 110, 114, 0.2);
    padding: 0 0.5rem;
    & > span {
      display: block;
      margin: 15px 0;
      font-size: 1rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      & > span {
        font-size: 0.7rem;
      }
   }
`;
export const ShopSaleCell = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  a {
    flex: 1;
  }
`;

export const StoreReviewListCount = styled.span`
  color: #dd002c;
`;

export const EmptyListWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  height: 25rem;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    height: 100%;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 100px 18px;
  box-sizing: border-box;
  text-align: center;

  div {
    color: #c9c9ca;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;

export const CardWrapper = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 0.5rem;
  margin-top: 15px;
  width: 13rem;
  transition: transform 0.4s, box-shadow 0.4s ease-in;

  &:hover {
    transform: scale(1.02);
  }

  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .usedBookCard__imgBox {
    position: relative;
    padding-top: 300px;

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
    width: ${props => (props.width === 100 ? 100 : 25)}%;
    padding: 0 0.3rem;
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 800px) {
    width: ${props => (props.width === 100 ? 100 : 33.3)}%;
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
    width: ${props => (props.width === 100 ? 100 : 25)}%;

    .usedBookCard__title {
      height: 1rem;
      margin: 0 10px;
      overflow: hidden;
      display: -webkit-box;
      text-align: center;
      color: ${({ theme }) => theme.colors.darkGrey};
    }

    .CardWrapper {
      padding-left: 20rem;
    }

    img {
      padding: 0;
      width: 100%;
      height: 2rem;
    }

    a {
      width: 100%;
    }

    .usedBookCard__content {
      padding: 0;
    }
  }
`;

export const UsedBookCardNoneImgBox = styled.div`
  padding: 30px;
`;

export const UsedBookCardImgBox = styled.div`
  position: relative;
  height: 10rem;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    position: absolute;
    display: block;
    top: 0;
    padding: 2rem;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }

  @media screen and (max-width: 630px) {
    height: 7rem;
    padding-left: 0.5rem;

    img {
      position: absolute;
      display: block;
      top: 0;
      padding: 1rem;
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
    }
  }
`;

export const FollowingUsedBookListWrapper = styled.div`
  position: relative;
  height: 10rem;
  width: 10rem;

  img {
    position: absolute;
    display: block;
    top: 0;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FlexBox = styled.div`
  display: flex;
  padding-top: 2rem;
`;

export const FollowingListWrapper = styled.div`
  gap: 20px;
  margin-top: 2rem;
  margin-bottom: 150px;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  background-color: #f8f8f8;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 3px;
  width: 100%;
  margin: 1rem 0;
  padding: 0 1rem;
  padding-bottom: 20px;
  padding-top: 20px;

  @media screen and (max-width: 630px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FollowingMainUsedBookListWrapper = styled.div`
  height: 21rem;
  // width: 14rem;
  width: 100%;
  margin-right: 5rem;
  gap: 20px;
  margin-top: 2rem;
  margin-bottom: 150px;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 3px;
  margin: 1rem 0;
  padding: 0 1rem;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const FollowingMainUsedBookListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const UsedBookListEmptyWrapper = styled.div`
  background-color: #f9f9f9;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 3px;
  border-radius: 10px;
  display: flex;
  margin-top: 1rem;
  width: 80%;
  height: 18rem;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 1rem;
  }
`;
