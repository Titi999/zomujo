'use client';
import Image from 'next/image';
import React from 'react';
import { Logo } from '@/assets/images';
import { cn } from '@/lib/utils';
import PersonalDetails from '@/app/onboarding/_components/personalDetails';
import { useAppSelector } from '@/lib/hooks';
import DoctorIdentification from '@/app/onboarding/_components/doctorIdentification';
import DoctorPhotoUpload from '@/app/onboarding/_components/doctorPhotoUpload';

const DoctorOnboarding = () => {
  const currentStep = useAppSelector(({ authentication }) => authentication.currentStep);

  const CurrentView = {
    1: <PersonalDetails />,
    2: <DoctorIdentification />,
    3: <DoctorPhotoUpload />,
  }[currentStep];

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-[#FAFAFA]">
      <header className="relative w-full bg-white px-[72px] py-10">
        <Image
          src={Logo}
          className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2"
          alt="Zyptyk Logo"
        />
      </header>
      <div className="mt-[70px] flex w-[610px] flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="leading-4">Step {currentStep} of 3</p>
          <div className="flex flex-row items-center justify-between gap-4">
            {Array(3)
              .fill('')
              .map((_, i) => (
                <div
                  key={`progress-${i}`}
                  className={cn(
                    'h-1 w-full duration-150',
                    1 >= i + 1 ? 'bg-primary' : 'bg-gray-200',
                  )}
                />
              ))}
          </div>
        </div>
        {CurrentView}
      </div>
    </div>
  );
};

export default DoctorOnboarding;
