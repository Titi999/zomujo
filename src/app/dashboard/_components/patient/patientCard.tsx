import { IPatient } from '@/types/patient.interface';
import React, { JSX } from 'react';
import { AvatarComp } from '@/components/ui/avatar';
import { capitalize } from '@/lib/utils';
import GenderBadge from '@/app/dashboard/_components/genderBadge';
import { formatDateToDDMMYYYY } from '@/lib/date';

const PatientCard = ({
  profilePicture,
  firstName,
  lastName,
  maritalStatus,
  gender,
  dob,
  denomination,
  height,
  bloodGroup,
}: IPatient): JSX.Element => {
  const name = `${firstName} ${lastName}`;
  return (
    <div className="flex w-full max-w-sm flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <AvatarComp imageSrc={profilePicture} name={name} className="h-7 w-7" /> {name}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Marital Status</span>
          <span className="text-sm font-medium">
            {maritalStatus ? capitalize(maritalStatus) : '<Empty>'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Gender</span>
          <span className="text-sm font-medium">
            {gender ? <GenderBadge gender={gender} /> : '<Empty>'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Date of Birth</span>
          <span className="text-sm font-medium">{dob ? formatDateToDDMMYYYY(dob) : '<Empty>'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Denomination</span>
          <span className="text-sm font-medium">
            {denomination ? capitalize(denomination) : '<Empty>'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Height</span>
          <span className="text-sm font-medium">{height ? height : '<Empty>'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Blood Group</span>
          <span className="text-sm font-medium">{bloodGroup ? bloodGroup : '<Empty>'}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
