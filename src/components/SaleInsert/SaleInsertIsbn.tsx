import { Controller, RegisterOptions } from "react-hook-form";
import { TextField } from "@mui/material";
import { memo } from "react";
import ErrorMessage from "elements/ErrorMessage";
import { hookFormIsbnCheck, makeOption } from "utils/hookFormUtil";
import * as Styled from "./style";
import * as Types from "./types";

const SaleInsertIsbn = ({ control, error }: Types.SaleInsertProps) => {
  const priceOpions: RegisterOptions = {
    required: "필수입니다.",
    maxLength: makeOption<number>(17, "ISBN은 최대 17자리입니다."),
    minLength: makeOption<number>(13, "ISBN은 최소 13자리입니다."),
    validate: {
      isbn: value => hookFormIsbnCheck(value, "ISBN 형식이 아닙니다."),
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
              placeholder="ISBN은 13~17자리입니다. (-포함)"
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
