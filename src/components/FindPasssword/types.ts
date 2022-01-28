export interface FindPasswordForm {
  email: string;
  name: string;
  phone: string;
  password: string;
}
export interface FormProps {
  onSubmit: (FormData: FindPasswordForm) => void;
}
