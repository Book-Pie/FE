import React, { useState } from "react";
import styled from "styled-components";
import BookDetailContent from "./components/BookDatail/BookDetailContent";
import BookInfo from "./components/BookDatail/BookDetailContent";
import BookSideBar from "./components/BookDatail/BookSideBar";
import test from "./assets/images.png";

const App = () => {
  return (
    <>
      <BookSideBar />
      <BookDetailContent />
      {test}
    </>
  );
};

export default App;
