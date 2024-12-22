'use client';
import { Button } from '@/components/ui/button';
import { MODE } from '@/constants/contants';
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  requiredStringSchema,
} from '@/schemas/zod.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

enum FormType {
  Organization = 'organization',
  Patient = 'patient',
  Doctor = 'doctor',
}

interface ISignUpFields {
  email: string;
  password: string;
  confirmPassword: string;
  hospitalName: string;
  location: string;
  firstName: string;
  lastName: string;
}

const unMatchingPasswords = 'Passwords do not match';

const SignUpForm = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>(FormType.Patient);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedForm(event.target.value as FormType);
  };

  const DoctorsSchema = z
    .object({
      firstName: nameSchema,
      lastName: nameSchema,
      email: emailSchema(),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: unMatchingPasswords,
      path: ['confirmPassword'],
    });

  const OrganizationsSchema = z.object({
    hospitalName: nameSchema,
    email: emailSchema(),
    location: requiredStringSchema(),
  });

  const PatientSchema = z
    .object({
      firstName: nameSchema,
      lastName: nameSchema,
      email: emailSchema(),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: unMatchingPasswords,
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpFields>({
    resolver: zodResolver(
      selectedForm === FormType.Doctor
        ? DoctorsSchema
        : selectedForm === FormType.Organization
          ? OrganizationsSchema
          : PatientSchema,
    ),
    mode: MODE.ON_TOUCH,
  });

  const getFormTitle = (selectedForm: FormType): string => {
    switch (selectedForm) {
      case FormType.Doctor:
        return 'Sign Up as Doctor';
      case FormType.Organization:
        return 'Request Organizational Access';
      default:
        return 'Sign Up as Patient';
    }
  };

  const onSubmit = (data: FieldValues) => {
    console.log('Form Data:', data); //Todo: integrating it with the backend API
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-5 mt-4 flex justify-center space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="patient"
            checked={selectedForm === FormType.Patient}
            onChange={handleFormChange}
            className="h-4 w-4 accent-primary"
          />
          <span>Patient</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="doctor"
            checked={selectedForm === FormType.Doctor}
            onChange={handleFormChange}
            className="h-4 w-4 accent-primary"
          />
          <span>Doctor</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="organization"
            checked={selectedForm === FormType.Organization}
            onChange={handleFormChange}
            className="h-4 w-4 accent-primary"
          />
          <span>Organization</span>
        </label>
      </div>
      {selectedForm === FormType.Organization && (
        <Alert className="border-primary">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold text-primary">Importance Notice</AlertTitle>
          <AlertDescription>
            This selection doesn&rsquo;t create an account automatically. We&rsquo;ll contact you
            after processing your request.
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        {selectedForm === FormType.Doctor && <NameFields register={register} errors={errors} />}

        {selectedForm === FormType.Organization && (
          <>
            <Input
              labelName="Hospital's Name"
              error={errors.hospitalName?.message || ''}
              placeholder="Zyptyk Hospital"
              {...register('hospitalName')}
            />

            <Input
              labelName="Location"
              error={errors.location?.message || ''}
              type="text"
              placeholder="Liberation Road, Accra"
              {...register('location')}
            />
          </>
        )}

        {selectedForm === FormType.Patient && <NameFields register={register} errors={errors} />}

        <Input
          labelName="Email"
          error={errors.email?.message?.toString() || ''}
          placeholder="johndoe@gmail.com"
          {...register('email')}
        />
        {selectedForm !== FormType.Organization && (
          <>
            <Input
              labelName="Password"
              type="password"
              error={errors.password?.message || ''}
              placeholder="***********************"
              enablePasswordToggle={true}
              {...register('password')}
            />
            <Input
              labelName="Confirm Password"
              type="password"
              error={errors.confirmPassword?.message || ''}
              placeholder="***********************"
              enablePasswordToggle={true}
              {...register('confirmPassword')}
            />
          </>
        )}

        <Button
          type="submit"
          disabled={!isValid}
          className="mt-4 w-full"
          child={getFormTitle(selectedForm)}
        />
      </form>
    </div>
  );
};

export default SignUpForm;

interface NameFieldsProps {
  register: UseFormRegister<ISignUpFields>;
  errors: FieldErrors<FieldValues>;
}
const NameFields = ({ register, errors }: NameFieldsProps) => {
  return (
    <div className="mt-8 flex w-full flex-col items-baseline justify-center gap-8 md:w-[96.5%] md:flex-row md:gap-2">
      <Input
        labelName="First Name"
        error={errors.firstName?.message?.toString() || ''}
        placeholder="John"
        {...register('firstName')}
      />
      <Input
        labelName="Last Name"
        error={errors.lastName?.message?.toString() || ''}
        placeholder="Doe"
        {...register('lastName')}
      />
    </div>
  );
};
