import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import styled from "styled-components";
import dummyMainImg from "assets/image/dummy_main.jpg";

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
        <ProductImage src={dummyMainImg} />
      </SlierBox>
      <BookInfo>
        <div className="slider__title">{title}</div>
        <div className="slider__category">{category}</div>
        <div className="slider__price">{`${make1000UnitsCommaFormet(price)}원`}</div>
      </BookInfo>
    </>
  );
};

export default SliderItem;

const SlierBox = styled.div`
  width: 100%;
  height: 280px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const BookInfo = styled.div`
  width: 122px;
  height: 116px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  .slider__title {
    width: 122px;
    margin: 0 0 8px;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
    word-wrap: break-word;
    text-align: center;
    line-height: 1.1;
  }
  .slider__category {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.36px;
    text-align: center;
    word-wrap: break-word;
    color: #434343;
  }
  .slider__price {
    height: 24px;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #4f3629;
  }
`;
