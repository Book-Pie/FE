import { useState, useEffect, useRef } from "react";
import { Expander } from "./Expander";
import { TextTruncateProps } from "./types";
import { P, ExpanderArea } from "./style";

export const TextTruncate = ({ lines, text, lineHeight, renderExpander }: TextTruncateProps) => {
  const wrapperRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setExpand] = useState(false);
  const [isTruncated, setTruncate] = useState(false);

  useEffect(() => {
    if (wrapperRef.current) {
      if (wrapperRef.current.clientHeight > lineHeight * lines) {
        setTruncate(true);
      }
    }
  }, []);

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

export default TextTruncate;
