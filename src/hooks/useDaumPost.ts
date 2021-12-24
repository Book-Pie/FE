import { Address } from "react-daum-postcode";
import { useCallback, useState } from "react";

export interface DaumPostState {
  zonecode: string;
  addr: string;
  extraAddr: string;
}

const init: DaumPostState = {
  zonecode: "",
  addr: "",
  extraAddr: "",
};

// 유저정보 수정에서도 사용 될꺼 같아서 훅으로 만들어봤습니다.
const useDaumPost = () => {
  const [addressState, setAddressState] = useState<DaumPostState>(init);

  const handleComplete = useCallback((data: Address) => {
    const { zonecode, roadAddress, jibunAddress, userSelectedType } = data;
    let addr = "";
    let extraAddr = "";

    // R 사용자가 도로명 주소를 선택 시
    // roadAddress 도로명 주소
    // jibunAddress 지번 주소
    if (userSelectedType === "R") {
      addr = roadAddress;
    } else {
      addr = jibunAddress;
    }

    if (userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      if (extraAddr !== "") {
        extraAddr = ` (${extraAddr})`;
      }
    }

    setAddressState({
      zonecode,
      addr,
      extraAddr,
    });
  }, []);

  return { addressState, handleComplete };
};

export default useDaumPost;
