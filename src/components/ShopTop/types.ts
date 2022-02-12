import { UserInfo } from "src/modules/Slices/user/types";
import { GetChartResponse } from "src/modules/Slices/userReview/types";

export interface ShopTopParam {
  shop: UserInfo;
  chart: GetChartResponse[];
}
