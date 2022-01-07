export interface DropDownProps {
  children: React.ReactNode;
  defaultValue?: string;
  setSelectedId?: (id: string) => void;
  setSelectedText?: (text: string) => void;
}

export interface UlProps {
  visible: boolean;
}
