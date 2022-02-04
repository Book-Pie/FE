import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import client, { errorHandler, makeAuthTokenHeader } from "api/client";
import { useHistory } from "react-router";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import myShop from "assets/image/myShop.png";
import { UsedBookResponse } from "pages/types";

import * as Types from "./types";
import * as Styled from "./style";
import Buttons from "./Buttons";
import SaleInsertCheckBox from "./SaleInsertCheckBox";
import SaleInsertPrice from "./SaleInsertPrice";
import SaleInsertEditor from "./SaleInsertEditor";
import SaleInsertTags from "./SaleInsertTags";
import SaleInsertCategorys from "./SaleInsertCategorys";
import SaleInsertTitle from "./SaleInsertTitle";
import SaleInsertSkeleton from "./SaleInsertSkeleton";
import SaleInsertBeforeImg from "./SaleInsertBeforeImg";

const SaleInsertForm = ({
  handlePopupMessage,
  categorysResource,
  usedBookResource,
  bookId,
}: Types.SaleInsertFormProps) => {
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgBase64, setImgBase64] = useState<string[]>([]);
  const [currentFirstCategory, setCurrentFirstCategory] = useState("소설");
  const [currentSecondCategory, setCurrentSecondCategory] = useState("추리");
  const [editorValue, setEditorValue] = useState("");
  const [usedBookState, setUsedBookState] = useState("UNRELEASED");
  const [form, setForm] = useState<Types.TagsType>({ tags: new Set<string>() });
  const { tags } = form;
  const history = useHistory();

  const { token } = useTypedSelector(userReduceSelector);

  const { handleSubmit, formState, reset, control, setValue } = useForm<Types.SaleInsertForm>({
    defaultValues: {
      title: "",
      price: "",
    },
  });
  const { errors } = formState;
  const imgFilesRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (firstCategory: string) =>
      ({ target: { value } }: SelectChangeEvent) => {
        setCurrentFirstCategory(firstCategory);
        setCurrentSecondCategory(value);
      },
    [],
  );

  const handleReset = useCallback(() => {
    reset();
    setEditorValue("");
    setForm({ tags: new Set() });
    setImgBase64([]);
    setImgFiles([]);
  }, [reset]);

  const handleOnSubmit = async ({ price, title }: Types.SaleInsertForm) => {
    try {
      if (!token) throw new Error("로그인이 필요합니다.");
      if (imgFiles.length === 0) throw new Error("이미지는 필수입니다.");
      const state = usedBookState;
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

      if (bookId) {
        await client.put(`/usedbook/${bookId}`, formData, makeAuthTokenHeader(token));
      } else {
        await client.post("/usedbook", formData, makeAuthTokenHeader(token));
      }

      history.replace("/my/sale");
    } catch (error) {
      handlePopupMessage(false, errorHandler(error));
    }
  };

  const handleFilesUploadAllDelete = useCallback(() => {
    if (imgFilesRef.current) {
      setImgBase64([]);
      setImgFiles([]);
      imgFilesRef.current.value = "";
    }
  }, [setImgBase64, setImgFiles]);

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
    [handlePopupMessage, setImgFiles, setImgBase64, imgFiles],
  );

  const handleFileDelete = useCallback(
    (id: number) => () => {
      if (imgFiles) {
        const fileArray = imgFiles.filter((_, idx) => (id !== idx ? true : false));
        const base64Array = imgBase64.filter((_, idx) => (id !== idx ? true : false));
        setImgFiles(fileArray);
        setImgBase64(base64Array);
      }
    },
    [imgFiles, setImgFiles, setImgBase64, imgBase64],
  );

  useEffect(() => {
    try {
      if (usedBookResource) usedBookResource.read();
    } catch (error: any) {
      if (error instanceof Promise) {
        error.then(({ data }: UsedBookResponse) => {
          setCurrentFirstCategory(data.fstCategory);
          setCurrentSecondCategory(data.sndCategory);
          setValue("price", String(data.price));
          setValue("title", String(data.title));
          setUsedBookState(data.bookState);
        });
      }
    }
  }, [usedBookResource, setValue]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      {usedBookResource && (
        <Suspense fallback={<SaleInsertSkeleton type="image" />}>
          <SaleInsertBeforeImg usedBookResource={usedBookResource} />
        </Suspense>
      )}
      <Styled.ImgDelete>
        {imgFiles.length !== 0 && <span onClick={handleFilesUploadAllDelete}>모두 제거</span>}
      </Styled.ImgDelete>
      <Styled.ImgUpload>
        <div>
          <span>
            {usedBookResource ? "새 이미지" : "상품이미지"}
            <span>*</span>
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
      {imgFiles.length > 0 && (
        <Styled.ImgUploadText>
          {imgFiles.map((file, idx) => (
            <div key={file.name} onClick={handleFileDelete(idx)}>
              <span>{file.name}</span>
              <DeleteIcon fontSize="small" />
            </div>
          ))}
        </Styled.ImgUploadText>
      )}
      <Styled.Row>
        <div>
          <span>제목</span>
          <span>*</span>
        </div>
        <Suspense fallback={<SaleInsertSkeleton type="input" />}>
          <SaleInsertTitle error={errors?.title} control={control} usedBookResource={usedBookResource} />
        </Suspense>
      </Styled.Row>
      <Styled.Row>
        <div>
          <span>카테고리</span>
          <span>*</span>
        </div>
        <Suspense fallback={<SaleInsertSkeleton type="category" />}>
          <SaleInsertCategorys
            handleChange={handleChange}
            currentFirstCategory={currentFirstCategory}
            currentSecondCategory={currentSecondCategory}
            categorysResource={categorysResource}
          />
        </Suspense>
      </Styled.Row>
      <SaleInsertCheckBox setUsedBookState={setUsedBookState} defaultValue={usedBookState} />
      <Styled.Row>
        <div>
          <span>가격</span>
          <span>*</span>
        </div>
        <Suspense fallback={<SaleInsertSkeleton type="input" />}>
          <SaleInsertPrice error={errors?.price} control={control} usedBookResource={usedBookResource} />
        </Suspense>
      </Styled.Row>
      <Styled.Row>
        <div>
          <span>내용</span>
          <span>*</span>
        </div>
        <Suspense fallback={<SaleInsertSkeleton type="editor" />}>
          <SaleInsertEditor setEditorValue={setEditorValue} usedBookResource={usedBookResource} />
        </Suspense>
      </Styled.Row>
      <SaleInsertTags tags={tags} setForm={setForm} />
      <Buttons handleReset={handleReset} />
    </form>
  );
};

export default SaleInsertForm;
