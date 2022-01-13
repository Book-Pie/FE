import styled from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
`;

export const FlexColum = styled.div`
  flex-direction: column;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

export const ExpanderArea = styled.div`
  text-align: right;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 700px;
  height: 1500px;
`;

export const A = styled.a`
  text-decoration: none;
`;

export const SideBar = styled.div`
  position: fixed;
  left: 30px;
  width: 250px;
  height: 200px;
`;

export const SourcesArea = styled.div`
  margin: 15px;
  font-size: 14px;
`;

export const Button = styled.button`
  cursor: pointer;
  color: #646c73;
  border: none;
  background-color: white;
`;

export const P = styled.p`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  line-height: 1.5em;
`;
