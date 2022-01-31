import { VFC } from "react";
import * as Types from "./types";

const SaleInsertBeforeImg: VFC<Types.SaleBeforeImgProps> = ({ usedBookResource }) => {
  const { data } = usedBookResource.read<Types.UsedBookResponseType>();

  return (
    <div>
      {data.data.images.map((img, idx) => {
        return <img src={`${process.env.BASE_URL}/image/${img}`} alt="img" key={idx} />;
      })}
    </div>
  );
};

export default SaleInsertBeforeImg;
