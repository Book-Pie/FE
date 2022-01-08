// 첫번째는 이미지 업로드 툴바
// 두번째 이미지 업로드는 없는 툴바
// mode props 없을땐 그냥 툴바 없는 모드

// height은 기본 높이 100px

// limit 기본 최대 50자까지 커스텀원하면 추가
export interface EditorProps {
  toolbar?: "upload-toolbar" | "no-upload-toolbar";
  height?: number;
  limit?: number;
  value?: string;
  placeholder?: string;
  setEditorValue: (value: string) => void;
  isDisabled?: boolean;
}

export interface ReactQuillWrapperProps {
  height: number | undefined;
  isDisabled?: boolean;
}
