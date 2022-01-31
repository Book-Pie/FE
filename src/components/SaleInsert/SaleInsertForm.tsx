import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { errorHandler } from "api/http";
import { useHistory } from "react-router";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import myShop from "assets/image/myShop.png";
import { AxiosResponse } from "axios";
import { getSaleInsert, getSaleUpdate } from "src/api/usedBook";
import * as Types from "./types";
import * as Styled from "./style";
import Buttons from "./Buttons";
import SaleInsertCheckBox from "./SaleInsertCheckBox";
import SaleInsertPrice from "./SaleInsertPrice";
import SaleInsertEditor from "./SaleInsertEditor";
import SaleInsertTags from "./SaleInsertTags";
import SaleBeforeImgProps from "./SaleBeforeImg";
import SaleInsertCategorys from "./SaleInsertCategorys";
import SaleInsertTitle from "./SaleInsertTitle";
import SaleCategorysSkeleton from "./SaleCategorysSkeleton";
import SaleBeforeImgSkeleton from "./SaleBeforeImgSkeleton";

const SaleInsertForm = ({
  handlePopupMessage,
  categoryResource,
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
        await getSaleUpdate(formData, token, bookId);
      } else {
        await getSaleInsert(formData, token);
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
      if (usedBookResource) usedBookResource.read<Types.UsedBookResponseType>();
    } catch (e: any) {
      e.then((response: AxiosResponse<Types.UsedBookResponseType>) => {
        const { data } = response;
        setCurrentFirstCategory(data.data.fstCategory);
        setCurrentSecondCategory(data.data.sndCategory);
        setValue("price", String(data.data.price));
        setValue("title", String(data.data.title));
        setEditorValue(data.data.content);
        setUsedBookState(data.data.bookState);
      });
    }
  }, [usedBookResource, setValue]);
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      {usedBookResource && (
        <Styled.ImgUpload>
          <div>
            <span>
              이전 이미지<span>*</span>
            </span>
            <span>({imgFiles.length}/5)</span>
          </div>
          <Suspense fallback={<SaleBeforeImgSkeleton />}>
            <SaleBeforeImgProps usedBookResource={usedBookResource} />
          </Suspense>
        </Styled.ImgUpload>
      )}
      <Styled.ImgDelete>
        {imgFiles.length !== 0 && <span onClick={handleFilesUploadAllDelete}>모두 제거</span>}
      </Styled.ImgDelete>
      <Styled.ImgUpload>
        <div>
          {usedBookResource ? (
            <span>
              새 이미지<span>*</span>
            </span>
          ) : (
            <span>
              상품이미지<span>*</span>
            </span>
          )}
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
          {imgFiles.map((file, idx) => (
            <div key={file.name} onClick={handleFileDelete(idx)}>
              <span>{file.name}</span>
              <DeleteIcon fontSize="small" />
            </div>
          ))}
        </Styled.ImgUploadText>
      )}
      <SaleInsertTitle errors={errors} control={control} />
      <Styled.Row>
        <div>
          <span>카테고리</span>
          <span>*</span>
        </div>
        <div>
          <Suspense fallback={<SaleCategorysSkeleton />}>
            <SaleInsertCategorys
              handleChange={handleChange}
              currentFirstCategory={currentFirstCategory}
              currentSecondCategory={currentSecondCategory}
              resource={categoryResource}
            />
          </Suspense>
        </div>
      </Styled.Row>
      <SaleInsertCheckBox setUsedBookState={setUsedBookState} defaultValue={usedBookState} />
      <SaleInsertPrice errors={errors} control={control} />
      <SaleInsertEditor setEditorValue={setEditorValue} editorValue={editorValue} />
      <SaleInsertTags tags={tags} setForm={setForm} />
      <Buttons handleReset={handleReset} />
    </form>
  );
};

export default SaleInsertForm;
