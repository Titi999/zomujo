'use client';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { JSX } from 'react';
import { DummyDoctorProfile } from '@/assets/images';

const DoctorCard = ({
  doctor,
}: {
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specializations: string[];
    ratings: number;
    experience: number;
    noOfConsultations: number;
    rate: { amount: number };
  };
}): JSX.Element => {
  const router = useRouter();
  return (
    <div className="flex w-full max-w-[360px] shrink-0 flex-col gap-2 rounded-[14px] border border-gray-200 bg-white p-6">
      <div className="flex flex-col">
        <div className="mb-4 flex w-full flex-row gap-3">
          <Image
            className="rounded-full"
            src={DummyDoctorProfile}
            width={56}
            height={56}
            alt="profile"
          />
          <div className="flex w-full flex-col justify-center">
            <p className="text-lg font-bold">Dr. {`${doctor?.firstName} ${doctor?.lastName}`}</p>
            <p className="text-sm font-medium text-gray-400">
              {doctor?.specializations ? doctor.specializations[0] : 'General Practitioner'}
            </p>
            <hr className="mt-3 w-full" />
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-6">
          <div className="flex h-fit w-fit flex-row items-center gap-1 rounded-full border border-gray-100 px-1.5 py-1 shadow-2xs">
            <Star size={14} className="fill-warning-300 text-warning-300" />
            <p className="text-sm leading-3 font-medium">{doctor.ratings}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-1.5">
              <div className="bg-primary h-[5px] w-[5px] rounded-full"></div>
              <p className="text-sm leading-[14px]">
                {doctor?.experience ?? 1} year(s) of experience
              </p>
            </div>
            {doctor.noOfConsultations && (
              <div className="flex flex-row items-center gap-1.5">
                <div className="bg-primary h-[5px] w-[5px] rounded-full"></div>
                <p className="text-sm leading-[14px]">{doctor.noOfConsultations} consultations</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-primaryDark text-xl leading-5 font-bold">
            GHs {doctor?.rate?.amount}/
          </p>
          <p className="text-sm leading-[14px] font-medium text-gray-400">Consult</p>
        </div>
        <button
          onClick={() => router.push(`/doctors/${doctor.id}`)}
          className="h-10 w-[175px] rounded-md border border-gray-300 bg-white text-sm text-black duration-100 hover:bg-gray-50"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
