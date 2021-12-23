import { useEffect, useRef, useState } from "react";
import { PopupWrraper } from "./style";
import { Props } from "./types";

const Popup = ({ isOpen, closeDelay, openDelay, children, autoClose, className, setIsOpen }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const isClosed = useRef<boolean>(false);

  const popUpCloase = () => {
    setVisible(false);
    isClosed.current = true;
  };

  useEffect(() => {
    if (!visible && isOpen && !isClosed.current) setTimeout(() => setVisible(true), openDelay);

    if (isClosed.current) {
      setTimeout(() => setIsOpen(false), openDelay);
      isClosed.current = false;
    }
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
    <PopupWrraper onClick={popUpCloase} visible={visible} className={className}>
      {children}
    </PopupWrraper>
  );
};

Popup.defaultProps = {
  autoClose: false,
  openDelay: 500,
  closeDelay: 2000,
};

export default Popup;
