import SingleImageDropzone from '@/components/ui/singleFileDropzone';
import { InfoIcon } from 'lucide-react';
import React, { FormEvent, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requiredStringSchema } from '@/schemas/zod.schemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks';
import { updateDoctorIdentification } from '@/lib/features/auth/authSlice';
import { IDoctorIdentification } from '@/types/auth.interface';

const DoctorIdentificationSchema = z.object({
  front: requiredStringSchema(),
  back: requiredStringSchema(),
});

const DoctorIdentification = () => {
  const [confirm, setConfirm] = useState(false);
  const { register, setValue, watch, getValues } = useForm<IDoctorIdentification>({
    resolver: zodResolver(DoctorIdentificationSchema),
    mode: 'onTouched',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateDoctorIdentification(getValues()));
  };

  return (
    <form className="flex w-full flex-col gap-10" onSubmit={($event) => onSubmit($event)}>
      <div className="flex flex-col gap-1.5">
        <p className="flex flex-row items-center gap-1 text-[32px] font-bold leading-8">
          Upload doctor’s ID
          <span>
            <InfoIcon size={16} />
          </span>
        </p>
        <p className="leading-6 text-[#6B7280]">We require both sides of ID Card</p>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-row justify-between">
          <SingleImageDropzone
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
              },
              maxSize: 5 * 1024 * 1024,
            }}
            height={280}
            width={300}
            label="Front"
            value={watch('front')}
            {...register('front')}
            onChange={(file) => setValue('front', file!)}
          />
          <SingleImageDropzone
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
              },
              maxSize: 5 * 1024 * 1024,
            }}
            height={280}
            width={300}
            label="Back"
            value={watch('back')}
            {...register('back')}
            onChange={(file) => setValue('back', file!)}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox
            labelClassName="text-gray-500"
            checked={confirm}
            onCheckedChange={(checked) => setConfirm(Boolean(checked))}
            labelName="I confirm that the ID provided is a valid  government issued doctor ID. This ID includes my name, ID number and expiry date"
          />
        </div>
      </div>
      <Button
        disabled={watch('front') === undefined || watch('back') === undefined || !confirm}
        type="submit"
        child={'Continue'}
      />
    </form>
  );
};

export default DoctorIdentification;
