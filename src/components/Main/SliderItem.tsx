import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import dummyMainImg from "assets/image/dummy_main.jpg";
import { BookInfo, ProductImage, SlierBox } from "./styles";
import { BestSellerSliderProps } from "./types";

const SliderItem = ({ id, title, category, price, image }: BestSellerSliderProps) => {
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
