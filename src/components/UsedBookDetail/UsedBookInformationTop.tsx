import { useHistory } from "react-router";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { UsedBookDetailResponse } from "src/modules/Slices/usedBookDetail/types";
import { useTypedSelector } from "src/modules/store";
import { CategoryArea, UsedBookDetailWrapper, UsedBookImg } from "./style";
import UsedBookArea from "./UsedBookContent/UsedBookArea";

const UsedBookInformationTop = ({
  title,
  price,
  content,
  view,
  uploadDate,
  fstCategory,
  sndCategory,
  tags,
  images,
  likeCount,
  replyCount,
  usedBookId,
  bookState,
  saleState,
}: UsedBookDetailResponse) => {
  const history = useHistory();
  const { isLoggedIn } = useTypedSelector(signInSelector);

  return (
    <>
      <CategoryArea>
        {fstCategory} &gt; {sndCategory}
      </CategoryArea>
      <UsedBookDetailWrapper>
        <UsedBookImg src={`${process.env.BASE_URL}/image/${images}`} alt="latestImg" />
        <UsedBookArea
          title={title}
          price={price}
          content={content}
          view={view}
          uploadDate={uploadDate}
          tags={tags}
          likeCount={likeCount}
          replyCount={replyCount}
          usedBookId={usedBookId}
          checkAuth={() => {
            if (isLoggedIn) {
              return true;
            }
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
              history.replace("/signIn");
            }
            return false;
          }}
        />
      </UsedBookDetailWrapper>
    </>
  );
};

export default UsedBookInformationTop;
