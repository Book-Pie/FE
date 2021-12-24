import { ErrorMessageWapper } from "./style";
import { ErrorMessageProps } from "./types";

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (message) {
    return (
      <ErrorMessageWapper>
        <span>{message}</span>
      </ErrorMessageWapper>
    );
  }
  return null;
};

ErrorMessage.defaultProps = {
  message: "",
};

export default ErrorMessage;
