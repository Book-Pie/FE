import React from "react";
import styled from "styled-components";
import Card from "../Cards/PublicCard";
import dummy from "../../db/data.json";

const BookSideBar = () => {
  return (
    <SideBar>
      <Card
        bookThumnail={dummy.book[0].bookThumnail}
        bookName={dummy.book[0].bookName}
        bookCategory={dummy.book[0].bookCategory}
        authorName={dummy.book[0].authorName}
      />
    </SideBar>
  );
};

const SideBar = styled.div`
  display: inline-flex;
  position: fixed;
  left: 30px;
  width: 250px;
  height: 400px;
`;

export default BookSideBar;
