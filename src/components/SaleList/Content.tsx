import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { ButtonGroup, Button, useMediaQuery, Stack, Typography } from "@mui/material";
import { dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import withLoading from "hoc/withLoading";
import noComments from "assets/image/noComments.png";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Grid from "@mui/material/Grid";
import * as Styled from "./style";
import * as Types from "./types";

const STATE_ENUM: Types.StateEnumType = {
  SALE: "판매 중",
  TRADING: "거래 중",
  SOLD_OUT: "판매완료",
};

const STATE_CLASSNAME: Types.StateEnumType = {
  SALE: "",
  TRADING: "info",
  SOLD_OUT: "red",
};

const Content = ({ pages, titleFilter, select, handleLatestClick }: Types.Content) => {
  const [header] = useState(["사진", "상품명", "가격", "찜 / 댓글", "판매상태", "등록일", "기능"]);
  const max950 = useMediaQuery("(max-width:950px)");
  const history = useHistory();

  const handleSaleUpdateOnClick = (usedBookId: number, usedBookState: string) => () => {
    history.push({
      pathname: `/my/sale/insert/${usedBookId}`,
      state: {
        saleState: usedBookState,
      },
    });
  };

  const contetns = pages.filter(({ title, state }) => {
    if (titleFilter !== null && title.match(titleFilter) === null) return false;
    if (select !== state && select !== "NONE") return false;
    return true;
  });
  const headers = (
    <Styled.SaleTableHeader>
      {header.map((text, idx) => (
        <Styled.SaleCell key={idx}>
          <span>{text}</span>
        </Styled.SaleCell>
      ))}
    </Styled.SaleTableHeader>
  );

  if (contetns.length === 0) {
    return (
      <>
        {!max950 && headers}
        <Styled.Empty>
          <p>조건에 맞는 내용이 없습니다.</p>
          <img src={noComments} alt="noComments" />
        </Styled.Empty>
      </>
    );
  }

  if (max950) {
    return (
      <Styled.SaleTableBody>
        <Grid container spacing={2}>
          {contetns.map(({ id, image, state, title, likeCount, replyCount, modifiedDate }) => (
            <Grid item xs={12} key={id} display="flex" borderBottom={1} borderColor="#edeae9">
              <Grid item xs={7} sm={8.5} gap={1} display="flex" flexDirection="column" justifyContent="space-around">
                <Stack direction="row" gap={1}>
                  <Styled.SaleState>
                    <span className={`${STATE_CLASSNAME[state]}`}>{STATE_ENUM[state]}</span>
                  </Styled.SaleState>
                  <Typography variant="h6" fontWeight="bold">
                    <Link to={`/usedBook/${id}`}>{title}</Link>
                  </Typography>
                </Stack>
                <div>
                  <span>{dateArrayFormat(modifiedDate)}</span>
                </div>
                <ButtonGroup disableElevation variant="contained" sx={{ mb: 1 }}>
                  {state === "SALE" && (
                    <>
                      <Button color="error" variant="contained" onClick={handleLatestClick(id)}>
                        최신글로 등록
                      </Button>
                      <Button color="info" variant="contained" onClick={handleSaleUpdateOnClick(id, state)}>
                        수정하기
                      </Button>
                    </>
                  )}

                  {state === "TRADING" && (
                    <Button color="mainDarkBrown" variant="contained">
                      <Link to={`sale/${id}`} style={{ color: "white" }}>
                        판매상세보기
                      </Link>
                    </Button>
                  )}
                  {state === "SOLD_OUT" && (
                    <Button color="mainDarkBrown" variant="contained">
                      <Link to={`sale/${id}`} style={{ color: "white" }}>
                        판매상세보기
                      </Link>
                    </Button>
                  )}
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Styled.SaleImage src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
              </Grid>
              <Grid item xs={3} sm={2} display="flex" flexDirection="column" justifyContent="center">
                <Stack direction="row" gap={1} alignContent="center" justifyContent="center">
                  <FavoriteIcon sx={{ color: "#ff3d47" }} />
                  <span>{likeCount}개</span>
                </Stack>
                <Stack direction="row" gap={1} alignContent="center" justifyContent="center">
                  <InsertCommentIcon />
                  <span>{replyCount}개</span>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Styled.SaleTableBody>
    );
  }

  return (
    <>
      {headers}
      <Styled.SaleTableBody>
        {contetns.map(({ id, image, state, title, price, likeCount, replyCount, modifiedDate }, idx) => (
          <div key={idx}>
            <Styled.SaleCell>
              <Link to={`/usedBook/${id}`}>
                <Styled.SaleImage src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
              </Link>
            </Styled.SaleCell>

            <Styled.SaleCell>
              <Styled.SaleTitle>
                <Link to={`/usedBook/${id}`}>
                  <span>{title}</span>
                </Link>
              </Styled.SaleTitle>
            </Styled.SaleCell>
            <Styled.SaleCell>
              <Styled.SalePrice>
                <span>{`${make1000UnitsCommaFormet(`${price}`)}원`}</span>
              </Styled.SalePrice>
            </Styled.SaleCell>
            <Styled.SaleCell>
              <Styled.SaleLike>
                <div>
                  <FavoriteIcon sx={{ color: "#ff3d47" }} />
                  <span>{likeCount}개</span>
                </div>
                <div>
                  <InsertCommentIcon />
                  <span>{replyCount}개</span>
                </div>
              </Styled.SaleLike>
            </Styled.SaleCell>
            <Styled.SaleCell>
              <Styled.SaleState>
                <span className={`${STATE_CLASSNAME[state]}`}>{STATE_ENUM[state]}</span>
              </Styled.SaleState>
            </Styled.SaleCell>
            <Styled.SaleCell>
              <Styled.SaleDate>
                <span>{dateArrayFormat(modifiedDate)[0]}</span>
                <span>{dateArrayFormat(modifiedDate)[1]}</span>
              </Styled.SaleDate>
            </Styled.SaleCell>
            <Styled.SaleCell>
              <ButtonGroup variant="contained" orientation="vertical" size="small">
                {state === "SALE" && (
                  <>
                    <Button color="error" variant="contained" onClick={handleLatestClick(id)}>
                      최신글로 등록
                    </Button>
                    <Button color="info" variant="contained" onClick={handleSaleUpdateOnClick(id, state)}>
                      수정하기
                    </Button>
                  </>
                )}

                {state === "TRADING" && (
                  <Button color="mainDarkBrown" variant="contained">
                    <Link to={`sale/${id}`} style={{ color: "white" }}>
                      판매상세보기
                    </Link>
                  </Button>
                )}
                {state === "SOLD_OUT" && (
                  <Button color="mainDarkBrown" variant="contained">
                    <Link to={`sale/${id}`} style={{ color: "white" }}>
                      판매상세보기
                    </Link>
                  </Button>
                )}
              </ButtonGroup>
            </Styled.SaleCell>
          </div>
        ))}
      </Styled.SaleTableBody>
    </>
  );
};

export default withLoading(Content);
