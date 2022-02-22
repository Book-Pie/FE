import styled from "styled-components";

export const BookDetailHeaderWrapper = styled.div`
  height: 300px;
  width: 100%;
  background-color: #f8f8f8;
  padding: 40px;
  border-bottom: 1px solid #e5e5e5;
`;

export const ButtonText = styled.span`
  color: #ef3b96;
`;

export const RatingContent = styled.span`
  font-size: 15px;
  margin-right: 5px;
`;

export const RatingScore = styled.span`
  font-size: 15px;
  color: #ef3b96;
`;

export const BookInfo = styled.div`
  margin: 20px;
`;

export const BookTitle = styled.div`
  color: #333;
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const BookDetailTopContent = styled.div`
  display: flex;
  margin: 0 auto;
  width: 700px;
`;

export const BookDetailImg = styled.img`
  width: 127px;
  height: 210px;
`;
export const BookCategory = styled.div`
  margin-bottom: 20px;
`;
export const SmallBookInfo = styled.div`
  color: #a2a2a2;
  margin-bottom: 20px;
`;

export const BookRatingContent = styled.div`
  padding-left: 10px;
`;

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

export const CardBase = styled.div`
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  overflow-y: hidden;
  border-bottom: 2px solid #eeeeee;
`;

export const BookDetailTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const AuthorTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const ExpanderArea = styled.div`
  text-align: right;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 44rem;
  min-height: 1200px;

  @media screen and (max-width: 730px) {
    width: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

export const A = styled.a`
  text-decoration: none;
`;

export const SideBar = styled.div`
  width: 100%;
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

export const Wrapper = styled.div`
  overflow-y: auto;
  margin-bottom: 100px;
`;

export const BookDetailContentWrapper = styled.div`
  margin-bottom: 100px;
`;

export const Flexbox = styled.div`
  display: flex;
`;

export const PhotoImg = styled.img`
  border: 4px solid white;
`;

export const ImgWrapper = styled.div`
  border: 1px solid none;
  background-color: #f7f6f1;
  padding: 15px;
  text-align: center;
  margin-right: 20px;
  height: 200px;
`;
