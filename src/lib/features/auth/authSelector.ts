import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export const selectUserRole = createSelector(
  ({ authentication }: RootState) => authentication.user,
  (user) => user?.role,
);

export const selectErrorMessage = createSelector(
  ({ authentication }: RootState) => authentication.errorMessage,
  (errorMessage) => errorMessage,
);

export const selectIsLoading = createSelector(
  ({ authentication }: RootState) => authentication.isLoading,
  (isLoading) => isLoading,
);
