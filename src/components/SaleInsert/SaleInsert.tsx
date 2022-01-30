import myShop from "assets/image/myShop.png";
import { useCallback, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { RegisterOptions, useForm, Controller } from "react-hook-form";
import ErrorMessage from "elements/ErrorMessage";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeOption } from "utils/hookFormUtil";
import { FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { getCategorys } from "api/usedBook";
import Popup from "elements/Popup";
import Editor from "components/Editor/Editor";
import useDebounce from "hooks/useDebounce";
import { getCreateSale } from "api/user";
import { errorHandler } from "api/http";
import { useHistory } from "react-router";
import { CategoryState, CategoryResponse } from "components/UsedBookList/types";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import usePopup from "hooks/usePopup";
import * as Styled from "./style";
import * as Types from "./types";

const KEY_ENUM = {
  enter: "Enter",
  backspace: "Backspace",
  comma: "Comma",
};

const TAGS_MAX_COUNT = 5;
const TAGS_MAX_LENGTH = 20;

const SaleInsert = () => {
  const [imgBase64, setImgBase64] = useState<string[]>([]);
  const [form, setForm] = useState<Types.TagsType>({ tags: new Set<string>() });
  const [imgFiles, setImgFiles] = useState<File[]>([]);

  const [categorys, setCategorys] = useState<CategoryState>({});
  const [currentFirstCategory, setCurrentFirstCategory] = useState("소설");
  const [currentSecondCategory, setCurrentSecondCategory] = useState("추리");
  const [editorValue, setEditorValue] = useState("");
  const [usedBookState, setUsedBookState] = useState<Types.CheckBoxType>({
    UNRELEASED: true,
  });
  const { handleSubmit, formState, reset, control } = useForm<Types.SaleInsertForm>({
    defaultValues: {
      title: "",
      price: "",
    },
  });
  const imgFilesRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const history = useHistory();
  const debounceRef = useDebounce();
  const { token } = useTypedSelector(userReduceSelector);
  const { tags } = form;
  const { errors } = formState;

  const titleOpions: RegisterOptions = {
    required: "필수입니다.",
    maxLength: makeOption<number>(40, "최대 40자입니다"),
    minLength: makeOption<number>(5, "최소 5자입니다."),
  };
  const priceOpions: RegisterOptions = {
    required: "필수입니다.",
    max: makeOption<number>(1000000000, "최대 1억입니다."),
    min: makeOption<number>(1, "최소 1원부터입니다."),
  };

  const checkBox = [
    { id: 1, name: "UNRELEASED", label: "미개봉" },
    { id: 2, name: "ALMOST_NEW", label: "거의 새거" },
    { id: 3, name: "USED", label: "사용감 있음" },
  ];

  const handleFilesOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileDuplicateCheck = (files: File[], source: string) => {
        const isDuplicate = files.find(file => file.name === source);
        return isDuplicate ? false : true;
      };

      const toBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            const base64Sub = base64.toString();
            setImgBase64(prev => [...prev, base64Sub]);
          }
        };
      };

      try {
        const { files } = e.target;
        if (!files || files.length === 0) return;
        if (files.length > 5 || imgFiles.length >= 5) throw new Error("파일은 최대 5개 업로드 가능합니다.");
        if (!imgFilesRef.current) return;

        // 업로드 파일이 있다면 중독이 있는지 체크를 하고 중독이 아닌 파일을 추가한다.
        const fileArray =
          imgFiles.length !== 0
            ? Array.from(files).filter(file => fileDuplicateCheck(imgFiles, file.name))
            : Array.from(files);

        setImgFiles(prev => (imgFiles.length !== 0 ? [...prev, ...fileArray] : fileArray));
        fileArray.forEach(file => toBase64(file));
        imgFilesRef.current.value = "";
      } catch (error) {
        const message = errorHandler(error);
        handlePopupMessage(false, message);
      }
    },
    [handlePopupMessage, imgFiles],
  );

  const handleFilesUploadAllDelete = useCallback(() => {
    if (imgFilesRef.current) {
      setImgBase64([]);
      setImgFiles([]);
      imgFilesRef.current.value = "";
    }
  }, []);
  const handleFileDelete = useCallback(
    (id: number) => () => {
      if (imgFiles) {
        const fileArray = imgFiles.filter((_, idx) => (id !== idx ? true : false));
        const base64Array = imgBase64.filter((_, idx) => (id !== idx ? true : false));
        setImgFiles(fileArray);
        setImgBase64(base64Array);
      }
    },
    [imgFiles, imgBase64],
  );

  const handleReset = useCallback(() => {
    reset();
    setEditorValue("");
    setForm({ tags: new Set() });
    setImgBase64([]);
    setImgFiles([]);
  }, [reset]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setUsedBookState(prev =>
        prev[e.target.name]
          ? prev
          : {
              [e.target.name]: e.target.checked,
            },
      ),
    [],
  );
  const handleChange = useCallback(
    (firstCategory: string) => (event: SelectChangeEvent) => {
      setCurrentFirstCategory(firstCategory);
      setCurrentSecondCategory(event.target.value);
    },
    [],
  );

  const handleOnSubmit = async ({ price, title }: Types.SaleInsertForm) => {
    try {
      if (!token) throw new Error("로그인이 필요합니다.");
      const [state] = Object.keys(usedBookState);
      const payload = {
        title,
        content: editorValue,
        price,
        state,
        isbn: "123123",
        fstCategory: currentFirstCategory,
        sndCategory: currentSecondCategory,
        tags: [...Array.from(tags)],
      };

      const formData = new FormData();
      imgFiles.forEach(file => formData.append("images", file));
      formData.append("usedBook", JSON.stringify(payload));
      await getCreateSale(formData, token);
      history.replace("/my/sale");
    } catch (error) {
      handlePopupMessage(false, errorHandler(error));
    }
  };

  const tagClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.currentTarget;
      if (tags.delete(id)) setForm(() => ({ tags: new Set([...Array.from(tags)]) }));
    },
    [tags],
  );

  const handlekeyDown = useCallback(() => {
    return (e: Types.KeyEvent) => {
      const { code, currentTarget } = e;
      const { id, value } = currentTarget;

      if (code === KEY_ENUM.backspace) {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
          setForm(prev => {
            const { tags } = prev;
            if (!tagInputRef.current) return prev;
            if (tags && tags.size !== 0 && tagInputRef.current.value === "") {
              const newSet = Array.from(tags).slice(0, tags.size - 1);
              return {
                tags: new Set([...newSet]),
              };
            }
            return prev;
          });
        }, 300);
      }

      if (code === KEY_ENUM.comma && tagInputRef.current) {
        // 입력으로 들어온 콤마 무효 시키기
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          setForm(prev => {
            if (value === "") return prev;
            if (!prev.tags) return { tags: new Set([value]) };
            if (prev.tags.has(value)) return prev;
            if (prev.tags.size === TAGS_MAX_COUNT) return prev;
            if (value.length > TAGS_MAX_LENGTH) return prev;
            const tags = new Set([...Array.from(prev.tags), value]);
            return { ...prev, [id]: tags };
          });
        }, 100);

        tagInputRef.current.value = "";
      }
    };
  }, [debounceRef]);

  const handlekeyPress = useCallback(() => {
    return (e: Types.KeyEvent) => {
      const { code, currentTarget } = e;
      if (code === KEY_ENUM.enter && tagInputRef.current) {
        e.preventDefault();
        const { id, value } = currentTarget;
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
          setForm(prev => {
            if (value === "") return prev;
            // 첫 등록
            if (!prev.tags) return { tags: new Set([value]) };
            // 동일한 내용이 있다면 태그 추가를 안합니다.
            if (prev.tags.has(value)) return prev;
            // 태그 갯수 조절.
            if (prev.tags.size === TAGS_MAX_COUNT) return prev;
            if (value.length > TAGS_MAX_LENGTH) return prev;
            const tags = new Set([...Array.from(prev.tags), value]);
            return { ...prev, [id]: tags };
          });
        }, 100);
        tagInputRef.current.value = "";
      }
    };
  }, [debounceRef]);

  const handleLoadCategory = useCallback(async () => {
    const { data } = await getCategorys<CategoryResponse>();
    setCategorys(data.data);
  }, []);

  useEffect(() => {
    handleLoadCategory();
  }, [handleLoadCategory]);

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className={isSuccess ? "green" : "red"} autoClose>
          {message}
        </Popup>
      )}
      <Styled.SaleInsertWrapper onSubmit={handleSubmit(handleOnSubmit)}>
        <Styled.Title>
          <span>기본정보</span>
          <span>*필수항목</span>
        </Styled.Title>
        <Styled.ImgDelete>
          {imgFiles.length !== 0 && <span onClick={handleFilesUploadAllDelete}>모두 제거</span>}
        </Styled.ImgDelete>
        <Styled.ImgUpload>
          <div>
            <span>
              상품이미지<span>*</span>
            </span>
            <span>({imgFiles.length}/5)</span>
          </div>
          <div>
            <div className="one">
              <label htmlFor="files">
                <img src={myShop} alt="myShop" />
                <span>이미지 등록</span>
                <input
                  type="file"
                  id="files"
                  accept=".jpg, .png"
                  onChange={handleFilesOnChange}
                  multiple
                  ref={imgFilesRef}
                />
              </label>
            </div>
            {imgBase64.map((base64, idx) => (
              <div key={idx} onClick={handleFileDelete(idx)}>
                <img src={base64} alt="base64" />
              </div>
            ))}
          </div>
        </Styled.ImgUpload>
        {imgFiles.length !== 0 && (
          <Styled.ImgUploadText>
            <div>
              {imgFiles.map((file, idx) => (
                <div key={file.name} onClick={handleFileDelete(idx)}>
                  <span>{file.name}</span>
                  <DeleteIcon fontSize="small" />
                </div>
              ))}
            </div>
          </Styled.ImgUploadText>
        )}
        <Styled.Row>
          <div>
            <div>
              <span>제목</span>
              <span>*</span>
            </div>
            <div className="title">
              <Controller
                name="title"
                control={control}
                rules={titleOpions}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    color="mainDarkBrown"
                    error={errors.title ? true : false}
                  />
                )}
              />
              <Styled.ErrorMessageWrapper>
                <ErrorMessage message={errors.title?.message} />
              </Styled.ErrorMessageWrapper>
            </div>
          </div>
        </Styled.Row>
        <Styled.Row>
          <div>
            <div>
              <span>카테고리</span>
              <span>*</span>
            </div>
            <div>
              {Object.entries(categorys).map(([first, second], idx) => {
                return (
                  <FormControl className="category" sx={{ minWidth: 130 }} key={idx} color="mainDarkBrown">
                    <InputLabel id="category">{first}</InputLabel>
                    <Select
                      labelId="category"
                      label={first}
                      value={currentFirstCategory === first ? currentSecondCategory : ""}
                      sx={{
                        color: theme => theme.colors.mainDarkBrown,
                        fontWeight: 900,
                      }}
                      onChange={handleChange(first)}
                    >
                      {second.length !== 0 ? (
                        second.map((value, i) => (
                          <MenuItem key={i} value={value}>
                            {value}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="기타">기타</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                );
              })}
            </div>
          </div>
        </Styled.Row>
        <Styled.Row>
          <div>
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
                      checked={usedBookState[name] || false}
                      color="mainDarkBrown"
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          </div>
        </Styled.Row>
        <Styled.Row>
          <div>
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
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    color="mainDarkBrown"
                    error={errors.price ? true : false}
                  />
                )}
              />
              <Styled.ErrorMessageWrapper>
                <ErrorMessage message={errors.price?.message} />
              </Styled.ErrorMessageWrapper>
            </div>
          </div>
        </Styled.Row>
        <Styled.Row>
          <div>
            <div>
              <span>내용</span>
              <span>*</span>
            </div>
            <div className="editor">
              <Editor limit={2000} height={200} setEditorValue={setEditorValue} />
            </div>
          </div>
        </Styled.Row>
        <Styled.Row>
          <div>
            <div>
              <span>연관태그</span>
              <span />
            </div>
            <Styled.TagBox>
              {Array.from(tags).map((tag, idx) => (
                <Styled.Tag key={idx} onClick={tagClick} id={tag}>
                  {`#${tag}`}
                </Styled.Tag>
              ))}
              <input
                type="text"
                id="tags"
                placeholder="태그를 입력해주세요."
                autoComplete="off"
                ref={tagInputRef}
                onKeyDown={handlekeyDown()}
                onKeyPress={handlekeyPress()}
              />
              <Styled.InputMessage>
                {tags.size !== 5 ? (
                  <div>
                    <span>쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.</span>
                    <span> 등록된 태그를 클릭하면 삭제됩니다.</span>
                  </div>
                ) : (
                  <div>
                    <span>태그는 최대 {TAGS_MAX_COUNT}개 까지 등록 가능합니다.</span>
                  </div>
                )}
              </Styled.InputMessage>
            </Styled.TagBox>
          </div>
        </Styled.Row>
        <Stack spacing={1} direction="row" justifyContent="center" mt={3}>
          <Button color="mainDarkBrown" variant="contained" type="submit">
            등록
          </Button>
          <Button color="error" variant="contained" onClick={handleReset}>
            초기화
          </Button>
        </Stack>
      </Styled.SaleInsertWrapper>
    </>
  );
};

export default SaleInsert;
