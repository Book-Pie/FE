import { TextareaAutosize } from "../Reviews/ReviewForm/style";
import { TextareaAutosizeParam } from "./types";

const Textarea: React.FC<TextareaAutosizeParam> = ({
  isLoggedIn,
  onChange,
  checkAuth,
  value,
  limit,
  height,
  placeholder,
}) => {
  return isLoggedIn ? (
    <TextareaAutosize onChange={onChange} value={value} limit={limit} height={height} placeholder={placeholder} />
  ) : (
    <TextareaAutosize
      limit={limit}
      height={height}
      placeholder={placeholder}
      onClick={(event: React.ChangeEvent<any>) => {
        if (!checkAuth()) {
          event.preventDefault();
        }
      }}
    />
  );
};

export default Textarea;
