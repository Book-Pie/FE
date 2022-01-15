import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

type Colors = "green" | "red";

export interface PopUpProps {
  isOpen: boolean;
  autoClose?: boolean;
  openDelay?: number;
  closeDelay?: number;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: Colors;
}
export interface PopupWrraperProps {
  visible: boolean;
}

export const PopupWrraperOpenCss = css`
  z-index: 20;
  transform: rotateX(0deg);
`;

export const PopupWrraperCloseCss = css`
  transition: transform 0.5s, z-index 1s ease-in;
`;

export const PopupWrapper = styled.div<PopupWrraperProps>`
  position: fixed;
  top: 5%;
  color: white;
  right: 5%;
  cursor: pointer;
  z-index: 0;
  transition: transform 1s, z-index 0.25s ease-in;
  transform: rotateX(90deg);
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  padding: 1rem;
  ${({ visible }) => visible && PopupWrraperOpenCss}
  ${({ visible }) => !visible && PopupWrraperCloseCss} 


  &.green {
    background: rgb(18, 184, 134);
  }
  &.red {
    background: #e74c3c;
  }
`;

const Popup = ({ isOpen, closeDelay, openDelay, children, autoClose, className, setIsOpen }: PopUpProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const isClosed = useRef<boolean>(false);

  const popUpCloase = () => {
    setVisible(false);
    isClosed.current = true;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!visible && isOpen && !isClosed.current) {
      timer = setTimeout(() => setVisible(true), openDelay);
    }

    if (isClosed.current) {
      timer = setTimeout(() => setIsOpen(false), openDelay);
      isClosed.current = false;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible, isOpen, openDelay, setIsOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose) timer = setTimeout(() => popUpCloase(), closeDelay);

    const cleanUp = () => {
      if (autoClose) clearTimeout(timer);
    };

    return cleanUp;
  }, [closeDelay, autoClose]);

  return (
    <PopupWrapper onClick={popUpCloase} visible={visible} className={className}>
      {children}
    </PopupWrapper>
  );
};

Popup.defaultProps = {
  autoClose: false,
  openDelay: 500,
  closeDelay: 2000,
};

export default Popup;
