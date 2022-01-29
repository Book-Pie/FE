import { useCallback, useReducer } from "react";

const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
export const loadingAction = () => ({ type: LOADING });
export const successAction = (res: any) => ({ type: SUCCESS, res });
export const errorAction = (error: any) => ({ type: ERROR, error });

const INIT = {
  loading: null,
  success: null,
  error: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,
        loading: null,
        success: action.res,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        loading: null,
        success: null,
        error: action.error,
      };
    default:
      throw new Error("Action not Found");
  }
};

const useFetch = () => {
  const API_DELAY_TIME = 1000;
  const [state, dispatch] = useReducer(reducer, INIT);

  const delay = () =>
    new Promise(res => {
      setTimeout(res, API_DELAY_TIME);
    });

  const callApi = useCallback(async cb => {
    dispatch(loadingAction());
    try {
      await delay();
      const response = await cb();
      dispatch(successAction(response));
    } catch (error: any) {
      if (!error) {
        dispatch(errorAction("서버에서 에러가 발생했습니다."));
      }
      if (error.data) {
        dispatch(errorAction(error.data));
      } else if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        dispatch(errorAction(error.response.data));
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        dispatch(errorAction(error.request.data));
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        dispatch(errorAction(error.message));
      }
    }
  }, []);

  // 반환 값이 2개 밖게 없을땐 배열로 보내주자.
  // 다음에 개발할땐 객체로 반환하지말고 배열로 반환하자
  return { state, callApi };
};

export default useFetch;
