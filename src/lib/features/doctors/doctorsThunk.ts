import { Toast as ToastType } from '@/hooks/use-toast';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IDoctor } from '@/types/doctor.interface';
import { Toast } from '@/types/shared.enum';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllDoctors = createAsyncThunk(
  'doctors/allDoctors',
  async (queryParams: IQueryParams) => {
    try {
      const orderBy = `${queryParams.orderBy}:${queryParams.orderDirection};`;
      const { data } = await axios.get<IResponse<IPagination<IDoctor>>>(
        `doctors?orderBy=${orderBy}&page=${queryParams.page}&search=${queryParams.search}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error);
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

      return { title: Toast.Success, description: message, variant: 'success' };
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  },
);
export const deactivateDoctor = createAsyncThunk(
  'doctors/deactivateDoctor',
  async (id: string): Promise<ToastType> => {
    try {
      const {
        data: { message },
      } = await axios.delete<IResponse>(`admins/decline-doctor/${id}`);

      return { title: Toast.Success, description: message, variant: 'success' };
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  },
);
export const countAllDoctors = createAsyncThunk('dashboard/countDoctors', async () => {
  try {
    const { data } = await axios.get<IResponse>(`dashboard/doctor-count`);
    return data.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
});
