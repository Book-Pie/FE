import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export interface DropDownProps {
  children: React.ReactNode;
  defaultValue?: string;
  setSelectedId?: (id: string) => void;
  setSelectedText?: (text: string) => void;
}

export interface UlProps {
  visible: boolean;
}

const DropDown = ({ children, defaultValue, setSelectedId, setSelectedText }: DropDownProps) => {
  const [selected, setSelected] = useState(defaultValue);
  const [visible, setVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const isClosed = useRef<boolean>(false);
  const el = useRef<HTMLDivElement>(null);

  const dropDorwnOpen = useCallback(() => setIsOpen(true), []);

  const dropDownClose = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      e.preventDefault();

      const { target } = e;

      if (target instanceof HTMLElement) {
        setSelected(target.innerText);
        setVisible(false);
        isClosed.current = true;
        if (setSelectedText instanceof Function && setSelectedText !== undefined) {
          setSelectedText(target.innerText);
        }
        if (setSelectedId instanceof Function && setSelectedId !== undefined) {
          setSelectedId(target.id);
        }
      }
    },
    [setSelectedId, setSelectedText],
  );

  const handleDropDownClose = useCallback(
    (e: any) => {
      if (isOpen && (!el.current || !el.current.contains(e.target))) {
        setVisible(false);
        isClosed.current = true;
      }
    },
    [isOpen],
  );

  useEffect(() => {
    window.addEventListener("click", handleDropDownClose);
    return () => window.removeEventListener("click", handleDropDownClose);
  }, [handleDropDownClose]);

  useEffect(() => {
    if (!visible && isOpen && !isClosed.current) {
      // 드롭다운 컴포넌트 생성되는 시간
      setTimeout(() => setVisible(true), 200);
    } else if (isClosed.current) {
      // 드롭다운 컴포넌트 없어지는 시간
      setTimeout(() => setIsOpen(false), 200);
      isClosed.current = false;
    }
  }, [visible, isOpen, setIsOpen]);

  return (
    <Wrapper ref={el}>
      <SelectBox onClick={dropDorwnOpen}>
        {selected}
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className="dropDown__svg"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </SelectBox>
      {isOpen && (
        <SelectList visible={visible} onClick={dropDownClose}>
          {children}
        </SelectList>
      )}
    </Wrapper>
  );
};

DropDown.defaultProps = {
  defaultValue: "선택",
};

const OpenCss = css`
  opacity: 1;
  transform: translateY(0);
`;

const CloseCss = css`
  transition: opacity 0.35s, transform 0.5s, z-index 0.2s ease-in;
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectBox = styled.div`
  display: flex;
  background: white;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 100%;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 0.875rem;
  ${({ theme }) => theme.shadow[0]}
  cursor: pointer;

  .dropDown__svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const SelectList = styled.ul<UlProps>`
  list-style: none;
  padding: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  overflow: hidden;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;
  transition: opacity 0.5s, transform 0.35s, z-index 0.35s ease-in;
  transform: translateY(-50%);

  ${({ visible }) => (visible ? OpenCss : CloseCss)}

  li {
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
  }
  li + li {
    border-top: 1px solid rgb(241, 243, 245);
  }
  li:hover {
    background: rgb(248, 249, 250);
  }
  a:hover {
    font-weight: bold;
  }
`;

export default memo(DropDown);
