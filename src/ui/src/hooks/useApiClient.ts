import axios, { type AxiosResponse, type AxiosError } from "axios";
import { useMemo } from "react";
import useCustomSnackbar from "./useCustomSnackbar";

const useApiClient = () => {
  const { enqueueSnackbar } = useCustomSnackbar();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL:
        import.meta.env.VITE_DEV_API_URL ||
        import.meta.env.VITE_PROD_API_URL ||
        "http://localhost:8080",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        let errorMessage = "An error occurred";

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data as any;

          switch (status) {
            case 400:
              errorMessage = data?.message || "Bad request";
              break;
            case 401:
              errorMessage = "Unauthorized access";
              break;
            case 403:
              errorMessage = "Access forbidden";
              break;
            case 404:
              errorMessage = "Resource not found";
              break;
            case 500:
              errorMessage = "Server error";
              break;
            default:
              errorMessage = data?.message || `Error ${status}`;
          }
        } else if (error.request) {
          errorMessage = "Network error - please check your connection";
        } else {
          errorMessage = error.message || "Request failed";
        }

        enqueueSnackbar({
          message: errorMessage,
          variant: "error",
        });

        return Promise.reject(error);
      }
    );

    return instance;
  }, [enqueueSnackbar]);

  const api = {
    get: <T = any>(url: string, config?: any) =>
      axiosInstance.get<T>(url, config),

    post: <T = any>(url: string, data?: any, config?: any) =>
      axiosInstance.post<T>(url, data, config),

    put: <T = any>(url: string, data?: any, config?: any) =>
      axiosInstance.put<T>(url, data, config),

    patch: <T = any>(url: string, data?: any, config?: any) =>
      axiosInstance.patch<T>(url, data, config),

    delete: <T = any>(url: string, config?: any) =>
      axiosInstance.delete<T>(url, config),
  };

  return { apiClient: axiosInstance, api };
};

export default useApiClient;

//Usage example
// const { apiClient } = useApiClient();
// const payload = {
//   email: "test@test.com",
//   password: "test",
// };
// const response = await apiClient.get("/api/v1/users",payload);
// console.log(response.data);
