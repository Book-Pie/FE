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

export const DropDownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  p {
    color: ${props => props.theme.colors.mainDarkBrown};
  }

  a {
    display: block;
    padding: 15px 14px;
  }

  & > div {
    width: 7rem;
    height: 3rem;
  }
`;
