import React from "react";
import styled from "styled-components";
import BasicCard from "./BasicCard";

export interface CardProps {
  bookName?: string;
  bookCategory?: string;
  authorName?: string;
  bookIntroTitle?: string;
  bookIntroText?: string;
  authorIntroTitle?: string;
  authorIntroText?: string;
  anotherBooks?: string;
  bookThumnail?: string;
  image?: string;
  smallImage?: any;
}

function Card({
  bookThumnail,
  bookName,
  bookCategory,
  authorName,
  bookIntroTitle,
  bookIntroText,
  authorIntroTitle,
  authorIntroText,
  anotherBooks,
  image,
  smallImage,
}: CardProps) {
  return (
    <BasicCard>
      <SideBarImg src={bookThumnail} />
      <BookTitle>{bookName}</BookTitle>
      <Containner>
        <BookCategory>{bookCategory}</BookCategory>
        <AuthorName>{authorName}</AuthorName>
      </Containner>
      <CardTitle>{bookIntroTitle || authorIntroTitle}</CardTitle>
      <CardContent>{bookIntroText || authorIntroText}</CardContent>
      <SmallBookCard>
        <CardTitle>{anotherBooks}</CardTitle>
        <SmallImg src={smallImage} />
      </SmallBookCard>
    </BasicCard>
  );
}
const Containner = styled.div`
  display: flex;
`;

const BookTitle = styled.h4``;

const BookCategory = styled.div`
  margin-right: 15px;
  font-size: 14px;
`;

const AuthorName = styled.div`
  font-size: 14px;
`;

const SmallBookCard = styled.div``;

const SideBarImg = styled.img<{ sidebar?: string }>`
  width: 150px;
  ${props => props.sidebar && "height: 200px; margin: 0 auto;"}
`;

const SmallImg = styled.img`
  border-radius: 16px 16px 0px 0px;
  width: 100px;
  height: 100%;
  margin: 15px;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const CardContent = styled.div`
  font-size: 18px;
`;

export default Card;
