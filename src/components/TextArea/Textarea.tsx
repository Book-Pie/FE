import { TextareaAutosize } from "../Reviews/style";
import { TextareaAutosizeParam } from "./types";

const Textarea = ({ isLoggedIn, onChange, checkAuth, value, placeholder }: TextareaAutosizeParam) => {
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
