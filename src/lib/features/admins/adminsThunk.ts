import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { AcceptDeclineStatus } from '@/types/shared.enum';
import { Toast } from '@/hooks/use-toast';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IAdmin, IInviteAdmin } from '@/types/admin.interface';
import { generateSuccessToast } from '@/lib/utils';

export const getAllAdmins = createAsyncThunk(
  'admins/allAdmins',
  async ({
    page,
    search,
    status,
  }: IQueryParams<AcceptDeclineStatus | ''>): Promise<IPagination<IAdmin> | Toast> => {
    const statusQuery = status ? `&status=${status}` : '';
    try {
      const { data } = await axios.get<IResponse<IPagination<IAdmin>>>(
        `admins?page=${page}&search=${search}${statusQuery}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

export const inviteAdmin = createAsyncThunk(
  'doctor/inviteAdmin',
  async (inviteAdmin: IInviteAdmin): Promise<Toast> => {
    try {
      const { data } = await axios.post<IResponse>(`admins/invite-admin`, inviteAdmin);
      return generateSuccessToast(data.message);
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);
