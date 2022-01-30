import { userInfoAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { SignInReduce } from "modules/Slices/user/types";
import { AppDispatch, useAppDispatch, useTypedSelector } from "modules/store";
import { useCallback, useEffect } from "react";
import { getAccessToken, removeToken } from "utils/localStorageUtil";
import { useHistory } from "react-router";

const useSignIn = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const signIn: SignInReduce = useTypedSelector(userReduceSelector);
  const history = useHistory();
  const { isLoggedIn } = signIn;

  const fetcherMyInfo = useCallback(() => {
    const accessToken = getAccessToken();

    if (accessToken && isLoggedIn === false) {
      dispatch(userInfoAsync(accessToken))
        .unwrap()
        .catch(() => {
          removeToken();
          history.replace("signIn");
        });
    }
  }, [dispatch, isLoggedIn, history]);

  useEffect(fetcherMyInfo, [fetcherMyInfo]);

  return {
    dispatch,
    signIn,
  };
};

export default useSignIn;
