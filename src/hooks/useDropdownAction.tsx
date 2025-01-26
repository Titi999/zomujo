import React, { useState, Dispatch } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { Toast, toast } from '@/hooks/use-toast';
import { showErrorToast } from '@/lib/utils';
import { AsyncThunk } from '@reduxjs/toolkit';
import { ConfirmationProps } from '@/components/ui/dialog';
import { IQueryParams } from '@/types/shared.interface';

interface UseDropdownActionProps<T> {
  setConfirmation: Dispatch<React.SetStateAction<ConfirmationProps>>;
  setQueryParameters: Dispatch<React.SetStateAction<IQueryParams<T>>>;
}

export const useDropdownAction = <T extends string>({
  setConfirmation,
  setQueryParameters,
}: UseDropdownActionProps<T>): {
  handleDropdownAction: (
    actionThunks: AsyncThunk<Toast, string, object>,
    id: string,
  ) => Promise<void>;
  isConfirmationLoading: boolean;
} => {
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleDropdownAction = async (
    actionThunks: AsyncThunk<Toast, string, object>,
    id: string,
  ): Promise<void> => {
    setIsConfirmationLoading(true);

    const handleAction = async (actionThunk: AsyncThunk<Toast, string, object>): Promise<void> => {
      const { payload } = await dispatch(actionThunk(id));
      if (payload) {
        toast(payload);
      }
      if (!showErrorToast(payload)) {
        setConfirmation((prev) => ({
          ...prev,
          open: false,
        }));
        setQueryParameters((prev) => ({
          ...prev,
          page: 1,
        }));
      }
    };

    await handleAction(actionThunks);

    setIsConfirmationLoading(false);
  };

  return { handleDropdownAction, isConfirmationLoading };
};
