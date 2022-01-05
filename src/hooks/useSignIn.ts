import { myProfileAsync, signInSelector } from "modules/Slices/signInSlice";
import { AppDispatch, useAppDispatch, useTypedSelector } from "modules/store";
import { useCallback, useEffect } from "react";
import { SignInReduceProps } from "modules/Slices/types";
import { getAccessToken } from "utils/localStorageUtil";
import { useHistory } from "react-router";

interface ReturnType {
  dispatch: AppDispatch;
  signIn: SignInReduceProps;
}

const useSignIn = (): ReturnType => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const signIn = useTypedSelector(signInSelector);
  const { isLoggedIn } = signIn;

  const getProfile = useCallback(() => {
    const accessToken = getAccessToken();

    if (accessToken && isLoggedIn === false) {
      dispatch(myProfileAsync(accessToken))
        .unwrap()
        .catch(error => {
          if (error.status === 403) history.replace("signIn");
        });
    }
  }, [dispatch, isLoggedIn, history]);

  useEffect(getProfile, [getProfile]);

  return {
    dispatch,
    signIn,
  };
};

export default useSignIn;
