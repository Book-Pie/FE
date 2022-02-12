import { FavoriteCategories } from "src/modules/Slices/usedBookDetail/types";

export interface UsedStoreUserContentParam {
  sellerName: string;
  favoriteCategories: FavoriteCategories[];
  totalSales: number;
}
