import { IDoctorCountResponse } from '@/app/dashboard/(admin)/(user)/_components/doctorStats';
import { Toast as ToastType } from '@/hooks/use-toast';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IDoctor } from '@/types/doctor.interface';
import { ToastStatus } from '@/types/shared.enum';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllDoctors = createAsyncThunk(
  'doctors/allDoctors',
  async ({ orderBy, orderDirection, page, search }: IQueryParams) => {
    try {
      const userOrder = `${orderBy}:${orderDirection};`;
      const { data } = await axios.get<IResponse<IPagination<IDoctor>>>(
        `doctors?orderBy=${userOrder}&page=${page}&search=${search}`,
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

      return { title: ToastStatus.Success, description: message, variant: 'success' };
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

      return { title: ToastStatus.Success, description: message, variant: 'success' };
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
