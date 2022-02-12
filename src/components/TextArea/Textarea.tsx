import { TextareaAutosize } from "../Reviews/ReviewForm/style";
import { TextareaAutosizeParam } from "./types";

const Textarea: React.FC<TextareaAutosizeParam> = ({ isLoggedIn, onChange, checkAuth, value, placeholder }) => {
  return isLoggedIn ? (
    <TextareaAutosize onChange={onChange} value={value} placeholder={placeholder} />
  ) : (
    <TextareaAutosize
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
