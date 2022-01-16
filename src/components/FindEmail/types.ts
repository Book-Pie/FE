export interface IFindEmail {
  name: string;
  phone: string;
}

export interface IFindEmailForm {
  onSubmit: (FormData: IFindEmail) => void;
}
