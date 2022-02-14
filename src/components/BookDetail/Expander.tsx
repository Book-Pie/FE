import { Button, ButtonText } from "./style";
import { ExpanderProps } from "./types";

export const Expander = ({ text, onClick }: ExpanderProps) => {
  return (
    <Button onClick={onClick} className="BookDetail_ContentTruncButton">
      <ButtonText>{text}</ButtonText>
    </Button>
  );
};
