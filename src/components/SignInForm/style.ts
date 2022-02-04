import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 0.7rem;
  ${p => p.theme.media.mobile} {
    flex-direction: column;
  }
`;

export const Input = styled.div`
  flex: 8;
  div + div {
    margin-top: 0.5125rem;
  }
`;
export const Submit = styled.div`
  flex: 2;
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainDarkBrown};
  font-weight: bold;
  :hover {
    opacity: 0.7;
  }
  cursor: pointer;
  ${p => p.theme.shadow[0]}
  ${p => p.theme.media.mobile} {
    height: 70px;
  }
`;
