import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mdcNumberSchema, phoneNumberSchema, requiredStringSchema } from '@/schemas/zod.schemas';
import { z } from 'zod';
import { Gender } from '@/types/shared.enum';
import { SelectInput, SelectOption } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updatePersonalDetails } from '@/lib/features/auth/authSlice';
import { IPersonalDetails } from '@/types/auth.interface';
import { maxDate } from '@/lib/utils';

const PersonalDetailsSchema = z.object({
  mdcRegistrationNumber: mdcNumberSchema,
  dateOfBirth: requiredStringSchema(),
  phoneNumber: phoneNumberSchema,
  gender: requiredStringSchema(),
});

const genderOptions: SelectOption[] = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
  { label: 'Other', value: Gender.Other },
];

const PersonalDetails = () => {
  const personalDetails = useAppSelector(
    ({ authentication }) => authentication.doctorPersonalDetails,
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IPersonalDetails>({
    resolver: zodResolver(PersonalDetailsSchema),
    mode: 'onTouched',
    defaultValues: personalDetails ?? undefined,
  });
  const dispatch = useAppDispatch();

  const onSubmit = (personalDetails: IPersonalDetails) => {
    dispatch(updatePersonalDetails(personalDetails));
  };

  return (
    <form className="flex w-full flex-col gap-11" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1.5">
        <p className="flex flex-row items-center gap-1 text-[32px] font-bold leading-8">
          Personal Details{' '}
          <span>
            <InfoIcon size={16} />
          </span>
        </p>
        <p className="leading-6 text-[#6B7280]">
          Provide your personal details for a personalized Zyptyk experience tailored to your
          preferences.
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-8 gap-y-[28px]">
        <div>
          <Input
            labelName="MDC Registration Number"
            type="text"
            error={errors.mdcRegistrationNumber?.message || ''}
            placeholder="MDC/PN/12345"
            {...register('mdcRegistrationNumber')}
          />
        </div>
        <div>
          <Input
            labelName="Date of Birth"
            type="date"
            error={errors.dateOfBirth?.message || ''}
            max={maxDate()}
            placeholder="MDC/PN/12345"
            {...register('dateOfBirth')}
          />
        </div>
        <div>
          <Input
            labelName="Phone Number"
            type="tel"
            error={errors.phoneNumber?.message || ''}
            placeholder="0555345678"
            {...register('phoneNumber')}
          />
        </div>
        <div className="max-w-sm">
          <SelectInput
            control={control}
            label="Gender"
            ref={register('gender').ref}
            error={errors.gender?.message}
            options={genderOptions}
            name="gender"
            placeholder="Select your Gender"
          />
        </div>
      </div>
      <Button disabled={!isValid} child={'Continue'} />
    </form>
  );
};

export default PersonalDetails;
