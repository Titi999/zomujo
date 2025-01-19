import { ToastStatus } from '@/types/shared.enum';
import axiosClient, { isAxiosError } from 'axios';
import { Toast } from '@/hooks/use-toast';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const networkFailureErrorMessage = 'Oops! Server Error... Please check your internet connection';

const axios = axiosClient.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.localStorage.clear();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);

export const axiosErrorHandler = (error: unknown, toast = false): string | Toast => {
  const message = isAxiosError(error)
    ? (error.response?.data.message ?? networkFailureErrorMessage)
    : error instanceof Error
      ? error.message
      : networkFailureErrorMessage;

  if (toast) {
    return {
      title: ToastStatus.Error,
      description: message,
      variant: 'destructive',
    };
  }

  return message;
};

export default axios;
