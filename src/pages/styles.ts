import styled from "styled-components";

export const CommunityContainer = styled.main`
  margin: 0 0.9rem;
  min-height: 500px;
  ${({ theme }) => theme.media.mobile} {
    margin: 0 0.5rem;
  }
`;

export const FindContainer = styled.main`
  width: 500px;
  padding: 1rem 2rem;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.mainDarkBrown};
  ${({ theme }) => theme.shadow[0]};
  border-radius: 5px;
  button {
    margin-bottom: 0.5rem;
    height: 50px;
    width: 100%;
    font-size: 1rem;
    transition: opacity 0.25s ease-in;
    :hover {
      opacity: 0.8;
    }
  }
  ${({ theme }) => theme.media.mobile} {
    width: auto;
    margin: 0;
    padding: 1rem;
    button {
      font-size: 0.8rem;
    }
  }
`;

export const Text = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin: 50px 0px 22px 0px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(99, 110, 114, 0.1);
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
    margin: 35px 0px 12px 0px;
  }
`;

export const MainSection = styled.section`
  padding: 0 1rem;
  @media screen and (max-width: 800px) {
    padding: 0 0.5rem;
  }
`;

const activeBorderColor = "rgba(52, 73, 94, 1)";

export const MyContainer = styled.main`
  margin: 2rem 0;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 0rem;
    margin: 0;
  }
`;

export const MyMenuTabWrapper = styled.section`
  margin-top: 1rem;

  .active {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.darkGrey};
    border: 1px solid ${activeBorderColor};
    border-bottom: none;
    opacity: 1;
    font-weight: bold;
  }
  a {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid rgba(189, 195, 199, 0.4);
    border-bottom: 1px solid ${activeBorderColor};
    background-color: ${({ theme }) => theme.colors.mainLightBrown};
    opacity: 0.5;
    text-align: center;

    @media screen and (max-width: 900px) {
      height: 50px;
      width: 150px;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.6rem;
    }
    :hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
    }
  }
  & .MuiTabs-root {
    position: relative;
    overflow: visible;
    width: 100%;
  }

  @media screen and (max-width: 900px) {
    & .MuiTabs-flexContainer {
      display: block;
    }
  }
  & .MuiButtonBase-root {
    padding: 0;
    flex: 1;
  }
  & .MuiTabScrollButton-root {
    position: absolute;
    z-index: 5;
    top: 100%;
    padding: 10px;
  }
  & .MuiTabScrollButton-root:first-child {
    left: 0;
  }
  & .MuiTabScrollButton-root:last-child {
    right: 0;
  }
`;

export const MyRouterWrapper = styled.section`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    min-height: 200px;
  }
`;

export const OauthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;

  .isError {
    width: 500px;
    height: 300px;
    background-color: red;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    font-size: 20px;
    align-items: center;
    color: ${props => props.theme.colors.mainDarkBrown};
    background-color: ${props => props.theme.colors.mainLightBrown};
    ${props => props.theme.shadow[10]};
    strong {
      color: #fee500;
      font-size: 25px;
      font-weight: 600;
    }
    .naver {
      color: rgb(12, 166, 120);
    }
  }
`;

