import React, { memo } from "react";
import noUsedBookCard from "assets/image/noComments.png";
import UsedBookCard from "./UsedBookCard";
import * as Types from "./types";
import * as Styled from "./style";

const UsedBookCards = ({ data, handleObserver }: Types.UsedBookCardsProps) => {
  if (data) {
    let render;

    render = data.pages.map((p, idx) => {
      const { pages } = p;
      return (
        <React.Fragment key={idx}>
          {pages.map((card, idx) => {
            if (pages.length - 1 === idx) {
              return (
                <React.Fragment key={idx}>
                  <div ref={handleObserver} />
                  <UsedBookCard card={card} />
                </React.Fragment>
              );
            }
            return <UsedBookCard key={idx} card={card} />;
          })}
        </React.Fragment>
      );
    });

    if (data.pages[0].isEmpty) {
      render = (
        <Styled.UsedBookCardEmpty>
          <span>등록된 글이 없습니다.</span>
          <span>글을 작성해주세요.</span>
          <span>
            <img src={noUsedBookCard} alt="noUsedBookCard" />
          </span>
        </Styled.UsedBookCardEmpty>
      );
    }

    return <Styled.UsedBookCardsWrapper>{render}</Styled.UsedBookCardsWrapper>;
  }

  return null;
};

export default memo(UsedBookCards);
