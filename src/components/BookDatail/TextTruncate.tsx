import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Expander } from "./Expander";

interface Props {
  text: string;
  lines: number;
  lineHeight: number;
  renderExpander?: ({
    isExpanded,
    isTruncated,
    expand,
  }: {
    isExpanded: boolean;
    isTruncated: boolean;
    expand: () => void;
  }) => any;
}

export const TextTruncate: React.FC<Props> = props => {
  const wrapperRef = useRef<HTMLParagraphElement>();

  console.log(props);
  console.log(wrapperRef.current);
  console.log(wrapperRef.current?.clientHeight);
  console.log(props.lines);

  const [isExpanded, setExpand] = useState(false);
  const [isTruncated, setTruncate] = useState(false);

  const expand = () => {
    setExpand(true);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      if (wrapperRef.current.clientHeight > lineHeight * lines) {
        setTruncate(true);
      }
    }
  }, []);

  const { lines, text, lineHeight, renderExpander } = props;

  const style = {
    WebkitLineClamp: isTruncated && !isExpanded ? lines : "unset",
    maxHeight: isTruncated && !isExpanded ? lines * lineHeight : "none",
  };
  return (
    <>
      <P ref={wrapperRef} dangerouslySetInnerHTML={{ __html: text.split("\n").join("<br />") }} style={style} />

      {!!renderExpander && (
        <ExpanderArea>
          <Expander
            onClick={() => setExpand(!isExpanded)}
            text={isExpanded ? "접기" : "더보기"}
            isExpanded={isExpanded}
          />
        </ExpanderArea>
      )}
    </>
  );
};

const P = styled.p`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  line-height: 1.5em;
`;

const ExpanderArea = styled.div`
  text-align: right;
`;

export default TextTruncate;
