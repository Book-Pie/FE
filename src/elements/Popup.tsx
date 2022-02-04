import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

type Colors = "green" | "red";

interface PopUpProps {
  isOpen: boolean;
  autoClose?: boolean;
  openDelay?: number;
  closeDelay?: number;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: Colors;
}

const PopupWrraperOpenCss = css`
  z-index: 20;
  transform: rotateX(0deg);
`;

const PopupWrraperCloseCss = css`
  transition: transform 0.5s, z-index 1s ease-in;
`;

const PopupContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 5%;
  right: 5%;
  color: white;
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
  ${({ theme }) => theme.media.mobile} {
    top: 0;
    right: 0;
    width: 100%;
    font-size: 15px;
    padding: 10px;
  }
`;

const Popup = ({ isOpen, closeDelay, openDelay, children, autoClose, className, setIsOpen }: PopUpProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const isClosed = useRef<boolean>(false);

  const popUpClose = () => {
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
    if (autoClose) timer = setTimeout(() => popUpClose(), closeDelay);

    const cleanUp = () => {
      if (autoClose) clearTimeout(timer);
    };

    return cleanUp;
  }, [closeDelay, autoClose]);

  return (
    <PopupContainer onClick={popUpClose} visible={visible} className={className}>
      {children}
    </PopupContainer>
  );
};

Popup.defaultProps = {
  autoClose: false,
  openDelay: 500,
  closeDelay: 2000,
  className: "red",
};

export default Popup;
