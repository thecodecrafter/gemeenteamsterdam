import { useEffect, useState } from "react";
import axios from "axios";

export interface IUseFetchResponse<T> {
  data: T | null;
  isProcessing: boolean;
  hasFetched: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string): IUseFetchResponse<T> => {
  const [state, setState] = useState<IUseFetchResponse<T>>({
    data: null,
    isProcessing: false,
    hasFetched: false,
    isSuccess: false,
    error: null,
  });

  const ERROR_MESSAGE =
    "Wegens een technische fout kon de pagina niet worden opgebouwd. Probeer het over een paar minuten opnieuw.";

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isProcessing: true,
      error: null,
      isSuccess: false,
    }));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      .then((res) => {
        // check if result contains _embedded
        if (res.data._embedded) {
          setState((prevState) => ({
            ...prevState,
            data: res.data,
            isSuccess: true,
            isProcessing: false,
            hasFetched: true,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: ERROR_MESSAGE,
            isSuccess: true,
            isProcessing: false,
            hasFetched: true,
          }));
        }
      })
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          error: ERROR_MESSAGE,
          isSuccess: false,
          isProcessing: false,
          hasFetched: true,
        }));
      });
  }, [url]);

  return {
    data: state.data,
    isProcessing: state.isProcessing,
    isSuccess: state.isSuccess,
    error: state.error,
    hasFetched: state.hasFetched,
  };
};
