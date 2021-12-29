export interface DropDownProps {
  children: React.ReactNode;
  defaultValue?: string;
  setValue: (param: string) => void;
}

export interface UlWrapperProps {
  visible: boolean;
}
