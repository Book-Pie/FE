import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import withLoading from "src/hoc/withLoading";
import noComments from "assets/image/noComments.png";
import { Cell, Image, State, Title, Price, Date, Like, Empty } from "./style";
import { IContent, StateEnumType } from "./type";

const STATE_ENUM: StateEnumType = {
  SALE: "판매 중",
  TRADING: "거래 중",
  SOLD_OUT: "판매완료",
};

const Content = ({ pages, titleFilter, select, handleLatestClick }: IContent) => {
  const contetns = pages.filter(({ title, state }) => {
    if (titleFilter !== null && titleFilter !== title) return false;
    if (select !== state && select !== "NONE") return false;
    return true;
  });

  return contetns.length ? (
    contetns.map(({ id, image, state, title, price, likeCount, replyCount, modifiedDate }, idx) => (
      <div key={idx}>
        <Cell>
          <Link to={`/usedBook/${id}`}>
            <Image>
              <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
            </Image>
          </Link>
        </Cell>
        <Cell>
          <State>{STATE_ENUM[state]}</State>
        </Cell>
        <Cell>
          <Title>
            <Link to={`/usedBook/${id}`}>
              <span>{title}</span>
            </Link>
          </Title>
        </Cell>
        <Cell>
          <Price>
            <span>{`${make1000UnitsCommaFormet(`${price}`)}원`}</span>
          </Price>
        </Cell>
        <Cell>
          <Like>
            <span>{likeCount}</span>
            <span>/</span>
            <span>{replyCount}</span>
          </Like>
        </Cell>
        <Cell>
          <Date>
            <span>{dateFormat(modifiedDate)[0]}</span>
            <span>{dateFormat(modifiedDate)[1]}</span>
          </Date>
        </Cell>
        <Cell>
          <ButtonGroup variant="contained" orientation="vertical" size="small">
            <Button color="error" variant="contained" onClick={handleLatestClick(id)}>
              최신글로 등록
            </Button>
            <Button color="primary" variant="contained">
              수정하기
            </Button>
          </ButtonGroup>
        </Cell>
      </div>
    ))
  ) : (
    <Empty>
      <p>조건에 맞는 내용이 없습니다.</p>
      <img src={noComments} alt="noComments" />
    </Empty>
  );
};

const dateFormat = (date: string | null) => {
  if (date) {
    const [YMD, HMS] = date.split("T");
    const [YYYY, MM, DD] = YMD.split("-");
    const [hh, mm, ss] = HMS.split(":");
    return [`${YYYY}년 ${MM}월 ${DD}일`, ` ${hh}시 ${mm}분 ${ss}초`];
  }

  return "";
};

export default withLoading(Content);
