import Editor from "components/Editor/Editor";
import { memo } from "react";
import { UsedBookResponse } from "pages/types";
import * as Types from "./types";

const SaleInsertEditor = ({ setEditorValue, usedBookResource }: Types.SaleInsertEditorProps) => {
  const { data } = usedBookResource?.read<UsedBookResponse>() || {};

  return (
    <div className="editor">
      <Editor limit={2000} height={200} setEditorValue={setEditorValue} value={data?.content} />
    </div>
  );
};

export default memo(SaleInsertEditor);
