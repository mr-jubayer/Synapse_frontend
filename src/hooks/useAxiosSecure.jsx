import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const instance = axios.create({
  url: import.meta.env.VITE_api_url,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      instance.interceptors.request.use(
        (request) => {
          return request;
        },
        (err) => {
          console.log(err);

          return Promise.reject(err);
        }
      );

      instance.interceptors.response.use(
        (response) => {
          return response;
        },
        (err) => {
          console.log(err);

          return Promise.reject(err);
        }
      );
    }
  }, [user]);

  return instance;
};

export default useAxiosSecure;
