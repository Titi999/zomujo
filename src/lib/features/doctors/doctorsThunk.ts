import { Toast as ToastType } from '@/hooks/use-toast';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IDoctor } from '@/types/doctor.interface';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { IDoctorCountResponse } from '@/types/stats.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateSuccessToast } from '@/lib/utils';

export const getAllDoctors = createAsyncThunk(
  'doctors/allDoctors',
  async ({ page, search }: IQueryParams) => {
    try {
      const { data } = await axios.get<IResponse<IPagination<IDoctor>>>(
        `doctors?page=${page}&search=${search}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  },
);

export const approveDoctorRequest = createAsyncThunk(
  'doctors/approveDoctorsRequest',
  async (id: string): Promise<ToastType> => {
    try {
      const {
        data: { message },
      } = await axios.patch<IResponse>(`admins/verify-doctor/${id}`);

      return generateSuccessToast(message);
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  },
);

export const declineDoctor = createAsyncThunk(
  'doctors/declineDoctor',
  async (id: string): Promise<ToastType> => {
    try {
      const {
        data: { message },
      } = await axios.delete<IResponse>(`admins/decline-doctor/${id}`);

      return generateSuccessToast(message);
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  },
);

export const countAllDoctors = createAsyncThunk('dashboard/countDoctors', async () => {
  try {
    const { data } = await axios.get<IResponse<IDoctorCountResponse>>(`dashboard/doctor-count`);
    return data.data;
  } catch (error) {
    return axiosErrorHandler(error, true);
  }
});
