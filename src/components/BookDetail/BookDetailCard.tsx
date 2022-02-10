import React from "react";
import { Expander } from "./Expander";
import { BookSkeleton } from "./BookSkeleton";
import TextTruncate from "./TextTruncate";
import { BookDetailCardWrapperProps, BookDetailPanelProps } from "./types";
import { AuthorTitle, BookDetailTitle, ExpanderArea, Flexbox, ImgWrapper, PhotoImg } from "./style";

export const BookDetailPanelWrapper: React.FunctionComponent<BookDetailCardWrapperProps> = ({
  renderCondition = true,
  children,
}) => {
  if (!children) {
    return null;
  }

  if (renderCondition) {
    return <section>{children}</section>;
  }
  return children;
};

export const BookDetailPanel: React.FunctionComponent<BookDetailPanelProps> = ({
  title,
  children,
  imageUrl,
  isMobile = false,
  useSkeleton = false,
  useTruncate = true,
  authorName,
  authorPhoto,
}) => {
  return children ? (
    <BookDetailPanelWrapper>
      <BookDetailTitle>{title}</BookDetailTitle>
      <Flexbox>
        {authorPhoto && (
          <ImgWrapper>{authorPhoto && <PhotoImg src={authorPhoto} width="140" height="165" />}</ImgWrapper>
        )}

        <div>
          {authorName && <AuthorTitle>{authorName}</AuthorTitle>}
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
      </Flexbox>
    </BookDetailPanelWrapper>
  ) : useSkeleton ? (
    <BookSkeleton />
  ) : null;
};
