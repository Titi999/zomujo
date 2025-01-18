import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApproveDeclineStatus } from '@/types/shared.enum';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { IHospital } from '@/types/hospital.interface';
import { IOrganizationRequestsCountResponse } from '@/types/stats.interface';
import { generateSuccessToast } from '@/lib/utils';
import { Toast } from '@/hooks/use-toast';

export const getOrganizationRequests = createAsyncThunk(
  'organizationRequests/getOrganizationRequests',
  async ({
    page,
    search,
    status,
  }: IQueryParams<ApproveDeclineStatus | ''>): Promise<Toast | IPagination<IHospital>> => {
    try {
      const { data } = await axios.get<IResponse<IPagination<IHospital>>>(
        `admins/org-request?status=${status}&page=${page}&search=${search}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

export const getOrganizationRequestsStats = createAsyncThunk(
  'organizationRequests/getOrganizationRequestsStats',
  async (): Promise<IOrganizationRequestsCountResponse | Toast> => {
    try {
      const { data } = await axios.get<IResponse<IOrganizationRequestsCountResponse>>(
        `dashboard/orgrequest-count`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

export const declineOrganizationRequest = createAsyncThunk(
  'organizationRequests/declineOrganizationRequest',
  async (id: string): Promise<Toast> => {
    try {
      const {
        data: { message },
      } = await axios.delete<IResponse>(`admins/org-request/${id}`);
      return generateSuccessToast(message);
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

export const approveOrganizationRequest = createAsyncThunk(
  'organizationRequests/approveOrganizationRequest',
  async (id: string): Promise<Toast> => {
    try {
      const {
        data: { message },
      } = await axios.post<IResponse>(`admins/org-request/${id}`);
      return generateSuccessToast(message);
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);
