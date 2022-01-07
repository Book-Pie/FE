import styled from "styled-components";

interface SpanProps {
  color?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
  children: string | number;
  lineHeight?: string;
  width?: string;
  bold?: boolean;
}

const Text = (props: SpanProps) => {
  const { color, fontSize, children, margin, padding, lineHeight, width, bold } = props;
  const styles = {
    color,
    fontSize,
    margin,
    padding,
    lineHeight,
    width,
    bold,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  color: "black",
  fontSize: "14px",
  margin: "0px",
  padding: "0px",
  lineHeight: "1.2",
  width: "60",
  bold: false,
};

const P = styled.p<SpanProps>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => (props.bold ? "600" : "400")};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  line-height: ${props => props.lineHeight};
  width: ${props => props.width};
`;

export default Text;
