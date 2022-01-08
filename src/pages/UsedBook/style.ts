import styled from "styled-components";

export const UsedBookContainer = styled.div`
  text-align: center;
  .usedBook__title {
    margin-top: 5rem;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  flex-direction: column;

  .contentsWrapper__row {
    margin-top: 1.5rem;
    display: flex;
  }
  & > div > div {
    flex: 1;
  }
  .contentsWrapper__row--empty {
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    box-shadow: rgb(0 0 0 / 50%) 0px 4px 16px 0px;
    border-radius: 5px;
  }
`;

export const DropDownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
`;
