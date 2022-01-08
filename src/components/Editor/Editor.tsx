import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import * as Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { EditorProps } from "./types";
import { ReactQuillContainer } from "./style";
/*
 이미지 업로드 에디터 빼고는 사용 가능합니다. 
 이미지 업로드 에디터는 추후에 업데이트 할 려고합니다.  
*/
const Editor = ({
  placeholder = "내용을 입력해주세요.",
  toolbar,
  height = 100,
  limit = 50,
  value = "",
  setEditorValue,
}: EditorProps) => {
  const quillRef = useRef<ReactQuill>();
  const [currentToolbar] = useState(toolbar);
  const [contents, setContents] = useState(value);
  const [currentLimt, setCurrentLimit] = useState(0);
  const maxLength = useMemo(() => limit, [limit]);

  // 이미지 업로드 툴바
  const uploadModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["image"],
        ],
      },
    }),
    [],
  );
  // 노 이미지 업로드 툴바
  const noUploadModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
        ],
      },
    }),
    [],
  );

  // 툴바 없는 버전
  const noMoDules = useMemo(
    () => ({
      toolbar: false,
    }),
    [],
  );

  const handleRef = useCallback((element: ReactQuill | null) => {
    if (element !== null) {
      quillRef.current = element;
    }
  }, []);

  // editor 에디터 타입을 가져올려고하니깐 에러가난다. 나중에 해결해야된다.
  const hanldeOnChange = useCallback(
    (html: string, delta: Quill.Delta, source: Quill.Sources, editor: any) => {
      if (quillRef.current && maxLength) {
        const unprivilegedEditor = quillRef.current.getEditor();
        const currentLength = editor.getLength() - 1;

        if (currentLength > maxLength) {
          unprivilegedEditor.deleteText(maxLength, unprivilegedEditor.getLength());
        } else {
          setContents(html);
          setCurrentLimit(editor.getLength() - 1);
        }
      }
    },
    [maxLength],
  );

  useEffect(() => {
    setEditorValue(contents);
  }, [contents, setEditorValue]);

  let editor = (
    <ReactQuill
      ref={handleRef}
      value={contents}
      onChange={hanldeOnChange}
      modules={noMoDules}
      theme="snow"
      placeholder={placeholder}
    />
  );

  if (currentToolbar === "no-upload-toolbar") {
    editor = (
      <ReactQuill
        ref={handleRef}
        value={contents}
        onChange={hanldeOnChange}
        modules={noUploadModules}
        theme="snow"
        placeholder={placeholder}
      />
    );
  }

  if (currentToolbar === "upload-toolbar") {
    editor = (
      <ReactQuill
        ref={handleRef}
        value={contents}
        onChange={hanldeOnChange}
        modules={uploadModules}
        theme="snow"
        placeholder={placeholder}
      />
    );
  }

  return (
    <ReactQuillContainer height={height}>
      {editor}
      <div className="reactQuill__textLimitBox">
        <div>최대 {limit}자</div>
        <div>{currentLimt}자</div>
      </div>
    </ReactQuillContainer>
  );
};

export default Editor;
