import React from "react";
import { Expander } from "./Expander";
import { BookSkeleton } from "./BookSkeleton";
import TextTruncate from "./TextTruncate";
import { BookDetailCardWrapperProps, BookDetailPanelProps } from "./types";
import { CardTitle, ExpanderArea } from "./style";

export const BookDetailPanelWrapper: React.FunctionComponent<BookDetailCardWrapperProps> = ({
  renderCondition = true,
  children,
}) => {
  if (!children) {
    return null;
  }

  return renderCondition ? <section>{children}</section> : <>{children}</>;
};

export const BookDetailPanel: React.FunctionComponent<BookDetailPanelProps> = ({
  title,
  children,
  imageUrl,
  isMobile = false,
  useSkeleton = false,
  useTruncate = true,
}) => {
  return children ? (
    <BookDetailPanelWrapper>
      <CardTitle>{title}</CardTitle>
      <div>
        {useTruncate ? (
          <TextTruncate
            lines={isMobile ? 4 : 6}
            text={`${imageUrl ? `<img src="${imageUrl}" /><br /><br />` : ""}${children}`}
            lineHeight={29}
            renderExpander={({ expand, isExpanded, isTruncated }) =>
              !isTruncated || isExpanded ? null : (
                <ExpanderArea>
                  <Expander onClick={expand} text="더보기" isExpanded={false} />
                </ExpanderArea>
              )
            }
          />
        ) : (
          children
        )}
      </div>
    </BookDetailPanelWrapper>
  ) : useSkeleton ? (
    <BookSkeleton />
  ) : null;
};
