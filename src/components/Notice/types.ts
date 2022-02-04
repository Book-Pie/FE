import { SuccessResponse } from "api/types";
import { Content } from "modules/Slices/freeBoard/types";

export interface NoticeResponse extends SuccessResponse {
  data: {
    content: Content[];
  };
}

export type NoticeState = Content[];