export const OrderContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
  ${p => p.theme.shadow[0]};
  border-radius: 5px;
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 70%;
  margin: 0 auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(99, 110, 114, 0.2);
  a {
    display: block;
  }

  & > p {
    font-size: 2.5rem;
    font-weight: 600;
    margin: 1rem;
    text-align: center;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.info};
  }

  .header__info {
    display: flex;
    gap: 1rem;
  }
  .header__img {
    width: 200px;
    height: 300px;
    height: 100%;
  }
  .header__text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    p {
      font-size: 1.5rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
    p:nth-child(2n) {
      color: ${({ theme }) => theme.colors.info};
      font-weight: 100;
      display: -webkit-box;
      word-break: break-word;
      overflow-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-height: 1.2;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    width: auto;
    & > p {
      font-size: 1.3rem;
      margin-top: 1rem;
      line-height: 1.3;
    }

    .header__text {
      gap: 0.5rem;
      p {
        font-size: 1.1rem;
      }
      p:nth-child(2n) {
        font-size: 0.8rem;
      }
    }
  }
`;

export const Empty = styled.div`
  min-height: 500px;
`;

export const PaymentContainer = styled.div`
  margin: 50px 20px;
  button {
    border: none;
    box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
    padding: 25px 0;
    cursor: pointer;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
    transition: transform 0.5s ease;
  }
  button:hover {
    transform: scale(1.03);
    opacity: 0.7;
  }

  #kakao {
    background-color: #fee500;
    color: #000000 85%;
  }

  #inicis {
    background-color: #c1272c;
    color: #fff;
  }

  #close {
    background-color: #4f3629;
    color: #fff;
    width: 100%;
  }

  p {
    margin: 20px 0;
    text-align: center;
  }
  .payment__title {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 200px;
      height: 60px;
    }
    h1 {
      font-size: 50px;
      margin: 20px 0;
      font-weight: 900;
    }
  }

  .payment {
    max-width: 500px;
    margin: 0 auto;
  }

  .payment__buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .payment__buttons {
    div {
      flex: 1;
      display: flex;
      gap: 20px;
    }
    button {
      width: 50%;
    }
  }

  .payment__result {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    p {
      font-size: 25px;
    }
  }
  .payment__price {
    font-size: 30px;
  }
  .payment__priceInput {
    margin: 20px 0;
  }
  .payment__priceButton {
    margin: 20px 0;
    & > div {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    button {
      border: 1px solid transparent;
      flex: 1;
      background-color: rgb(18, 184, 134);
      color: white;
      padding: 0 10px;
      font-size: 15px;
      height: 50px;
      &:active {
        background-color: white;
        border: 1px solid rgb(18, 184, 134);
        color: black;
      }
    }
  }
  .payment__totalPoint {
    font-size: 35px;
    margin: 20px 0;
    width: 100%;
  }
`;

export const SearchContainer = styled.div`
  padding: 0 1.5rem;
  ${({ theme }) => theme.media.mobile} {
    padding: 0 0.5rem;
    h4 {
      font-size: 30px;
    }
  }
`;

export const SignInContainer = styled.main`
  padding: 2rem 2rem 1rem 2rem;
  margin: 2rem auto 0 auto;
  color: ${p => p.theme.colors.mainDarkBrown};
  border-radius: 5px;
  text-align: center;
  min-width: 375px;
  ${p => p.theme.shadow[0]};

  & > div:nth-child(2) {
    display: flex;
    padding: 2rem 0;
  }

  ${p => p.theme.media.mobile} {
    padding: 2rem 1rem 1rem 1rem;
    margin: 0;
    & > div:nth-child(2) {
      padding: 1rem 0;
    }
  }
`;

export const TitleImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 2rem;
    margin: 1rem 0;
    font-weight: 900;
    color: ${p => p.theme.colors.darkGrey};
  }
  ${p => p.theme.media.mobile} {
  }
`;

export const Right = styled.div`
  flex: 1;
  margin-left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    max-height: 500px;
    border-radius: 5px;
  }
  ${p => p.theme.media.mobile} {
    display: none;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const Links = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    padding-top: 0.5rem;
    padding-bottom: 0;
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.info};
    :hover {
      border-bottom: 1px solid ${props => props.theme.colors.info};
    }
  }
  span {
    font-size: 0.9rem;
  }
  p {
    font-weight: bold;
  }

  & > div {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${p => p.theme.media.mobile} {
    & > div {
      flex-direction: column;
      gap: 0.7rem;
      padding: 0.5rem 0;
    }
  }
`;

export const Oauths = styled.div`
  display: flex;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;

  a {
    box-sizing: border-box;
    height: 50px;
    transition: opacity 0.5s ease-in;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    :hover {
      opacity: 0.6;
    }
  }
  a + a {
    margin-left: 10px;
  }

  ${p => p.theme.media.mobile} {
    flex-direction: column;
    a {
      height: 75px;
      width: 80%;
    }
    a + a {
      margin-left: 0px;
      margin-top: 1rem;
    }
  }
`;

export const UsedBookContainer = styled.main`
  margin-bottom: 2rem;
  padding: 0 1rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 1rem;
  }
`;

export const SignUpContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  margin: 2rem 0;
  ${({ theme }) => theme.shadow[0]};

  h3 {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
`;

export const ChatContainer = styled.main`
  width: 50%;
  margin: 20px auto;
  & > div {
    ${({ theme }) => theme.shadow[0]};
  }

  ${({ theme }) => theme.media.tab} {
    width: 80%;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin: 0;
  }
`;

export const ChatEmpty = styled.div`
  height: 100vh;
`;
