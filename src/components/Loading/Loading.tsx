import ReactLoading from "react-loading";
import { Wrapper } from "./style";
import { LoadingProps } from "./types";

const Loading = ({ isVisible }: LoadingProps) => {
  if (isVisible) {
    return (
      <Wrapper>
        <ReactLoading type="spin" color="#a55eea" />
      </Wrapper>
    );
  }

  return null;
};

export default Loading;
