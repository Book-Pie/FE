import { memo } from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessageWapper = styled.div`
  background-color: ${props => props.theme.colors.error};
  padding: 1rem;
  color: white;
  border-radius: 5px;
`;

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

export default memo(ErrorMessage);
