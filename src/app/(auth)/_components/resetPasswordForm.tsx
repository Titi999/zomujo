'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MODE } from '@/constants/constants';
import { passwordSchema } from '@/schemas/zod.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IResetPassword {
  password: string;
  confirmPassword: string;
}
const ResetPasswordForm = () => {
  const ResetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: MODE.ON_TOUCH,
  });

  const onSubmit = (data: IResetPassword) => {
    console.log('Form Data:', data); //Todo: integrating it with the backend API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 flex flex-col gap-8">
        <Input
          labelName="Password"
          type="password"
          error={errors.password?.message || ''}
          placeholder="************************"
          {...register('password')}
          enablePasswordToggle={true}
        />
        <Input
          labelName="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message || ''}
          placeholder="************************"
          {...register('confirmPassword')}
          enablePasswordToggle={true}
        />
        <Button child="Reset Password" disabled={!isValid} className="w-full max-w-sm" />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
