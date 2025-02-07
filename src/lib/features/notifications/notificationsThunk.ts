import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '@/hooks/use-toast';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IPagination, IResponse } from '@/types/shared.interface';
import { INotification } from '@/types/notification.interface';
import {
  markNotificationAsRead,
  unmarkNotificationAsRead,
} from '@/lib/features/notifications/notificationsSlice';

const commonPath = 'common/' as const;
export const previousNotifications = createAsyncThunk(
  'notifications/previous',
  async (page: number): Promise<Toast | IPagination<INotification>> => {
    try {
      const { data } = await axios.get<IResponse<IPagination<INotification>>>(
        `${commonPath}notifications?page=${page}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id: number, { dispatch }) => {
    try {
      dispatch(markNotificationAsRead(id));
      await axios.patch<IResponse<IPagination<INotification>>>(`${commonPath}mark-as-read/${id}`);
    } catch {
      dispatch(unmarkNotificationAsRead(id));
    }
  },
);
