export interface IFindPassword {
  email: string;
  name: string;
  phone: string;
  password: string;
}
export interface IFindPasswordForm {
  onSubmit: (FormData: IFindPassword) => void;
}
