import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { StateEnumType } from "components/UsedBookList/types";
import * as Styled from "./style";

const SaleInsertNotFound = ({ state }: { state: undefined | { saleState: keyof StateEnumType } }) => {
  const history = useHistory();
  const handleGoback = () => history.goBack();

  return (
    <Styled.SaleInsertWrapper>
      <div className="notFound">
        {state ? <p>거래 중인 상품은 수정,삭제가 불가능합니다.</p> : <p>잘못된 경로입니다.</p>}
        <Button variant="contained" color="darkgray" onClick={handleGoback}>
          뒤로가기
        </Button>
      </div>
    </Styled.SaleInsertWrapper>
  );
};

export default SaleInsertNotFound;
