import Card from "src/components/Cards/PublicCard";
import dummy from "src/db/data.json";
import { A, SideBar, SourcesArea } from "./style";

const BookSideBar = () => {
  return (
    <SideBar>
      <Card
        bookThumnail={dummy.book[0].bookThumnail}
        bookName={dummy.book[0].bookName}
        bookCategory={dummy.book[0].bookCategory}
        authorName={dummy.book[0].authorName}
      />
      <SourcesArea>
        도서 DB 제공 : <A href="www.aladin.co.kr">알라딘 인터넷 서점</A>
      </SourcesArea>
    </SideBar>
  );
};

export default BookSideBar;
