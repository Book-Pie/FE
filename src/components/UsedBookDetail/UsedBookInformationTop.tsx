import { UsedBookDetailResponse } from "src/modules/Slices/usedBookDetail/types";
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
}: UsedBookDetailResponse) => {
  return (
    <>
      <CategoryArea>
        {fstCategory} &gt; {sndCategory}
      </CategoryArea>
      <UsedBookDetailWrapper>
        <UsedBookImg src={`${process.env.BASE_URL}/image/${images}`} alt="latestImg" />
        <UsedBookArea title={title} price={price} content={content} view={view} uploadDate={uploadDate} tags={tags} />
      </UsedBookDetailWrapper>
    </>
  );
};

export default UsedBookInformationTop;
