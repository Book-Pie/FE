export interface TextareaAutosizeParam {
  isLoggedIn: boolean;
  onChange: (event: any) => void;
  checkAuth: () => boolean;
  value: string;
  placeholder: string;
}
