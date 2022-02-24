import styled from "styled-components";

export const EmptyWrapper = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const UsedBookLikeImg = styled.img`
  height: 50%;
`;

export const ContentWrapper = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  flex: 1;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
  }
`;

export const TitleSpan = styled.span`
  margin: 0 10px 0 20px;

  @media screen and (max-width: 700px) {
    margin-left: 1rem;
  }
`;

export const UsedBookLikeTitleSpan = styled.span`
margin: 0 10px 20px; 20px;
`;

export const Title = styled.div`
  width: 100%;
  height: 30px;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.67;
  letter-spacing: -0.45px;
  text-align: left;
  color: #4f3629;
`;

export const UsedBookLikeTitle = styled(Title)`
  margin-bottom: 20px;
`;

export const Header = styled.div`
  height: 65px;
  border-top: 1px solid rgb(238, 238, 238);
  margin: 10px 0 10px 0;
  padding: 10px 0 10px 0;

  p {
    padding: 15px;
  }
`;

export const UsedBookLikeListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 2rem;
  margin-bottom: 150px;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  background-color: #f8f8f8;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 3px;
  width: 100%;
  margin: 1rem 0;
  padding: 0 1rem;
  padding-bottom: 20px;
  padding-top: 20px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
`;

export const LikeCardWrapper = styled.div<{ width?: number }>`
  cursor: pointer;
  width: ${props => props.width}rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  padding: 0 0.5rem;
  margin-top: 15px;
  transition: transform 0.4s, box-shadow 0.4s ease-in;

  &:hover {
    transform: scale(1.02);
  }

  a {
    border: 1px solid #edeae9;
    display: block;
  }
  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .MuiButtonBase-root {
    position: absolute;
    top: 0.5rem;
    left: 10rem;
    width: 1.5rem;
    height: 1.5rem;
    z-index: 1;
  }

  .usedBookCard__imgBox {
    position: relative;
    padding-top: 300px;
    border-bottom: 1px solid #edeae9;

    img {
      position: absolute;
      display: block;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  .usedBookCard__content {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 0 0 0;
    border: 1px solid #dadce0;
    background: #fff;

    & > div + div {
      margin: 0.5rem 0;
    }
  }

  .usedBookCard__title {
    height: 2rem;
    font-size: 1rem;
    margin: 0 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  .usedBookCard__price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 1.1rem;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.info};
    text-overflow: ellipsis;
    white-space: nowrap;
    strong {
      font-weight: 900;
    }
  }
  .usedBookCard__state {
    font-size: 1rem;
    text-align: center;
    padding: 0.6rem;
  }

  @media screen and (max-width: 1000px) {
    padding: 0 0.3rem;
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 800px) {
    padding: 0 0.3rem;
    margin-top: 0.8rem;
    .usedBookCard__imgBox {
      padding-top: 250px;
    }
    .usedBookCard__price {
      font-size: 1rem;
      strong {
        font-weight: 900;
        font-size: 1.1rem;
      }
    }
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0 0.2rem;
    margin-top: 0.5rem;
    width: 100%;
    height: 100%;
    .usedBookCard__content {
      padding-top: 0.3rem;
    }

    .usedBookCard__imgBox {
      padding-top: 200px;
    }

    .usedBookCard__title {
      font-size: 0.8rem;
      line-height: 1.2;
    }
    .usedBookCard__price {
      font-size: 0.6rem;
      strong {
        font-weight: 900;
        font-size: 0.8rem;
      }
    }
    .usedBookCard__state {
      font-size: 0.7rem;
      text-align: center;
      padding: 0.3rem 0;
    }
  }
`;
