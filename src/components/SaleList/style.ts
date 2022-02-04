import styled from "styled-components";

export const SaleListWrapper = styled.div`
  flex: 1;
  margin-top: 2rem;
  padding: 0 1rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 0.5rem;
    margin-bottom: 2rem;
  }
`;

export const SaleSearch = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;
  & > div:first-child {
    width: 50%;
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    margin: 1rem 0;
    & > div:first-child,
    & > div {
      width: 100%;
    }
  }
`;
export const SaleFilter = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: flex-end;
  gap: 1rem;
  button {
    height: 100%;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 1rem 0;
  }
`;

export const SaleTableHeader = styled.div`
  display: flex;
  & > div {
    text-align: center;
    flex: 1;
    border-top: 1px solid rgba(99, 110, 114, 0.2);
    border-bottom: 1px solid rgba(99, 110, 114, 0.2);
    padding: 0 0.5rem;
    & > span {
      display: block;
      margin: 15px 0;
      font-size: 1rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }
`;
export const SaleCell = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  a {
    flex: 1;
  }
`;

export const SaleTableBody = styled.div`
  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainLightBrown};
    display: flex;
    padding: 10px 0;
  }

  span {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 950px) {
    button {
      border: none;
      padding: 0.5rem;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      height: 30px;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    span {
      font-size: 0.6rem;
    }
    img {
      width: 80px;
      height: 80px;
    }
    svg {
      width: 24px;
    }
    h6 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.6rem;
      width: 180px;
    }
    button {
      padding: 0.4rem;
      font-size: 0.5rem;
    }
  }
`;
export const SaleImage = styled.img`
  height: 100px;
  width: 100px;
`;

export const SaleState = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainDarkBrown};
  .red {
    color: ${({ theme }) => theme.colors.error};
  }
  .info {
    color: ${({ theme }) => theme.colors.info};
  }
`;

export const SaleTitle = styled.div`
  display: flex;
  align-items: center;
  span {
    display: block;
    color: ${({ theme }) => theme.colors.info};
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 1rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-weight: 900;
    margin: 10px;
  }
`;
export const SaleLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  ${({ theme }) => theme.media.mobile} {
    span {
      font-size: 1rem;
    }
  }
`;

export const SalePrice = styled.div`
  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.mainDarkBrown};
  }
`;
export const SaleDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.mainDarkBrown};
  }
  span:first-child {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;
export const Empty = styled.div`
  display: flex;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  p {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.mainDarkBrown};
    font-weight: 600;
  }
  img {
    width: 300px;
    height: 300px;
  }
`;
