import styled from "styled-components";

export const OrderWrapper = styled.div`
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
