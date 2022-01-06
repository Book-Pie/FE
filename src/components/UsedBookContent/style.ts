import styled from "styled-components";

export const Wrapper = styled.div`
  cursor: pointer;
  width: 20%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.4s, box-shadow 0.4s ease-in;
  box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px;

  a {
    text-decoration: none;
    color: black;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: rgb(0 0 0 / 50%) 0px 4px 16px 0px;
  }

  .usedBookContent__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
  }

  .usedBookContent__cotent {
    padding: 0.5rem 1rem 1rem;
  }

  .usedBookContent__imgBox {
    position: relative;
    padding-top: 300px;
  }
  .usedBookContent__img {
    position: absolute;
    display: block;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .usedBookContent__price {
    text-align: left;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
