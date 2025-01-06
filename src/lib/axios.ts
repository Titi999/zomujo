import axios, { isAxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const networkFailureErrorMessage = 'Oops! Server Error... Please check your internet connection';

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosErrorHandler = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data.message ?? networkFailureErrorMessage;
  } else if (error instanceof Error) {
    return error.message;
  }
  return networkFailureErrorMessage;
};
