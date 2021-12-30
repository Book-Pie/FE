import styled from "styled-components";

interface SpanProps {
  color?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
  children: string;
  lineHeight?: string;
}

const Text = (props: SpanProps) => {
  const { color, fontSize, children, margin, padding, lineHeight } = props;
  const styles = {
    color,
    fontSize,
    margin,
    padding,
    lineHeight,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  color: "black",
  fontSize: "14px",
  margin: "0px",
  padding: "0px",
  lineHeight: "1.2",
};

const P = styled.p<SpanProps>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  line-height: ${props => props.lineHeight};
`;

export default Text;
