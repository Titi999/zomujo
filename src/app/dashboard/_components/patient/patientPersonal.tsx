'use client';
import React, { JSX } from 'react';
import { IPatient } from '@/types/patient.interface';

const PatientPersonal = ({
  firstName,
  lastName,
  email,
  contact,
  city,
  address,
  NHISnumber,
  insuranceInfo,
}: IPatient): JSX.Element => (
  <div className="flex w-full max-w-sm flex-col rounded-xl border border-gray-200 bg-white p-4">
    <div className="flex flex-row items-center justify-between">
      <p className="font-bold">Personal and Other</p>
    </div>
    <hr className="my-4" />
    <span className="mb-3 font-bold">Personal</span>
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Name</span>
        <span className="text-sm font-medium">
          {firstName} {lastName}
        </span>
      </div>
      <div className="flex justify-between gap-x-4">
        <span className="text-sm text-gray-500">Email</span>
        <span className="text-sm font-medium">{email}</span>
      </div>
      <div className="flex justify-between gap-x-4">
        <span className="text-sm text-gray-500">Contact</span>
        <span className="text-sm font-medium">{contact}</span>
      </div>
      <div className="flex justify-between gap-x-4">
        <span className="text-sm text-gray-500">Address</span>
        <span className="text-sm font-medium">{address}</span>
      </div>
      <div className="flex justify-between gap-x-4">
        <span className="text-sm text-gray-500">City</span>
        <span className="text-sm font-medium">{city}</span>
      </div>
    </div>
    <span className="mt-6 font-bold">Other</span>
    <div className="flex flex-col gap-6">
      <div className="mt-4 flex justify-between">
        <span className="text-sm text-gray-500">NHIS Number</span>
        <span className="text-sm font-medium">{NHISnumber}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Insurance Info</span>
        <span className="text-sm font-medium">{insuranceInfo}</span>
      </div>
    </div>
  </div>
);

export default PatientPersonal;
