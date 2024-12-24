'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MODE } from '@/constants/constants';
import { emailSchema } from '@/schemas/zod.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IForgotPassword {
  email: string;
}
const ForgetPasswordForm = () => {
  const ForgotPasswordSchema = z.object({
    email: emailSchema(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: MODE.ON_TOUCH,
  });

  const onSubmit = (data: IForgotPassword) => {
    console.log('Form Data:', data); //Todo: integrating it with the backend API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 flex flex-col gap-8">
        <Input
          labelName="Email"
          type="email"
          error={errors.email?.message || ''}
          placeholder="johndoe@gmail.com"
          {...register('email')}
        />
        <Button child="Continue" disabled={!isValid} className="w-full max-w-sm" />

        <div className="">
          <Link href="/login" className="flex pl-2 text-primary">
            <ArrowLeft /> Back
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
