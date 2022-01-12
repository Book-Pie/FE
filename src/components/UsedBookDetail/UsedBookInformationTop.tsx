import { CategoryArea, UsedBookDetailWrapper, UsedBookImg } from "./style";
import UsedBookArea from "./UsedBookContent/UsedBookArea";

const UsedBookInformationTop = () => {
  return (
    <>
      <CategoryArea> 중고장터 에세이</CategoryArea>
      <UsedBookDetailWrapper>
        <UsedBookImg />
        <UsedBookArea />
      </UsedBookDetailWrapper>
    </>
  );
};

export default UsedBookInformationTop;
