'use client';
import { passwordSchema } from '@/schemas/zod.schemas';
import { MODE, unMatchingPasswords } from '@/constants/constants';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUpdatePassword } from '@/types/auth.interface';
import { useAppDispatch } from '@/lib/hooks';
import React, { JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { updatePassword } from '@/lib/features/auth/authThunk';
import { Button } from '@/components/ui/button';
import { Toast, toast } from '@/hooks/use-toast';

const UpdatePassword = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const updatePasswordSchema = z
    .object({
      newPassword: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
      message: unMatchingPasswords,
      path: ['confirmPassword'],
    });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IUpdatePassword>({
    resolver: zodResolver(updatePasswordSchema),
    mode: MODE.ON_TOUCH,
  });

  const onSubmit = async (passwords: IUpdatePassword): Promise<void> => {
    setIsLoading(true);
    const { payload } = await dispatch(updatePassword(passwords));
    setIsLoading(false);
    toast(payload as Toast);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-5 flex flex-col items-center justify-center space-y-8"
    >
      <h2 className="text-center text-2xl font-bold">Update Password</h2>
      <Input
        labelName="New Password"
        type="password"
        error={errors.newPassword?.message || ''}
        placeholder="***********************"
        enablePasswordToggle={true}
        {...register('newPassword')}
      />
      <Input
        labelName="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message || ''}
        placeholder="***********************"
        enablePasswordToggle={true}
        {...register('confirmPassword')}
      />
      <Button
        type="submit"
        className="mt-4 w-full max-w-sm"
        child="Update Password"
        disabled={!isValid || isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default UpdatePassword;
