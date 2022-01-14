import styled from "styled-components";

export const Row = styled.div`
  text-align: left;
  margin-top: 20px;

  label {
    font-size: 20px;
    padding: 10px;
  }

  label + input {
    margin-top: 15px;
  }
  input {
    height: 50px;
  }
  input + div {
    margin-top: 15px;
  }
`;

export const Result = styled.div`
  margin-top: 15px;
  font-size: 20px;
  & > div:first-child {
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 15px 0;
    & > p:first-child {
      font-size: 25px;
      font-weight: 600;
    }
  }
`;
export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
`;
