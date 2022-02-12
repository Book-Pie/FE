import styled from "styled-components";

export const DateContent = styled.div`
  color: #4f3629;
  font-weight: 700;
`;

export const SecretItem = styled.div`
  color: #d1d5d9;
`;

export const SellerNameTitle = styled.div`
  margin-top: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 70px;
`;

export const ProfileImg = styled.div<{ storeReview: boolean }>`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    border-radius: 50%;
    height: ${props => (props.storeReview ? "70px" : "200px")};
    width: ${props => (props.storeReview ? "70px" : "200px")};
    ${({ theme }) => theme.shadow[0]};
  }
`;

export const NoneProfileImg = styled(ProfileImg)`
  img {
    padding: ${props => (props.storeReview ? "13px" : "30px")};
  }
`;
