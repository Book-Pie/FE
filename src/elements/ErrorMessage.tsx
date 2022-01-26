import { memo } from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessageContainer = styled.div`
  background-color: ${props => props.theme.colors.error};
  padding: 1rem;
  color: white;
  border-radius: 5px;
  line-height: 1.3;
`;

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (message) {
    return (
      <ErrorMessageContainer>
        <span>{message}</span>
      </ErrorMessageContainer>
    );
  }
  return null;
};

ErrorMessage.defaultProps = {
  message: "",
};

export default memo(ErrorMessage);
