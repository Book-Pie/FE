import styled, { css, keyframes } from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  h5 {
    color: ${p => p.theme.colors.mainDarkBrown};
  }
  a {
    display: block;
  }
`;

export const SearchCard = styled.div`
  cursor: pointer;
  ${p => p.theme.shadow[0]}
  .content {
    padding: 15px;
  }
  .state {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    color: ${p => p.theme.colors.darkGrey};
    span:first-child {
      font-weight: bold;
      font-size: 19px;
    }
  }
  .state--lineThrough {
    text-decoration: line-through;
  }
  .description {
    height: 95px;
    margin-top: 10px;
    font-size: 15px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    color: ${p => p.theme.colors.darkGrey};
  }
  .like {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    span {
      font-weight: bold;
    }
  }
  .author {
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    color: ${p => p.theme.colors.mainDarkBrown};
    height: 20px;
  }
  .info {
    color: #1565c0;
  }
`;

export const SearchImg = styled.img`
  width: 100%;
  height: 300px;
  border-bottom: 1px solid rgba(99, 110, 114, 0.1);
`;
export const SearchTitle = styled.p`
  font-size: 22px;
  color: ${p => p.theme.colors.darkGrey};
  height: 35px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SearchAddMore = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 20px;
  border-bottom: 1px solid rgba(99, 110, 114, 0.3);
  padding-bottom: 15px;
  a {
    color: ${p => p.theme.colors.darkGrey};
    border-bottom: 1px solid transparent;
  }
  a:hover {
    border-bottom: 1px solid rgba(99, 110, 114, 1);
  }
`;
export const SearchEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 20px;
  color: ${p => p.theme.colors.darkGrey};
  ${p => p.theme.shadow[0]}

  img {
    width: 250px;
    height: 200px;
    padding: 15px;
  }
  p {
    padding: 15px;
  }
`;

const buttonUpDownKeyFrames = keyframes`
  0% {
   transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
 
`;

export const SearchTopButtonWrapper = styled.div<{
  isVisible: boolean;
}>`
  position: fixed;
  right: 10%;
  bottom: 0;
  transform: translateY(500px);
  transition: transform 0.5s ease-in-out;

  ${props => {
    return (
      props.isVisible &&
      css`
        transform: translateY(-100px);
      `
    );
  }}

  button {
    display: flex;
    padding: 15px;
    border-radius: 50%;
    border: none;
    ${p => p.theme.shadow[0]}
    background-color: ${p => p.theme.colors.mainDarkBrown};
    cursor: pointer;
    :hover {
      animation: ${buttonUpDownKeyFrames} 1.5s 0.2s infinite linear alternate;
    }
  }
`;
