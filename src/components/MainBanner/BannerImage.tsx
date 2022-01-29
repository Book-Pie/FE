import { memo } from "react";
import bannerImg from "assets/image/banner1.png";

const BannerImage = () => {
  return (
    <div>
      <img src={bannerImg} alt="bannerImg" />
    </div>
  );
};

export default memo(BannerImage);
