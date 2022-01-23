import { myInfoAsync, signInSelector } from "modules/Slices/signIn/signInSlice";
import { ISignInReduce } from "modules/Slices/signIn/types";
import { AppDispatch, useAppDispatch, useTypedSelector } from "modules/store";
import { useCallback, useEffect } from "react";
import { getAccessToken } from "utils/localStorageUtil";
import { useHistory } from "react-router";

interface UseSignInReturnType {
  dispatch: AppDispatch;
  signIn: ISignInReduce;
}

const useSignIn = (): UseSignInReturnType => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const signIn = useTypedSelector(signInSelector);
  const { isLoggedIn } = signIn;

  const fetcherMyInfo = useCallback(() => {
    const accessToken = getAccessToken();

    if (accessToken && isLoggedIn === false) {
      dispatch(myInfoAsync(accessToken))
        .unwrap()
        .catch(() => history.replace("signIn"));
    }
  }, [dispatch, isLoggedIn, history]);

  useEffect(fetcherMyInfo, [fetcherMyInfo]);

  return {
    dispatch,
    signIn,
  };
};

export default useSignIn;
