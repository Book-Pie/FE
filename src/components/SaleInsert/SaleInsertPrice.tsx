import { TextField } from "@mui/material";
import { memo } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import ErrorMessage from "elements/ErrorMessage";
import { makeOption } from "utils/hookFormUtil";
import * as Styled from "./style";
import * as Types from "./types";

const SaleInsertPrice = ({ control, error, usedBookResource }: Types.SaleInsertPriceProps) => {
  usedBookResource?.read();

  const priceOpions: RegisterOptions = {
    required: "필수입니다.",
    max: makeOption<number>(1000000000, "최대 1억입니다."),
    min: makeOption<number>(1, "최소 1원부터입니다."),
    pattern: makeOption<RegExp>(/^[0-9]+$/i, "숫자만 입력가능합니다."),
  };

  return (
    <div className="price">
      <Controller
        name="price"
        control={control}
        rules={priceOpions}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="text"
            placeholder="가격을입력해주세요."
            color="mainDarkBrown"
            error={error ? true : false}
          />
        )}
      />
      <Styled.ErrorMessageWrapper>
        <ErrorMessage message={error?.message} />
      </Styled.ErrorMessageWrapper>
    </div>
  );
};

export default memo(SaleInsertPrice);
