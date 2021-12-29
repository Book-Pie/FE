import { useCallback, useEffect, useRef, useState } from "react";
import { Select, UlWrapper, Wrapper } from "./style";
import { DropDownProps } from "./types";

const DropDown = ({ children, defaultValue, setValue }: DropDownProps) => {
  const [selected, setSelected] = useState(defaultValue);
  const [visible, setVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const isClosed = useRef<boolean>(false);

  const dropDorwnOpen = useCallback(() => setIsOpen(true), []);

  const dropDownClose = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      e.preventDefault();
      const { target } = e;
      if (target instanceof HTMLLIElement) {
        setValue(target.id);
        setSelected(target.innerText);
        setVisible(false);
        isClosed.current = true;
      }
    },
    [setValue],
  );

  useEffect(() => {
    if (!visible && isOpen && !isClosed.current) {
      // 드롭다운 컴포넌트 생성되는 시간
      setTimeout(() => setVisible(true), 200);
    } else if (isClosed.current) {
      // 드롭다운 컴포넌트 없어지는 시간
      setTimeout(() => setIsOpen(false), 200);
      isClosed.current = false;
    }

    return () => {
      setValue("");
    };
  }, [visible, isOpen, setIsOpen, setValue]);

  return (
    <Wrapper>
      <Select onClick={dropDorwnOpen}>
        {selected}
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </Select>
      {isOpen && (
        <UlWrapper visible={visible} onClick={dropDownClose}>
          {children}
        </UlWrapper>
      )}
    </Wrapper>
  );
};

DropDown.defaultProps = {
  defaultValue: "선택",
};

export default DropDown;
