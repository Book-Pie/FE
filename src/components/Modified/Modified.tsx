import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import FormLabel from "elements/FormLabel";
import { RegisterOptions, useForm } from "react-hook-form";
import ErrorMessage from "elements/ErrorMessage";
import noProfileImg from "assets/image/noProfile.jpg";
import {
  hookFormKoreaChractersCheck,
  hookFormMisMatchCheck,
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
  FormErrorMessages,
} from "utils/hookFormUtil";
import useDebounce from "hooks/useDebounce";
import { errorHandler } from "api/http";
import FormInput from "elements/FormInput";
import Popup from "elements/Popup";
import useDaumPost from "hooks/useDaumPost";
import { fetchUserInfoAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { hyphenRemoveFormat } from "utils/formatUtil";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "elements/Loading";
import { Stack } from "@mui/material";
import useDelay from "hooks/useDelay";
import DaumPostModal from "elements/DaumPostModal";
import { useAppDispatch, useTypedSelector } from "modules/store";
import usePopup from "hooks/usePopup";
import client, { makeAuthTokenHeader, makeFormDataHeader } from "api/client";
import * as Styled from "./style";
import * as Types from "./types";
import ModifiedConfirm from "./ModifiedConfirm";

const Modified = () => {
  const dispatch = useAppDispatch();
  const { user, token, isLoggedIn } = useTypedSelector(userReduceSelector);

  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);
  const { watch, formState, handleSubmit, clearErrors, register, reset, setValue, setFocus } =
    useForm<Types.ModifiedForm>();
  const [reconfirmation, setReconfirmation] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<string>(""); // 파일 base64
  const [imgFile, setImgFile] = useState<File | null>(null); // 파일
  const imgFileRef = useRef<HTMLInputElement>(null);

  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;

  const [newPassword, confirmPassword] = watch(["newPassword", "confirmPassword"]);
  const [isLoading, setIsLoading] = useState(false);
  const { addressState, handleComplete } = useDaumPost();
  const debounce = useDebounce();
  const history = useHistory();
  const delay = useDelay(600);
  const { errors } = formState;

  const addressOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
  };
  const passwordOpions: RegisterOptions = {
    maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
    },
  };
  const newPasswordOpions: RegisterOptions = {
    maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
      misMatch: value => hookFormMisMatchCheck(value, confirmPassword, FormErrorMessages.PASSWORD_MISMATCH),
    },
  };
  const confirmPasswordOpions: RegisterOptions = {
    maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
      misMatch: value => hookFormMisMatchCheck(value, newPassword, FormErrorMessages.PASSWORD_MISMATCH),
    },
  };
  const nameOptions: RegisterOptions = {
    maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
      specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
    },
  };
  const phoneOptions: RegisterOptions = {
    maxLength: makeOption<number>(14, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      mobileNumber: value => hookFormMobileNumberPatternCheck(value, FormErrorMessages.MOBILE_NUMBER),
    },
  };

  const handleModifiedValueReset = useCallback(() => reset(), [reset]);
  const handleDaumPostOpne = useCallback(() => setIsDaumPostOpen(prve => !prve), []);

  const handleFileOnChange = useCallback(async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (files === null || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const base64Sub = base64.toString();
        setImgFile(file);
        setImgBase64(base64Sub);
      }
    };
  }, []);

  const handleFileDelete = useCallback(() => {
    if (!imgFile || !imgFileRef.current) return;
    setImgBase64("");
    setImgFile(null);
    imgFileRef.current.value = "";
  }, [imgFile]);

  const handlePassword = useCallback(async (password: string, token: string, methodType: "put" | "post") => {
    const handleThen = ({ data }: { data: boolean }) => {
      if (!data) throw new Error(methodType === "put" ? "비밀번호 변경에 실패 했습니다." : "비밀번호가 틀립니다.");
    };
    const url = "/user/password";
    const config = makeAuthTokenHeader(token);
    const payload = { password };
    return methodType === "put"
      ? client.put<Types.PasswordCheckPayload, Types.PasswordCheckResponse>(url, payload, config).then(handleThen)
      : client.post<Types.PasswordCheckPayload, Types.PasswordCheckResponse>(url, payload, config).then(handleThen);
  }, []);

  const handleFileUpload = async () => {
    try {
      if (!imgFile) throw new Error("사진을 업로드해주세요");
      if (!token) throw new Error("로그인이 필요합니다.");
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", imgFile);
      await delay();
      await client.post("/user/image", formData, makeFormDataHeader(token));
      await dispatch(fetchUserInfoAsync(token)).unwrap();
      handleFileDelete();
      handlePopupMessage(true, "업로드에 성공했습니다.");
    } catch (error) {
      handlePopupMessage(false, errorHandler(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleModifiedSubmit = ({
    newPassword,
    detailAddress,
    mainAddress,
    postalCode,
    name,
    phone,
    currentPassword,
  }: Types.ModifiedForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        if (!user || !token) throw new Error("로그인이 필요합니다.");
        // 일반 회원으로 가입한 유저면 비밀번호 체크 및 비밀번호 변경
        // oauth 유저라면 그냥 통과
        if (user.loginType === "LOCAL") {
          await handlePassword(currentPassword, token, "post");
          await handlePassword(newPassword, token, "put");
        }
        const { data } = await client.put<Types.ProfileImgUpdatePayload, Types.PasswordCheckResponse>(
          "/user/me",
          {
            name,
            phone: hyphenRemoveFormat(phone),
            address: {
              postalCode,
              mainAddress,
              detailAddress,
            },
          },
          makeAuthTokenHeader(token),
        );
        if (!data) throw new Error("프로필 변경에 실패 했습니다.");
        await dispatch(fetchUserInfoAsync(token)).unwrap();
        history.replace("/");
      } catch (error) {
        handlePopupMessage(false, errorHandler(error));
      }
    }, 500);
  };

  useEffect(() => {
    const { addr, extraAddr, zonecode } = addressState;
    const { mainAddress, postalCode } = errors;

    if (addr && zonecode) {
      if (mainAddress || postalCode) {
        clearErrors(["postalCode", "mainAddress"]);
      }
      setValue("postalCode", zonecode);
      setValue("mainAddress", `${addr} ${extraAddr}`);
      setValue("detailAddress", "");
      setFocus("detailAddress");
    }
  }, [addressState, setFocus, setValue, clearErrors, errors]);

  useEffect(() => {
    if (!user) return;

    const { address, phone, name } = user;

    if (address) {
      const { postalCode, detailAddress, mainAddress } = address;
      setValue("postalCode", postalCode);
      setValue("mainAddress", mainAddress);
      setValue("detailAddress", detailAddress);
      setValue("name", name);
    }

    if (phone) {
      setValue("phone", phone);
    }
  }, [user, setValue]);

  useEffect(
    () => () => {
      if (debounce.current) clearTimeout(debounce.current);
    },
    [debounce],
  );

  useLayoutEffect(() => {
    if (isLoggedIn && user?.loginType !== "LOCAL") setReconfirmation(true);
  }, [isLoggedIn, user]);

  useEffect(() => {
    const handlePasswordMisMatchReset = () => {
      if (newPassword === confirmPassword && newPassword !== "" && confirmPassword !== "")
        clearErrors(["newPassword", "confirmPassword"]);
    };
    handlePasswordMisMatchReset();
  }, [newPassword, confirmPassword, clearErrors]);

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className={isSuccess ? "green" : "red"} autoClose>
          {message}
        </Popup>
      )}
      <Loading isLoading={isLoading} />
      {reconfirmation ? (
        <Styled.ModifiedWrapper className="modified">
          <div className="modified__title">회원정보 수정</div>
          <div className="modified__imgUpload">
            <div>
              <label htmlFor="myProfile-upload">
                <div>
                  <img src={imgBase64 ? imgBase64 : noProfileImg} alt="noProfileImg" />
                </div>
                <input
                  accept=".jpg, .png"
                  type="file"
                  id="myProfile-upload"
                  onChange={handleFileOnChange}
                  ref={imgFileRef}
                />
              </label>
            </div>
            <Stack spacing={1} direction="row">
              <Button variant="contained" component="span" color="mainDarkBrown" onClick={handleFileUpload}>
                Upload
              </Button>
              {imgFile && (
                <Button
                  onClick={handleFileDelete}
                  variant="contained"
                  component="span"
                  color="mainDarkBrown"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              )}
            </Stack>
          </div>
          <form className="modified__form" onSubmit={handleSubmit(handleModifiedSubmit)}>
            <div className="modified__form__row">
              <div className="modified__form__cell">
                <span>이메일</span>
              </div>
              <div className="modified__form__cell">
                <span>{user?.email ?? ""}</span>
              </div>
            </div>
            <div className="modified__form__row">
              <div className="modified__form__cell">
                <span>이름</span>
              </div>
              <div className="modified__form__cell">
                <FormInput type="text" id="name" register={register("name", nameOptions)} />
                <ErrorMessage message={errors.name?.message} />
              </div>
            </div>
            <div className="modified__form__row">
              <div className="modified__form__cell">
                <span>휴대폰 번호</span>
              </div>
              <div className="modified__form__cell">
                <FormInput
                  type="text"
                  id="phone"
                  register={register("phone", phoneOptions)}
                  placeholder="ex) 010-000-0000"
                />
                <ErrorMessage message={errors.phone?.message} />
              </div>
            </div>
            {user?.loginType === "LOCAL" && (
              <div className="modified__form__row">
                <div className="modified__form__password">
                  <span>비밀번호 변경</span>
                </div>
                <div className="modified__form__password">
                  <div>
                    <FormLabel id="currentPassword" text="현재 비밀번호" />
                    <FormInput
                      type="password"
                      id="currentPassword"
                      register={register("currentPassword", passwordOpions)}
                    />
                  </div>
                  <div className="modified__errorbox">
                    <ErrorMessage message={errors.currentPassword?.message} />
                  </div>
                  <div>
                    <FormLabel id="newPassword" text="새 비밀번호" />
                    <FormInput type="password" id="newPassword" register={register("newPassword", newPasswordOpions)} />
                  </div>
                  <div className="modified__errorbox">
                    <ErrorMessage message={errors.newPassword?.message} />
                  </div>
                  <div>
                    <FormLabel id="confirmPassword" text="비밀번호 다시 입력" />
                    <FormInput
                      type="password"
                      id="confirmPassword"
                      register={register("confirmPassword", confirmPasswordOpions)}
                    />
                  </div>
                  <div className="modified__errorbox">
                    <ErrorMessage message={errors.confirmPassword?.message} />
                  </div>
                </div>
              </div>
            )}
            <div className="modified__form__row">
              <div className="modified__form__address">
                <span>배송지</span>
              </div>
              <div className="modified__form__address">
                <div>
                  <button type="button" onClick={handleDaumPostOpne}>
                    우편찾기
                  </button>
                </div>
                <div>
                  <FormInput
                    disabled
                    type="text"
                    id="postalCode"
                    placeholder="우편번호"
                    register={register("postalCode", addressOptions)}
                  />
                  <FormInput
                    disabled
                    type="text"
                    id="mainAddress"
                    placeholder="주소"
                    register={register("mainAddress", addressOptions)}
                  />
                </div>
                <div className="modified__errorbox">
                  <ErrorMessage message={errors.postalCode?.message} />
                  <ErrorMessage message={errors.mainAddress?.message} />
                </div>
                <div>
                  <FormInput
                    type="text"
                    id="detailAddress"
                    placeholder="상세주소"
                    register={register("detailAddress", addressOptions)}
                  />
                </div>
                <div>
                  <ErrorMessage message={errors.detailAddress?.message} />
                </div>
              </div>
            </div>
            <div className="modified__buttons">
              <button type="submit">변경</button>
              <button type="button" className="modified__buttons--reset" onClick={handleModifiedValueReset}>
                초기화
              </button>
            </div>
          </form>
          <DaumPostModal
            isVisible={isDaumPostOpen}
            handleComplete={handleComplete}
            handleDaumPostOpne={handleDaumPostOpne}
          />
        </Styled.ModifiedWrapper>
      ) : (
        <ModifiedConfirm
          passwordOpions={passwordOpions}
          setReconfirmation={setReconfirmation}
          handlePassword={handlePassword}
          handlePopupMessage={handlePopupMessage}
        />
      )}
    </>
  );
};

export default Modified;
