import styled from "styled-components";

export const ReviewDate = styled.div`
  color: #d6d0cd;
  margin-right: 50px;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const RatingContent = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StoreReviewItemWrapper = styled.div`
  width: 543px;
  height: 130px;
  margin: 0 0 20px;
  padding: 16px;
  background-color: #51382b;
  border-radius: 8px;
`;

export const StoreReviewItemContent = styled.div`
  width: 354px;
  height: 39px;
  margin: 8px 40px 12px 0px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.4px;
  text-align: left;
  color: #d6d0cd;
`;

export const StoreReviewItemNickName = styled.div`
  width: 200px;
  height: 21px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.45px;
  text-align: left;
  color: #fff;
`;

export const ProfileImg = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    border-radius: 50%;
    height: 200px;
    width: 200px;
    ${({ theme }) => theme.shadow[0]};
  }
`;

export const UsedBookStoreProfileImg = styled.div`
  flex: 6;
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    margin-bottom: 8px;
    border-radius: 80%;
  }
`;

export const UsedBookStoreNoneProfileImg = styled.div`
  flex: 6;
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    margin-bottom: 8px;
    border-radius: 80%;
  }
`;

export const StoreReviewProfileImg = styled.div`
  flex: 6;
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
    border-radius: 80%;
  }
`;

export const StoreReviewNoneProfileImg = styled(StoreReviewProfileImg)`
  img {
    padding: 10px;
  }
`;

export const FollowButton = styled.div`
  margin-left: 10px;
`;

export const ProductDetailProfileImg = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    ${({ theme }) => theme.shadow[0]};
  }
`;

export const ProductDetailNoneProfileImg = styled(ProductDetailProfileImg)`
  img {
    padding: 20px;
  }
`;

export const BottomArea = styled.div`
  margin-top: 20px;
`;

export const UsedStoreFlexBox = styled.div`
  display: flex;
  width: 320px;
  height: 80px;

  div {
    margin-right: 30px;
  }
`;
