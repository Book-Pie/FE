import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  lines: number;
  lineHeight: number;
  renderExpander?: ({
    isExpanded,
    isTruncated,
    expand,
  }: {
    isExpanded: boolean;
    isTruncated: boolean;
    expand: () => void;
  }) => any;
}

interface State {
  isExpanded: boolean;
  isTruncated: boolean;
}

export class TextTruncate extends React.Component<Props, State> {
  private wrapper: HTMLParagraphElement | null | undefined;

  public state = {
    isExpanded: false,
    isTruncated: false,
  };

  private expand = () => {
    this.setState({ isExpanded: true });
  };

  public componentDidMount() {
    if (this.wrapper) {
      if (this.wrapper.offsetHeight > this.props.lineHeight * this.props.lines) {
        this.setState({ isTruncated: true });
      }
    }
  }

  public render() {
    const { expand, props } = this;
    const { lines, text, lineHeight, renderExpander } = props;
    const { isExpanded, isTruncated } = this.state;

    const style = {
      WebkitLineClamp: isTruncated && !isExpanded ? lines : "unset",
      maxHeight: isTruncated && !isExpanded ? lines * lineHeight : "none",
    };
    return (
      <>
        <p
          ref={wrapper => (this.wrapper = wrapper)}
          dangerouslySetInnerHTML={{ __html: text.split("\n").join("<br />") }}
          style={style}
        />
        {!!renderExpander && renderExpander({ isExpanded, isTruncated, expand })}
      </>
    );
  }
}

const p = styled.p`
  display: inline-flex;
  position: fixed;
  left: 30px;
  width: 250px;
  height: 400px;
`;

export default TextTruncate;
