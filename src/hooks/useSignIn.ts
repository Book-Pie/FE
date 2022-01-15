import { errorReset, myInfoAsync, signInSelector } from "modules/Slices/signIn/signInSlice";
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

  const getMyInfo = useCallback(() => {
    const accessToken = getAccessToken();

    if (accessToken && isLoggedIn === false) {
      console.warn("호출");

      dispatch(myInfoAsync(accessToken))
        .unwrap()
        .catch(error => {
          console.log("에러");

          if (error.status === 403) history.replace("signIn");
        });
    }
  }, [dispatch, isLoggedIn, history]);

  useEffect(getMyInfo, [getMyInfo]);

  return {
    dispatch,
    signIn,
  };
};

export default useSignIn;
