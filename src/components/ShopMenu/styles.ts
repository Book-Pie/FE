import styled from "styled-components";

export const ShopUserReviewWrapper = styled.div`
  margin-top: 50px;
`;

export const ShopContentWrapper = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;
  flex: 1;
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
