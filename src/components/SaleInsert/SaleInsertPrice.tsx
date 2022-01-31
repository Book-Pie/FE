import { TextField } from "@mui/material";
import { memo } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import ErrorMessage from "src/elements/ErrorMessage";
import { makeOption } from "src/utils/hookFormUtil";
import * as Styled from "./style";
import * as Types from "./types";

const SaleInsertPrice = ({ control, errors }: Types.SaleInsertProps) => {
  const priceOpions: RegisterOptions = {
    required: "필수입니다.",
    max: makeOption<number>(1000000000, "최대 1억입니다."),
    min: makeOption<number>(1, "최소 1원부터입니다."),
  };

  return (
    <Styled.Row>
      <div>
        <span>가격</span>
        <span>*</span>
      </div>
      <div className="price">
        <Controller
          name="price"
          control={control}
          rules={priceOpions}
          render={({ field }) => (
            <TextField {...field} fullWidth type="number" color="mainDarkBrown" error={errors.price ? true : false} />
          )}
        />
        <Styled.ErrorMessageWrapper>
          <ErrorMessage message={errors.price?.message} />
        </Styled.ErrorMessageWrapper>
      </div>
    </Styled.Row>
  );
};

export default memo(SaleInsertPrice);
