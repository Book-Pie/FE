export interface TextareaAutosizeParam {
  isLoggedIn: boolean;
  onChange: (event: any) => void;
  checkAuth: () => boolean;
  value: string;
  limit: number;
  height: number;
  placeholder: string;
}
