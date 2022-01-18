import styled from "styled-components";

export const Wrapper = styled.form`
  width: 1000px;
`;

export const Title = styled.div`
  padding: 25px 0;
  margin-bottom: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.darkGrey};

  & > span:first-child {
    font-size: 30px;
  }
  & > span:last-child {
    font-size: 20px;
    color: ${props => props.theme.colors.error};
    font-weight: 600;
  }
`;

export const ImgDelete = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;

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
        bottom: -20%;
        left: 0;
        right: 0;
      }
    }
  }
`;

export const ImgUpload = styled.div`
  display: flex;

  & > div:first-child {
    flex: 2;
    display: flex;
    gap: 10px;
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
    padding-left: 50px;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(2, 200px);
    gap: 20px;
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
`;

export const ImgUploadText = styled.div`
  display: flex;
  justify-content: flex-end;

  & > div:first-child {
    width: 80%;
    margin: 1.5rem;
    padding: 1rem;
    border-radius: 5px;
    color: ${props => props.theme.colors.darkGrey};
    border: 1px solid #edeae9;
    background-color: rgba(236, 240, 241, 0.3);
    div + div {
      margin-top: 15px;
    }
    div {
      cursor: pointer;
      display: flex;
      gap: 10px;
    }
  }
`;

export const Row = styled.div`
  border-top: 1px solid #edeae9;
  & > div {
    display: flex;
    align-items: center;
    margin: 35px 0;
    & > div:first-child {
      flex: 2;
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
    }
  }
  .price {
    & > div {
      width: 30%;
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
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
    background: transparent;

    &:focus + div {
      opacity: 1;
      transform: translateY(0px);
      z-index: 5;
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
  padding-left: 1rem;
  padding-right: 1rem;
  background: rgb(241, 243, 245);
  color: rgb(12, 166, 120);
  margin-right: 0.75rem;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  margin-bottom: 0.75rem;
  animation: 0.125s ease-in-out 0s 1 normal forwards running iMKika;
`;

export const InputMessage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 330px;
  background: rgba(73, 80, 87, 1);
  padding: 0.7rem 1rem;
  color: white;
  line-height: 1.5;
  font-size: 0.8rem;
  z-index: -1;
  top: 100%;
  transition: opacity 0.5s, z-index 0.5s, transform 0.35s ease-in;
  opacity: 0;
  transform: translateY(-30px);
`;

export const ErrorMessageWrapper = styled.div`
  margin-top: 15px;
`;
