export interface DropDownProps {
  children: React.ReactNode;
  defaultValue?: string;
  setSelectedValue: (param: string) => void;
}

export interface UlProps {
  visible: boolean;
}
