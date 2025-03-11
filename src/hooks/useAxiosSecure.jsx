import { useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_api_url,
});

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (request) => {
        // put the token from local storage with request header
        const token = localStorage.getItem("access-token");
        request.headers.authorization = token;
        return request;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = instance.interceptors.request.use(
      (request) => {
        return request;
      },
      (err) => {
        //  check and logout user
        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return instance;
};

export { useAxiosSecure };
