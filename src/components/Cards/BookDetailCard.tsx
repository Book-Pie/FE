import React from "react";
import styled from "styled-components";
import { Expander } from "../BookDatail/Expander";
import { BookSkeleton } from "../BookDatail/BookSkeleton";
import TextTruncate from "../BookDatail/TextTruncate";

interface BookDetailCardWrapperProps {
  renderCondition?: boolean;
}

export const BookDetailPanelWrapper: React.FunctionComponent<BookDetailCardWrapperProps> = props => {
  const { renderCondition = true, children } = props;

  if (!children) {
    return null;
  }

  return renderCondition ? <section>{children}</section> : <>{children}</>;
};

interface BookDetailPanelProps {
  title: string;
  imageUrl?: string;
  isMobile?: boolean;
  useTruncate?: boolean;
  useSkeleton?: boolean;
}

export const BookDetailPanel: React.FunctionComponent<BookDetailPanelProps> = props => {
  const { title, children, imageUrl, isMobile = false, useSkeleton = false, useTruncate = true } = props;

  console.log(props);

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

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const ExpanderArea = styled.div`
  text-align: right;
`;

const Expander1 = styled.button``;
