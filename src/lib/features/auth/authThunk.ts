import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { setErrorMessage, setUserInfo } from '@/lib/features/auth/authSlice';
import {
  IDoctorPhotoUpload,
  ILogin,
  ILoginResponse,
  IResetPassword,
  ISignUp,
} from '@/types/auth.interface';
import { IResponse } from '@/types/shared.interface';

const authPath = 'auth/' as const;
export const login = createAsyncThunk(
  'authentication/login',
  async (loginCredentials: ILogin, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<ILoginResponse>>(
        `${authPath}login`,
        loginCredentials,
      );
      dispatch(setUserInfo(data.data));
      return true;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);

export const doctorOnboarding = createAsyncThunk(
  'authentication/doctorOnboarding',
  async (doctorPhotoUpload: IDoctorPhotoUpload, { dispatch, getState }) => {
    const state = getState();
    console.log('Current State:', state); // will add info from other stages
    try {
      const { data } = await axios.post('', doctorPhotoUpload);
      console.log('Data', data); // TODO: Backend needs to adjust before we can handle this
      return true;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);

export const signUp = createAsyncThunk(
  'authentication/signUp',
  async (signUpCredentials: ISignUp, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse>(`${authPath}signUp`, signUpCredentials);
      return data.message;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);

export const requestOrganization = createAsyncThunk(
  'authentication/organizationsRequest',
  async (organizationCredentials: ISignUp, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse>(
        `${authPath}org-request`,
        organizationCredentials,
      );
      return data.message;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'authentication/forgotPassword',
  async (email: string, { dispatch }) => {
    try {
      const { data } = await axios.patch<IResponse>(`${authPath}forgot-password`, { email });
      return data.message;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);
export const resetPassword = createAsyncThunk(
  'authentication/resetPassword',
  async (passwordCredentials: IResetPassword, { dispatch }) => {
    try {
      const { data } = await axios.patch<IResponse>(
        `${authPath}renew-password`,
        passwordCredentials,
      );
      return data.message;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);
