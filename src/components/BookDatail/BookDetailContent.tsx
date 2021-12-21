import React, { useState } from "react";
import styled from "styled-components";
import CreateImgItem from "../Image/CreateImgItem";
import BookDetailCard from "../Cards/PublicCard";
import dummy from "../../db/data.json";
import { BookDetailPanel, BookDetailPanelWrapper } from "../Cards/BookDetailCard";
import BasicCard from "../Cards/BasicCard";

const BookDetailContent = () => {
  const limitNumberOfText = 300;

  const [limit, setLimit] = useState(limitNumberOfText);
  const moreToggle = (str: string, limit: number) => {
    return {
      string: str.slice(0, limit),
      isShowText: str.length > limit,
    };
  };

  const onClickMore = (str: string) => () => {
    setLimit(str.length);
  };

  console.log(dummy);

  const ImgList = dummy.img.map(item => <CreateImgItem key={item.id} img={item.img} />);
  console.log(ImgList);

  console.log(dummy.book[0].bookIntroText);

  const book1 = dummy.book[0].bookIntroText;
  const book2 = dummy.book[0].authorIntroText;

  return (
    <Container>
      <BasicCard>
        <BookDetailPanel title="책소개">{dummy.book[0].bookIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        <BookDetailPanel title="저자 소개">{dummy.book[0].authorIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        <BookDetailPanel title="저자의 다른 도서">{ImgList[0].props.img}</BookDetailPanel>
      </BasicCard>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 700px;
`;

export default BookDetailContent;
