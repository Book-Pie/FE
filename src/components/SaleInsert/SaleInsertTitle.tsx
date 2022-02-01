import { Controller, RegisterOptions } from "react-hook-form";
import { TextField } from "@mui/material";
import ErrorMessage from "src/elements/ErrorMessage";
import { makeOption } from "src/utils/hookFormUtil";
import { memo } from "react";
import * as Styled from "./style";
import * as Types from "./types";

const SaleInsertTitle = ({ control, error, usedBookResource }: Types.SaleInsertTitleProps) => {
  usedBookResource?.read();
  const titleOpions: RegisterOptions = {
    required: "필수입니다.",
    maxLength: makeOption<number>(40, "최대 40자입니다"),
    minLength: makeOption<number>(5, "최소 5자입니다."),
  };

  return (
    <div className="title">
      <Controller
        name="title"
        control={control}
        rules={titleOpions}
        render={({ field }) => (
          <TextField {...field} type="text" fullWidth color="mainDarkBrown" error={error ? true : false} />
        )}
      />
      <Styled.ErrorMessageWrapper>
        <ErrorMessage message={error?.message} />
      </Styled.ErrorMessageWrapper>
    </div>
  );
};

export default memo(SaleInsertTitle);
