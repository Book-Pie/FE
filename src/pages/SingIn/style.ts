import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  width: 50%;
  margin: 0 auto;
  background-color: rgb(245, 246, 247);
  text-align: center;
`;

export const Links = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;

  a + a,
  .links__email--remember + a,
  input + .links__email--remember {
    margin-left: 5px;
  }

  input {
    margin: 0;
  }
  a,
  span {
    position: relative;
  }

  span + span {
    margin-left: 20px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      height: 50%;
      width: 1px;
      margin: auto;
      border-left: 1px solid black;
    }
  }
`;

export const OAuths = styled.div`
  display: flex;
  width: 40%;
  margin: 0 auto;
  margin-top: 10px;
  gap: 10px;

  a {
    flex: 1;
    box-sizing: border-box;
  }

  img {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }
`;
