import { ToastStatus } from '@/types/shared.enum';
import axios, { isAxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const networkFailureErrorMessage = 'Oops! Server Error... Please check your internet connection';

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosErrorHandler = (error: unknown, toast = false) => {
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
