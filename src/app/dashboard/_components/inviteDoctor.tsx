'use client';
import { emailSchema, requiredStringSchema } from '@/schemas/zod.schemas';
import { MODE } from '@/constants/constants';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IInviteDoctor } from '@/types/doctor.interface';

type InviteDoctorProps = {
  isLoading?: boolean;
  submit: (inviteDoctor: IInviteDoctor) => void;
};

const InviteDoctor = ({ isLoading, submit }: InviteDoctorProps): JSX.Element => {
  const inviteDoctorSchema = z.object({
    firstName: requiredStringSchema(),
    lastName: requiredStringSchema(),
    email: emailSchema(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IInviteDoctor>({
    resolver: zodResolver(inviteDoctorSchema),
    mode: MODE.ON_TOUCH,
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-5 flex flex-col items-center justify-center space-y-8"
    >
      <h2 className="text-center text-2xl font-bold">Invite Doctor</h2>
      <Input
        labelName="First Name"
        error={errors.firstName?.message || ''}
        placeholder="John"
        {...register('firstName')}
      />
      <Input
        labelName="Last Name"
        error={errors.lastName?.message || ''}
        placeholder="Doe"
        {...register('lastName')}
      />
      <Input
        labelName="Email"
        error={errors.email?.message || ''}
        placeholder="johndoe@gmail.com"
        {...register('email')}
      />
      <Button
        type="submit"
        className="mt-4 w-full max-w-sm"
        child="Invite Doctor"
        disabled={!isValid || isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default InviteDoctor;
