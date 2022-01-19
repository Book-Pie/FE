import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  background-color: ${p => p.theme.colors.mainLightBrown};
  ${p => p.theme.shadow[10]};
  border-radius: 5px;
  padding: 30px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
  width: 900px;
  margin: 0 auto;
  border-bottom: 2px solid ${p => p.theme.colors.darkGrey};

  img {
    width: 100%;
    height: 100%;
  }
  & > p {
    font-size: 35px;
    font-weight: 900;
    margin-top: 30px;
  }

  .header__info {
    display: flex;
    gap: 20px;
  }
  .header__img {
    width: 200px;
    height: 200px;
  }
  .header__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  .header__text {
    & > p:first-child {
      font-size: 30px;
      font-weight: 900;
    }
    & > p:last-child {
      font-size: 20px;
      font-weight: 900;
    }
  }
`;

export const Empty = styled.div`
  min-height: 500px;
`;
