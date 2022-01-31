import Editor from "components/Editor/Editor";
import { memo } from "react";
import * as Styled from "./style";
import * as Types from "./types";

const SaleInsertEditor = ({ setEditorValue, editorValue }: Types.SaleInsertEditorProps) => {
  return (
    <Styled.Row>
      <div>
        <span>내용</span>
        <span>*</span>
      </div>
      <div className="editor">
        <Editor limit={2000} height={200} setEditorValue={setEditorValue} />
      </div>
    </Styled.Row>
  );
};

export default memo(SaleInsertEditor);
