import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;
export const TableHeader = styled.div`
  display: flex;
  & > div {
    text-align: center;
    flex: 1;
    border-top: 1px solid ${props => props.theme.colors.darkGrey};
    border-bottom: 1px solid ${props => props.theme.colors.darkGrey};
    & > span {
      display: block;
      margin: 15px 0;
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
export const Cell = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    flex: 1;
  }
`;

export const TableBody = styled.div`
  & > div {
    border-bottom: 1px solid ${props => props.theme.colors.mainLightBrown};
    display: flex;
    padding: 10px 0;
  }
`;
export const Image = styled.div`
  height: 150px;
  width: 150px;
  img {
    height: 100%;
    width: 100%;
  }
`;

export const State = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.mainDarkBrown};
`;

export const Title = styled.div`
  width: 100%;
  span {
    color: #1565c0;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    font-weight: 900;
    padding: 10px;
  }
`;
export const Like = styled.div`
  display: flex;
  gap: 10px;
`;

export const Price = styled.div`
  span {
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.colors.mainDarkBrown};
  }
`;
export const Date = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    font-weight: 700;
    font-size: 15px;
    color: ${props => props.theme.colors.mainDarkBrown};
  }
  span:first-child {
    font-size: 18px;
  }
`;
export const Empty = styled.div`
  display: flex;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 20px;
    color: ${props => props.theme.colors.mainDarkBrown};
    font-weight: 600;
  }
  img {
    width: 300px;
    height: 300px;
  }
`;
