import { Button } from "@mui/material";
import DaumPostcode, { Address } from "react-daum-postcode";
import useWindowFiexd from "src/hooks/useWindowFiexd";
import styled, { css } from "styled-components";

interface DaumPostModalProps {
  handleComplete: (data: Address) => void;
  handleDaumPostOpne: () => void;
  isVisible: boolean;
}

const DaumPostModal = ({ handleComplete, handleDaumPostOpne, isVisible }: DaumPostModalProps) => {
  useWindowFiexd(isVisible);

  return (
    <DaumPostModalWrapper isVisible={isVisible}>
      <div>
        <DaumPostcode
          autoClose={false}
          onComplete={(data: Address) => {
            handleDaumPostOpne();
            handleComplete(data);
          }}
        />
        <Button variant="contained" color="mainDarkBrown" onClick={handleDaumPostOpne}>
          닫기
        </Button>
      </div>
    </DaumPostModalWrapper>
  );
};

const DaumPostModalWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(178, 190, 195, 0.3);
  transition: transform 0.5s ease-in;
  transform: translateY(100%);
  min-width: 375px;

  ${({ isVisible }) => {
    return (
      isVisible &&
      css`
        transform: translateY(0%);
      `
    );
  }}

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    padding: 1rem;
    ${({ theme }) => theme.shadow[0]};
  }
  button {
    margin-top: 0.5rem;
    width: 100%;
    padding: 1rem;
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      width: 100%;
    }
    button {
      margin-top: 0.5rem;
      width: 100%;
      padding: 0.5rem;
    }
  }
`;

export default DaumPostModal;
