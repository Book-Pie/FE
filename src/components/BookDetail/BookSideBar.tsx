import Card from "components/Cards/PublicCard";
import { A, SideBar, SourcesArea } from "./style";

const BookSideBar = ({ author, cover, title, categoryName, publisher }) => {
  return (
    <SideBar>
      <Card
        bookThumnail={cover}
        bookName={title}
        bookCategory={categoryName}
        authorName={author}
        publisher={publisher}
      />
      <SourcesArea>
        도서 DB 제공 : <A href="www.aladin.co.kr">알라딘 인터넷 서점</A>
      </SourcesArea>
    </SideBar>
  );
};

export default BookSideBar;
