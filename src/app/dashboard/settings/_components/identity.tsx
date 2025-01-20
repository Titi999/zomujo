'use client';
import { Button } from '@/components/ui/button';
import SingleImageDropzone from '@/components/ui/singleFileDropzone';
import { useAppSelector } from '@/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Identity = (): JSX.Element => {

  const identificationSchema = z.object({});
  const doctorIdentification = useAppSelector(
    ({ authentication }) => authentication.doctorIdentification,
  );
  const { register, setValue, watch } = useForm({
    resolver: zodResolver(identificationSchema),
    defaultValues: doctorIdentification,
  });

  return (
    <div>
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl font-bold">Identification</h2>
          <span className="rounded-sm bg-success-50 p-2 text-xs text-primary">
            Your ID has been verified
          </span>
        </div>
        <p className="text-gray-500">
          Stay in the loop! Receive updates, and important news directly to your inbox.
        </p>
        <hr className="my-7 gap-4" />
      </div>
      <div className="max-w-[650px]">
        <div className="flex flex-row flex-wrap justify-between">
          <SingleImageDropzone
            height={280}
            width={300}
            label="Front"
            value={watch('front')}
            {...register('front')}
            onChange={(file) => setValue('front', file!, { shouldValidate: true })}
            className="mb-4"
          />
          <SingleImageDropzone
            height={280}
            width={300}
            label="Back"
            value={watch('back')}
            {...register('back')}
            onChange={(file) => setValue('back', file!, { shouldValidate: true })}
          />
        </div>
        <div className="flex justify-end">
          <Button child="Save Changes" />
        </div>
      </div>
    </div>
  );
};

export default Identity;
