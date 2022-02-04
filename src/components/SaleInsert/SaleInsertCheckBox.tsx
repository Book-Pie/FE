import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import * as Styled from "./style";
import * as Types from "./types";
// 추가
const SaleInsertCheckBox = ({ setUsedBookState, defaultValue }: any) => {
  const [checkBoxState, setCheckBoxState] = useState<Types.CheckBoxType>({ UNRELEASED: true });

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsedBookState(e.target.name);
      setCheckBoxState(prev =>
        prev[e.target.name]
          ? prev
          : {
              [e.target.name]: e.target.checked,
            },
      );
    },
    [setUsedBookState],
  );

  const checkBox = [
    { id: 1, name: "UNRELEASED", label: "미개봉" },
    { id: 2, name: "ALMOST_NEW", label: "거의 새거" },
    { id: 3, name: "USED", label: "사용감 있음" },
  ];

  useEffect(() => {
    if (defaultValue) {
      setCheckBoxState({
        [defaultValue]: true,
      });
    }
  }, [defaultValue]);

  return (
    <Styled.Row>
      <div>
        <span>상품상태</span>
        <span>*</span>
      </div>
      <FormGroup row>
        {checkBox.map(({ id, name, label }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                name={name}
                onChange={handleOnChange}
                checked={checkBoxState[name] || false}
                color="mainDarkBrown"
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </Styled.Row>
  );
};

export default memo(SaleInsertCheckBox);
