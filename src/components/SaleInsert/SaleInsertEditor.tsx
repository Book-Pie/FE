import Editor from "components/Editor/Editor";
import { memo } from "react";
import * as Types from "./types";

const SaleInsertEditor = ({ setEditorValue, usedBookResource }: Types.SaleInsertEditorProps) => {
  const axioseReponse = usedBookResource?.read<Types.UsedBookResponseType>();

  return (
    <div className="editor">
      <Editor limit={2000} height={200} setEditorValue={setEditorValue} value={axioseReponse?.data.data.content} />
    </div>
  );
};

export default memo(SaleInsertEditor);
