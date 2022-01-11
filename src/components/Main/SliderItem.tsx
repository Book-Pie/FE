import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import styled from "styled-components";

interface BestSellerProps {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
}

const SliderItem = ({ id, title, category, price, image }: BestSellerProps) => {
  return (
    <>
      <SlierBox>
        <ProductImage src={image} />
      </SlierBox>
      <BookInfo>
        <span>{title}</span>
        <span>{category}</span>
        <span>{`${make1000UnitsCommaFormet(price)}원`}</span>
      </BookInfo>
    </>
  );
};

export default SliderItem;

const SlierBox = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 5px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-bottom: 0;
  gap: 10px;
`;
