import styled from "styled-components";

export const SlierBox = styled.div`
  width: 100%;
  height: 280px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const BookInfo = styled.div`
  width: 122px;
  height: 116px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  .slider__title {
    width: 122px;
    margin: 0 0 8px;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
    word-wrap: break-word;
    text-align: center;
    line-height: 1.1;
  }
  .slider__category {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.36px;
    text-align: center;
    word-wrap: break-word;
    color: #434343;
  }
  .slider__price {
    height: 24px;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #4f3629;
  }
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SignWrapper = styled.div`
  background-color: ${props => props.theme.colors.mainDarkBrown};
  a {
    color: ${props => props.theme.colors.white};
  }
  div {
    display: flex;
    justify-content: flex-end;
    span {
      text-align: center;
      width: 100px;
      font-size: 1rem;
      margin: 0.875rem 0 0.9375rem 0;
      padding: 0 0.3125rem;
    }
    span + span {
      border-left: 1px solid white;
    }
  }
`;

export const NavWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.mainDarkBrown};
  a {
    color: ${props => props.theme.colors.mainDarkBrown};
  }
  img {
    height: 2.5375rem;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  border-radius: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  width: 500px;
  input {
    border: none;
    background-color: ${props => props.theme.colors.mainLightBrown};
    border-radius: 27px;
    flex: 1;
    height: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    font-size: 1rem;
  }
  img {
    position: absolute;
    right: 0;
    height: 20px;
    margin-right: 1rem;
    cursor: pointer;
  }
`;

export const RouterWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.colors.mainDarkBrown};
  span {
    cursor: pointer;
    text-align: center;
    width: 6.25rem;
    font-size: 18px;
    padding: 0px 8px;
    font-weight: bold;
    letter-spacing: -0.45px;
    padding: 0px 8px;
  }
  span + span {
    border-left: 1px solid black;
  }
`;

export const FisrtItemWrapper = styled.div`
  background-color: ${props => props.theme.colors.mainDarkBrown};
  margin: 10px;
  padding: 15px 10px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.5s ease-in-out;

  .BestSeller__first {
    display: flex;
    padding: 25px 30px;
    height: 100%;
    & > div:first-child {
      width: 160px;
    }
    & > div:last-child {
      width: 200px;
    }
  }
  :hover {
    transform: scale(1.05);
  }

  .bestSeller__rank {
    width: 76px;
    height: 76px;
    background-color: #dd002c;
    color: ${props => props.theme.colors.white};
    border-radius: 50%;
    font-family: NotoSerifDisplay;
    font-size: 40px;
    font-weight: 500;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -1.6px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bestSeller__title {
    height: 250px;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0 15px;
    color: ${props => props.theme.colors.white};
    font-size: 30px;
  }

  .bestSeller__rank + .bestSeller__title {
    margin-top: 15px;
  }
  .bestSeller__img {
    height: 340px;
    width: 150px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
`;

export const ItemWrapper = styled.div`
  background-color: #f2f2f2;
  margin: 10px;
  padding: 15px 10px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.5s ease-in-out;

  & > a {
    display: flex;
    & > div:first-child {
      width: 60px;
    }
    & > div:last-child {
      width: 100px;
    }
  }

  :hover {
    transform: scale(1.02);
  }
  .bestSeller__img {
    height: 170px;
    width: 150px;
    img {
      width: 90px;
      height: 100%;
      border-radius: 5px;
    }
  }

  .bestSeller__rank {
    width: 40px;
    height: 40px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.mainDarkBrown};
    border-radius: 50%;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -1.2px;
    text-align: center;
  }

  .bestSeller__title {
    width: 60px;
    height: 120px;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0 5px;
  }

  .bestSeller__rank + .bestSeller__title {
    margin-top: 10px;
  }
`;

export const TextArea = styled.div``;
