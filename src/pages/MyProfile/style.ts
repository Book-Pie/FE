import styled from "styled-components";

export const Container = styled.div`
  width: 1600px;
  margin: 0 auto;

  .myProfile__title,
  .myProfile__top,
  .myProfile__link {
    display: flex;
    justify-content: center;
  }

  .myProfile__title {
    align-items: center;
    font-size: 3rem;
  }

  .myProfile__top {
    gap: 10px;
  }
  .myProfile__link {
    margin-top: 1rem;
    width: 100px;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px;
    font-weight: 900;
    & > a {
      padding: 1rem;
    }
  }
`;
