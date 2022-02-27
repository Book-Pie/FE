import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
`;

export const ColorContent = styled.div`
  color: #52a4c3;
`;

export const HeaderTitle = styled.div`
  font-size: 18px;
  padding: 20px;
  text-align: center;
  flex: 1;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

export const ContentWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #ededed;
  margin-bottom: 20px;
`;

export const BuyContent = styled.div`
  font-size: 1rem;
  text-align: center;
  padding: 20px;
  width: 100%;
  height: 13rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
    height: 8rem;
    width: 5rem;
  }
`;

export const BuyTitleContent = styled(BuyContent)`
  color: #52a4c3;
`;

export const ImgContent = styled.img`
  width: 100%;
  height: 10rem;
`;

export const ImgContent800 = styled.img`
  width: 70%;
  height: 70%;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const ContentText = styled.div`
  align-content: center;
  margin: 60px auto;
`;

export const ContentTitle = styled(ContentText)`
  color: #52a4c3;
`;

export const ButtonArea = styled.div`
  align-content: center;
  margin: 50px auto;

  @media screen and (max-width: 837px) {
    .MuiButton-root {
      font-size: 0.7rem;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    .MuiButton-root {
      font-size: 0.4rem;
    }
  }
`;

export const ModalButtonArea = styled(ButtonArea)`
  display: flex;
`;

export const ModalContent = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 20px;
  height: 40px;
  width: 250px;
  color: ${props => props.color};

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
    width: 7rem;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const Text = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: none;
  background-color: transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 19px;
  color: #555;
  vertical-align: top;
  resize: none;
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid;
  line-height: 38px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  border-color: #c5cbd0;
  color: #555;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

export const UserReviewButtonArea = styled.div`
  display: flex;
  width: 300px;
  margin-top: 60px;
  margin-bottom: 40px;
`;

export const UserReviewHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentItem = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 20px;
  flex: 1;
  height: 170px;

  ${({ theme }) => theme.media.mobile} {
    padding: 10px;
    height: 5rem;
    font-size: 0.6rem;

    button {
      font-size: 0.5rem;
    }
  }
`;

export const TitleContentItem = styled(ContentItem)`
  color: #52a4c3;
`;
export const RegisterButton = styled(CancelButton)`
  border-color: rgba(0, 0, 0, 0.1);
  background-color: #4f3629;
  color: #fff;
`;

export const TextReviewArea = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 10px 10px 11px;
  border: 1px solid #cbcbcb;
  background-color: #f4f4f4;
`;

export const BuyListWrapper = styled.div`
  margin: 3rem 0;
  padding: 0 1rem;
  flex: 1;
`;

export const ContentListTitle800 = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  color: #52a4c3;

  ${({ theme }) => theme.media.mobile} {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.6rem;
  }
`;

export const BuyListStackWrapper = styled.div`
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
  }
`;
