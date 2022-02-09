import { GetChartResponse } from "src/modules/Slices/userReview/types";

export interface NickNameForm {
  nickName: string;
}

export interface MyChartParam {
  data: GetChartResponse[];
}
