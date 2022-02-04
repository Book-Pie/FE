import styled from "styled-components";

export const SaleInsertWrapper = styled.div`
  width: 80%;
  margin-top: 2rem;
  min-height: 100vh;

  @media screen and (max-width: 800px) {
    margin: 1rem 0;
    width: 95%;
  }
  .notFound {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 2rem 0;
    line-height: 1.2;
    gap: 10px;
    align-items: center;
    p {
      font-size: 18px;
    }
    button {
      height: 40px;
      font-size: 16px;
    }
  }
`;

export const SaleInsertLeft = styled.div`
  flex: 2;

  & > div {
    display: flex;
    justify-content: center;
  }

  & > div:nth-child(1) {
    gap: 0.7rem;

    & > span:first-child {
      font-size: 16px;
      font-weight: 600;
      & > span {
        font-size: 14px;
        color: ${props => props.theme.colors.error};
      }
    }
    & > span:last-child {
      font-size: 14px;
      color: rgba(113, 128, 147, 0.8);
    }

    @media screen and (max-width: 1000px) {
      & > div:first-child {
        gap: 5px;
      }
    }
    ${({ theme }) => theme.media.mobile} {
      gap: 5px;
      flex-direction: column;
      span {
        text-align: center;
      }
    }
  }

  & > div:nth-child(2) {
    text-align: center;
    & > span:first-child {
      font-size: 16px;
      font-weight: 600;
    }
    & > span:last-child {
      font-size: 15px;
      color: ${props => props.theme.colors.error};
    }
  }
`;
export const SaleInsertRight = styled.div`
  flex: 8;
  .upload {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(2, 200px);
    gap: 15px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .one {
      border: 1px solid ${props => props.theme.colors.mainLightBrown};
      background-color: rgba(236, 240, 241, 0.3);
      position: relative;
      label {
        display: block;
        cursor: pointer;
      }
      span {
        position: absolute;
        bottom: 15%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100px;
        text-align: center;
        color: rgba(44, 62, 80, 1);
        font-weight: 600;
      }
      input {
        display: none;
      }
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, 200px);
      grid-template-rows: repeat(3, 200px);
    }
    ${({ theme }) => theme.media.mobile} {
      grid-template-columns: repeat(2, 2fr);
      grid-template-rows: repeat(3, 150px);
      .one {
        border: 1px solid ${props => props.theme.colors.mainLightBrown};
        span {
          font-size: 0.6rem;
          bottom: 10%;
        }
      }
    }
  }
`;

export const Title = styled.div`
  padding: 1.5rem 0;
  margin-bottom: 2.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.darkGrey};

  & > span:first-child {
    font-size: 2rem;
  }
  & > span:last-child {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.error};
    font-weight: 600;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 1rem 0;
    margin-bottom: 2rem;
    & > span:first-child {
      font-size: 1.2rem;
    }
    & > span:last-child {
      font-size: 0.8rem;
    }
  }
`;

export const ImgDelete = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  margin-bottom: 5px;

  span {
    position: relative;
    color: rgba(113, 128, 147, 0.8);
    cursor: pointer;
    :hover {
      ::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        border-bottom: 1px solid rgba(113, 128, 147, 0.8);
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
  ${({ theme }) => theme.media.mobile} {
    span {
      font-size: 0.6rem;
    }
  }
`;

export const ImgUpload = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  & > div:first-child {
    flex: 2;
    display: flex;
    gap: 0.7rem;

    & > span:first-child {
      font-size: 16px;
      font-weight: 600;
      & > span {
        font-size: 14px;
        color: ${props => props.theme.colors.error};
      }
    }
    & > span:last-child {
      font-size: 14px;
      color: rgba(113, 128, 147, 0.8);
    }
  }
  & > div:last-child {
    flex: 8;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(2, 200px);
    gap: 15px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .one {
      border: 1px solid ${props => props.theme.colors.mainLightBrown};
      background-color: rgba(236, 240, 241, 0.3);
      position: relative;
      label {
        display: block;
        cursor: pointer;
      }
      span {
        position: absolute;
        bottom: 15%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100px;
        text-align: center;
        color: rgba(44, 62, 80, 1);
        font-weight: 600;
      }
      input {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    & > div:first-child {
      gap: 5px;
    }
    & > div:last-child {
      grid-template-columns: repeat(2, 200px);
      grid-template-rows: repeat(3, 200px);
    }
  }
  ${({ theme }) => theme.media.mobile} {
    & > div:first-child {
      gap: 5px;
      flex-direction: column;
      span {
        text-align: center;
      }
    }
    & > div:last-child {
      grid-template-columns: repeat(2, 2fr);
      grid-template-rows: repeat(3, 150px);
      .one {
        border: 1px solid ${props => props.theme.colors.mainLightBrown};
        span {
          font-size: 0.6rem;
          bottom: 10%;
        }
      }
    }
  }
`;

export const ImgUploadText = styled.div`
  margin: 1.5rem;
  padding: 1rem;
  border-radius: 5px;
  color: ${props => props.theme.colors.darkGrey};
  border: 1px solid #edeae9;
  background-color: rgba(236, 240, 241, 0.3);
  div + div {
    margin-top: 15px;
  }
  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media screen and (max-width: 700px) {
    & > div {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
      div + div {
        margin-top: 10px;
      }
    }
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      span {
        font-size: 0.8rem;
      }
      svg {
        width: 24px;
      }
    }
  }
`;

export const Row = styled.div`
  border-top: 1px solid #edeae9;
  display: flex;
  align-items: center;
  padding: 35px 0;
  gap: 15px;
  & > div:first-child {
    flex: 2;
    text-align: center;
    & > span:first-child {
      font-size: 16px;
      font-weight: 600;
    }
    & > span:last-child {
      font-size: 15px;
      color: ${props => props.theme.colors.error};
    }
  }
  & > div:last-child {
    flex: 8;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .title {
    width: 100%;
  }
  .price {
    width: 100%;
  }
  .editor {
    & > div {
      width: 100%;
    }
  }
  .skeleton,
  .category {
    @media screen and (max-width: 700px) {
      flex: 1;
    }
  }
`;

export const TagBox = styled.div`
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  input {
    display: inline-flex;
    outline: none;
    cursor: text;
    font-size: 1.125rem;
    line-height: 2rem;
    min-width: 8rem;
    border: none;
    background: transparent;

    &:focus + div {
      opacity: 1;
      transform: translateY(0px);
      z-index: 5;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    input {
      width: 100%;
      font-size: 0.8rem;
    }
  }
`;

export const Tag = styled.div`
  font-size: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  height: 2rem;
  border-radius: 1rem;
  padding: 0 1rem;
  background: rgb(241, 243, 245);
  color: rgb(12, 166, 120);
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  animation: 0.125s ease-in-out 0s 1 normal forwards running iMKika;

  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
`;

export const InputMessage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 330px;
  background: rgba(73, 80, 87, 1);
  padding: 0.7rem 1rem;
  color: white;
  line-height: 1.5;
  font-size: 0.8rem;
  z-index: -1;
  top: 120%;
  transition: opacity 0.5s, z-index 0.5s, transform 0.35s ease-in;
  opacity: 0;
  transform: translateY(-30px);
  ${({ theme }) => theme.media.mobile} {
    left: -25%;
    top: 110%;
  }
`;

export const ErrorMessageWrapper = styled.div`
  width: 100%;
`;
