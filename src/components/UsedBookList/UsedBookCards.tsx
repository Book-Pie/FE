import React, { memo } from "react";
import UsedBookCard from "./UsedBookCard";
import * as Types from "./types";

const UsedBookCards = ({ pages, handleObserver }: Types.UsedBookCardsProps) => {
  return (
    <>
      {pages.map((card, idx) => {
        if (pages.length - 5 === idx) {
          return (
            <React.Fragment key={idx}>
              <div ref={handleObserver} />
              <UsedBookCard card={card} />
            </React.Fragment>
          );
        }
        return <UsedBookCard key={idx} card={card} />;
      })}
    </>
  );
};

export default memo(UsedBookCards);
