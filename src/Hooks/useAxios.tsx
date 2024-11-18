import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { useAuthCtx } from "../Contexts/AuthCtx";
import { BASE_URL } from "../Config/Urls";

const useAxios = () => {
  const { token, logout } = useAuthCtx();

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  const handleError = (error: any, needToast = true) => {
    if (error.response?.status === 401) {
      logout();
    }

    let errorMessage;

    if (error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.errors) {
      setErrorMsg(error.response.data.errors);

      errorMessage = error.response.data.errors;
    } else {
      setErrorMsg("Something went wrong, please try again later");
      console.error(error.message);
      errorMessage = error.message;
    }

    if (needToast) {
      toast.error(errorMessage);
    }
  };

  return {
    axiosInstance,
    handleError,
    errorMsg,
    setErrorMsg,
    isLoading,
    setIsLoading,
  };
};

export default useAxios;
