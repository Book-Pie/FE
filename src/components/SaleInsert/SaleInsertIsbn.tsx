import { Controller, RegisterOptions } from "react-hook-form";
import { TextField } from "@mui/material";
import { memo } from "react";
import ErrorMessage from "elements/ErrorMessage";
import {
  hookFormIsbnCheck,
  hookFormKoreaChractersCheck,
  hookFormSpecialChractersCheck,
  makeOption,
} from "utils/hookFormUtil";
import * as Styled from "./style";
import * as Types from "./types";

const SaleInsertIsbn = ({ control, error }: Types.SaleInsertProps) => {
  const priceOpions: RegisterOptions<Types.SaleInsertForm> = {
    required: "필수입니다.",
    maxLength: makeOption<number>(13, "ISBN은 최대 13자리입니다."),
    minLength: makeOption<number>(10, "ISBN은 최소 10자리입니다."),
    validate: {
      koreaLang: value => hookFormKoreaChractersCheck(value, "한글은 입력 불가능합니다."),
      spacialLang: value => hookFormSpecialChractersCheck(value, "특수문자는 입력 불가능합니다."),
      isbn: value => hookFormIsbnCheck(value, "ISBN 검증 번호가 잘못 되었습니다."),
    },
  };

  return (
    <Styled.Row>
      <div>
        <span>ISBN</span>
        <span>*</span>
      </div>
      <div>
        <Controller
          name="isbn"
          control={control}
          rules={priceOpions}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="text"
              placeholder="ISBN은 10~13자리입니다. (-미포함)"
              color="mainDarkBrown"
              error={error ? true : false}
            />
          )}
        />
        <Styled.ErrorMessageWrapper>
          <ErrorMessage message={error?.message} />
        </Styled.ErrorMessageWrapper>
      </div>
    </Styled.Row>
  );
};

export default memo(SaleInsertIsbn);
