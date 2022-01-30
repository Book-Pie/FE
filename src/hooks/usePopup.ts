import { useCallback, useState } from "react";

interface UsePopupState {
  isOpen: boolean;
  isSuccess: boolean;
  message: string | null;
}

const usePopup = () => {
  const [popupState, setPopupState] = useState<UsePopupState>({
    isOpen: false,
    isSuccess: false,
    message: "",
  });

  const handlePopupMessage = useCallback((isSuccess: boolean, message: string) => {
    setPopupState({
      isOpen: true,
      isSuccess,
      message,
    });
  }, []);

  const handlePopupClose = useCallback(() => {
    setPopupState({
      isOpen: false,
      isSuccess: false,
      message: null,
    });
  }, []);

  return {
    handlePopupMessage,
    handlePopupClose,
    popupState,
  };
};

export default usePopup;
