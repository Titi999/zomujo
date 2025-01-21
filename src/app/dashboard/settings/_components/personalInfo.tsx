'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectInput, SelectOption } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODE } from '@/constants/constants';
import { nameSchema } from '@/schemas/zod.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import React, { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IPersonalInfo {
  name: string;
}
const PersonalInfo = (): JSX.Element => {
  const personalDetails = {};
  const PersonalDetailsSchema = z.object({
    name: nameSchema,
  });
  const genderOptions: SelectOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const { register, control } = useForm<IPersonalInfo>({
    resolver: zodResolver(PersonalDetailsSchema),
    mode: MODE.ON_TOUCH,
    defaultValues: personalDetails,
  });
  return (
    <>
      <section>
        <div>
          <h2 className="text-2xl font-bold">Personal Details</h2>
          <p className="text-gray-500"> Update your profile</p>
        </div>
        <hr className="my-7 gap-4" />
        <p className="my-4 font-medium"> Upload profile</p>
        <div className="flex items-center justify-start gap-2">
          <div className="h-[79px] w-[79px] rounded-full bg-gray-600"></div>
          <Button child={'Upload new profile'} variant={'outline'} className="bg-transparent" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <Trash2 size={16} />
          </div>
        </div>
      </section>
      <hr className="my-[30px]" />
      <section>
        <div className="flex-warp flex flex-wrap gap-8 sm:flex-nowrap">
          <Input labelName="Full name" className="bg-transparent" placeholder="John doe" />
          <Input labelName="Email" className="bg-transparent" placeholder="johndoe@email.com" />
        </div>
        <div className="mt-8 flex flex-wrap gap-8 sm:flex-nowrap">
          <div className="w-full max-w-[384px]">
            <SelectInput
              label="School attended"
              control={control}
              error={''}
              ref={register('name').ref}
              options={genderOptions}
              name="gender"
              placeholder="Select your Gender"
              className="bg-transparent"
            />
          </div>
          <div className="w-full max-w-[384px]">
            <SelectInput
              label="Languages"
              control={control}
              error={''}
              ref={register('name').ref}
              options={genderOptions}
              name="gender"
              placeholder="Languages"
              className="bg-transparent"
            />
          </div>
        </div>
        <div className=" mt-8 flex flex-wrap gap-8 sm:flex-nowrap">
          <Input labelName="Phone Number" className="bg-transparent" placeholder="0208880000" />
          <Input
            labelName="MDC Registration Number"
            className="bg-transparent"
            placeholder="55590877"
          />
        </div>
        <div className="mt-8 max-w-[384px]">
          <Textarea labelName="About You" className="w-full resize-none bg-transparent" />
        </div>
      </section>
      <Button child="Save Changes" className="my-[15px] mb-24 ml-auto flex me:mb-0" />
    </>
  );
};

export default PersonalInfo;
