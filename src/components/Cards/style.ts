import styled from "styled-components";

export const CardBase = styled.div`
  // border-radius: 16px;
  // box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.18);
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  overflow-y: hidden;
  border-bottom: 2px solid #eeeeee;
`;

export const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

export const BookTitle = styled.h4`
  margin: 20px 0px;
`;

export const BookCategory = styled.div`
  margin-right: 15px;
  font-size: 14px;
  padding-bottom: 20px;
`;

export const SmallBookInfo = styled.div`
  font-size: 14px;
`;

export const PublisherName = styled.div``;

export const SmallBookCard = styled.div``;

export const SideBarImg = styled.img<{ sidebar?: string }>`
  width: 120px;
  ${props => props.sidebar && "height: 200px; margin: 0 auto;"}
`;

export const SmallImg = styled.img`
  border-radius: 16px 16px 0px 0px;
  width: 100px;
  height: 100%;
  margin: 15px;
  object-fit: cover;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

export const CardContent = styled.div`
  font-size: 18px;
`;
