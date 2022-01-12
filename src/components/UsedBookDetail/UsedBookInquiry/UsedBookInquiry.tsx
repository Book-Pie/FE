import { useState } from "react";
import Editor from "src/components/Editor/Editor";
import { CountWrapper, ProductDetailTitle, UsedBookStoreInformationWrapper } from "../style";

const UsedBookInquiry = () => {
  const [myContent, setContent] = useState("");
  const count = 5;

  return (
    <UsedBookStoreInformationWrapper>
      <ProductDetailTitle>
        상품문의 <CountWrapper>{count}</CountWrapper>
      </ProductDetailTitle>
      <Editor
        setEditorValue={setContent}
        value={myContent}
        limit={100}
        height={100}
        placeholder="리뷰 작성 시 10자 이상 작성해주세요."
      />
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookInquiry;
