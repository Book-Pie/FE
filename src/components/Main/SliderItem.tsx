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
        <span>{price}</span>
      </BookInfo>
    </>
  );
};

export default SliderItem;

const SlierBox = styled.div`
  width: 190px;
`;

const ProductImage = styled.img`
  height: 280px;
`;

const BookInfo = styled.div`
  width: 182px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
