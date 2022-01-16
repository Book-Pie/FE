import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const UsedBookCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding: 1rem 0.5rem;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.mainLightBrown};
  ${props => props.theme.shadow[30]};
`;

export const UsedBookRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  &:first-child {
    margin-top: 0;
  }
`;

export const UsedBookCardEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 5px;
  padding: 5rem 0;
  background-color: ${props => props.theme.colors.mainLightBrown};

  span {
    font-weight: 900;
    color: ${props => props.theme.colors.mainDarkBrown};
  }

  span + span {
    margin-top: 1.5rem;
  }

  img {
    width: 300px;
  }
`;
export const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div:nth-child(2) {
    width: 70%;
  }

  p {
    font-size: 30px;
    font-weight: bold;
    color: ${props => props.theme.colors.mainDarkBrown};
    margin: 30px 0px 42px 0px;
  }

  a {
    display: block;
    padding: 15px 14px;
  }
`;

export const DropDownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  div {
    width: 7rem;
    height: 3rem;
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  height: 50px;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 130px;
    padding: 15px 20px;
    text-align: center;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 900;
    background-color: #edeae9;
    color: ${p => p.theme.colors.mainDarkBrown};
    ${p => p.theme.shadow[10]};
    transition: all 0.25s ease-in;
    cursor: pointer;
    :hover {
      transform: scale(1.03);
    }
  }
  a + a {
    margin-left: 15px;
  }
`;
