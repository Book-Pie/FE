export interface FindEmailForm {
  name: string;
  phone: string;
}

export interface FormProps {
  onSubmit: (FormData: FindEmailForm) => void;
}
