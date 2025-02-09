import { JSX } from 'react';

const SkeletonDoctorPatientCard = (): JSX.Element => (
  <div className="flex w-full max-w-[360px] shrink-0 animate-pulse flex-col gap-2 rounded-[14px] border border-gray-200 bg-white p-6">
    <div className="flex flex-col">
      <div className="mb-4 flex w-full flex-row gap-3">
        <div className="h-[56px] w-[56px] rounded-full bg-gray-300"></div>
        <div className="flex w-full flex-col justify-center">
          <div className="h-5 w-32 rounded bg-gray-300"></div>
          <div className="mt-2 h-4 w-24 rounded bg-gray-300"></div>
          <hr className="mt-3 w-full bg-gray-300" />
        </div>
      </div>
      <div className="mb-6 flex flex-row gap-6">
        <div className="h-6 w-12 rounded-full bg-gray-300"></div>
        <div className="flex flex-col gap-4">
          <div className="h-4 w-40 rounded bg-gray-300"></div>
          <div className="h-4 w-32 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <div className="h-6 w-20 rounded bg-gray-300"></div>
        <div className="h-4 w-16 rounded bg-gray-300"></div>
      </div>
      <div className="h-10 w-[175px] rounded-md bg-gray-300"></div>
    </div>
  </div>
);

export default SkeletonDoctorPatientCard;
