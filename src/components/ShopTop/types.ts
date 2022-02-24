import { GetChartResponse } from "src/modules/Slices/userReview/types";

export interface ShopTopParam {
  chart: GetChartResponse[];
  shopId: string;
}
