import { Reducer, useCallback, useReducer } from "react";
import { errorHandler } from "api/http";
import { AxiosResponse } from "axios";
import useDelay from "./useDelay";

const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

type Init<T> = {
  loading: boolean;
  data: null | T;
  error: string | null;
};

type Action<T> =
  | { type: "LOADING"; loading: boolean }
  | { type: "SUCCESS"; data: T }
  | { type: "ERROR"; error: string };

export const loadingAction = <T = void>(loading: boolean): Action<T> => ({ type: LOADING, loading });
export const successAction = <T>(data: T): Action<T> => ({ type: SUCCESS, data });
export const errorAction = <T = void>(error: string): Action<T> => ({ type: ERROR, error });

const reducer = <T>(state: Init<T>, action: Action<T>) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading,
        data: null,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error("Action not Found");
  }
};

const INIT = {
  loading: false,
  data: null,
  error: null,
};

// 여러개에 api를 loading , success , error 패턴으로 쓰고 싶다면 제너릭을 안쓰도 됩니다.
// 하지만 하나의 api만 쓴다면 제너릭에 반환 타입을 넣어주면 타입 추론이 가능합니다.
const useFetch = <T = any>(defaultDelay = 500, init: Init<T> = INIT) => {
  const [state, dispatch] = useReducer<Reducer<Init<T>, Action<T>>>(reducer, init);
  const delay = useDelay(defaultDelay);

  const handleDelay = async () => {
    dispatch(loadingAction(true));
    await delay();
    dispatch(loadingAction(false));
  };

  const callApi = useCallback(
    async (fetcher: Promise<AxiosResponse<{ data: T }>>) => {
      dispatch(loadingAction(true));
      try {
        await delay();
        const { data } = await fetcher;
        dispatch(successAction<T>(data.data));
        return Promise.resolve(data.data);
      } catch (error: any) {
        const message = errorHandler(error);
        dispatch(errorAction(message));
        return Promise.reject(message);
      }
    },
    [delay],
  );

  return {
    state,
    callApi,
    dispatch,
    handleDelay,
  };
};

export default useFetch;
