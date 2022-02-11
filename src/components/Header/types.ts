export interface SearchForm {
  title: string;
}

export type Infos = {
  endPoint: string;
  text: string;
  onClick?: () => void;
};
