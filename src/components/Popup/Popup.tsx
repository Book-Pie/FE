import { useEffect, useRef, useState } from "react";
import { PopupWrapper } from "./style";
import { PopUpProps } from "./types";

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
