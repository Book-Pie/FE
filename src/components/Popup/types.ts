type Colors = "green" | "red";

export interface Props {
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
