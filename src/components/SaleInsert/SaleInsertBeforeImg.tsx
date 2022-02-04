import { VFC } from "react";
import { UsedBookResponse } from "pages/types";
import * as Types from "./types";
import * as Styled from "./style";

const SaleInsertBeforeImg: VFC<Types.SaleBeforeImgProps> = ({ usedBookResource }) => {
  const { data } = usedBookResource?.read<UsedBookResponse>() || {};

  return (
    <Styled.ImgUpload>
      <div>
        <span>
          이전 이미지<span>*</span>
        </span>
        <span>({data?.images.length}/5)</span>
      </div>
      <div>
        {data?.images.map((img, idx) => (
          <img src={`${process.env.BASE_URL}/image/${img}`} alt="img" key={idx} />
        ))}
      </div>
    </Styled.ImgUpload>
  );
};

export default SaleInsertBeforeImg;
