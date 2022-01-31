import { VFC } from "react";
import * as Types from "./types";
import * as Styled from "./style";

const SaleInsertBeforeImg: VFC<Types.SaleBeforeImgProps> = ({ usedBookResource }) => {
  const { data } = usedBookResource.read<Types.UsedBookResponseType>();

  return (
    <Styled.ImgUpload>
      <div>
        <span>
          이전 이미지<span>*</span>
        </span>
        <span>({data.data.images.length}/5)</span>
      </div>
      <div>
        {{ data }.data.data.images.map((img, idx) => (
          <img src={`${process.env.BASE_URL}/image/${img}`} alt="img" key={idx} />
        ))}
      </div>
    </Styled.ImgUpload>
  );
};

export default SaleInsertBeforeImg;
