import { useCallback, useEffect, useState } from "react";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import queryString from "query-string";
import client from "src/api/client";
import noComments from "assets/image/noComments.png";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import { Link } from "react-router-dom";
import { compareDateFormat, make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Box, Skeleton } from "@mui/material";
import { SaleListResponse, SaleListState, StateEnumType } from "../SaleList/types";
import { EmptyWrapper, Title, TitleSpan, UsedBookLikeImg, UsedBookLikeListWrapper } from "../UsedBookLikeList/styles";
import { CountWrapper } from "../UsedBookDetail/style";
import { ReviewListEmptyParagraph } from "../Reviews/style";
import { UsedBookCardWrapper } from "../UsedBookList/style";
import { DateWrapper, ShopContentWrapper, ShopReviewListEmptyWrapper } from "./styles";
import { FlexBox } from "../BuyList/styles";

const ShopSaleList = () => {
  const { shop } = useTypedSelector(userReduceSelector);
  const [list, setList] = useState<SaleListState>({
    page: getShopPage(1),
    pageCount: 0,
    pages: [],
    isEmpty: false,
  });
  const [limit] = useState(10);
  const { pages, page } = list;

  const handleHasMoreList = useCallback(
    async (page: number, limit: number) => {
      if (shop) {
        const query = queryString.stringify({ userId: shop.id, page, limit });
        const { data } = await client.get<SaleListResponse>(`/usedbook/user?${query}`);
        const { pageCount, pages } = data;
        setList({
          pageCount,
          pages,
          page,
          isEmpty: pages.length === 0 ? true : false,
        });
      }
    },
    [shop],
  );

  useEffect(() => {
    const { pages, pageCount, isEmpty, page } = list;
    if (pages.length === 0 && pageCount === 0 && !isEmpty) handleHasMoreList(page, limit);
  }, [handleHasMoreList, list, limit]);

  useEffect(() => {
    if (getShopPage() === 0) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  const STATE_ENUM: StateEnumType = {
    SALE: "판매 중",
    SOLD_OUT: "판매완료",
    TRADING: "거래 중",
  };

  return (
    <ShopContentWrapper>
      <Title>
        <TitleSpan>판매상품</TitleSpan>
        <CountWrapper>{pages.length}</CountWrapper>
      </Title>
      {pages.length !== 0 ? (
        <UsedBookLikeListWrapper>
          {pages.map((card, idx) => {
            const { id, image, price, state, title, uploadDate } = card;
            const date = compareDateFormat(String(uploadDate));
            let dayAgo = "일전";
            if (date === 0) {
              dayAgo = "오늘";
            }
            return (
              <div key={idx}>
                <UsedBookCardWrapper width={100}>
                  <Link to={`/usedBook/${id}`}>
                    <div className="usedBookCard__imgBox">
                      <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
                    </div>
                    <div className="usedBookCard__content">
                      <p className="usedBookCard__title">{title}</p>
                      <div className="usedBookCard__price">
                        <strong>판매가</strong>
                        <span>:</span>
                        <span> {make1000UnitsCommaFormet(`${price}`)}원</span>
                      </div>
                      <DateWrapper>
                        {date !== 0 ? (
                          <span>
                            {date} {dayAgo}
                          </span>
                        ) : (
                          <span>{dayAgo}</span>
                        )}
                      </DateWrapper>
                      <p className={`${state === "SOLD_OUT" ? "red" : ""} usedBookCard__state`}>{STATE_ENUM[state]}</p>
                    </div>
                  </Link>
                </UsedBookCardWrapper>
              </div>
            );
          })}
        </UsedBookLikeListWrapper>
      ) : list.isEmpty ? (
        <ShopReviewListEmptyWrapper>
          <EmptyWrapper>
            <UsedBookLikeImg src={noComments} alt="noComments" />
            <ReviewListEmptyParagraph>판매상품이 존재하지 않습니다.</ReviewListEmptyParagraph>
          </EmptyWrapper>
        </ShopReviewListEmptyWrapper>
      ) : (
        Array.from({ length: 3 }).map((_, idx) => (
          <FlexBox key={idx}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx}>
                <Box sx={{ width: 210, marginRight: 3, my: 5 }}>
                  <Skeleton variant="rectangular" width={160} height={118} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="75%" />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              </div>
            ))}
          </FlexBox>
        ))
      )}
    </ShopContentWrapper>
  );
};

export default ShopSaleList;
