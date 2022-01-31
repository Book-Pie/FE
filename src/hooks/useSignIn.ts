import { userInfoAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { SignInReduce } from "modules/Slices/user/types";
import { AppDispatch, useAppDispatch, useTypedSelector } from "modules/store";
import { useEffect } from "react";
import { getAccessToken } from "utils/localStorageUtil";

const useSignIn = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const signIn: SignInReduce = useTypedSelector(userReduceSelector);
  const { isLoggedIn } = signIn;

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken && isLoggedIn === false) dispatch(userInfoAsync(accessToken));
  }, [dispatch, isLoggedIn]);

  return {
    dispatch,
    signIn,
  };
};

export default useSignIn;
