import { getMyProfileAsync, SignInReduceProps, signInSelector } from "modules/Slices/signInSlice";
import { AppDispatch, useAppDispatch, useTypedSelector } from "modules/store";
import { useCallback, useEffect } from "react";
import { getAccessToken } from "utils/localStorageUtil";

const useSignIn = (): {
  dispatch: AppDispatch;
  signIn: SignInReduceProps;
} => {
  const dispatch = useAppDispatch();
  const signIn = useTypedSelector(signInSelector);
  const { isLoggedIn, error } = signIn;

  const getProfile = useCallback(() => {
    const accessToken = getAccessToken();

    if (accessToken && isLoggedIn === false) dispatch(getMyProfileAsync(accessToken));
  }, [dispatch, isLoggedIn]);

  useEffect(() => getProfile(), [getProfile]);
  useEffect(() => {
    if (error && error.status === 403) alert(error.message);
  }, [error]);

  return {
    dispatch,
    signIn,
  };
};

export default useSignIn;
