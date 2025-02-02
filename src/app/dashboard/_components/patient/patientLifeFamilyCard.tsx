'use client';
import React, { JSX } from 'react';

const PatientLifeFamilyCard = (): JSX.Element => (
  <div className="flex w-full max-w-sm flex-col rounded-xl border border-gray-200 bg-white p-4">
    <div className="flex flex-row items-center justify-between">
      <p className="font-bold">Lifestyle & Family</p>
    </div>
    <hr className="my-4" />
    <span className="mb-3 font-bold">Lifestyle</span>
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Alcohol</span>
        <span className="text-sm font-medium">{'<Empty>'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Stress</span>
        <span className="text-sm font-medium">{'<Empty>'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Smoking</span>
        <span className="text-sm font-medium">{'<Empty>'}</span>
      </div>
    </div>
    <span className="mt-6 font-bold">Family History</span>
    <span className="mt-4 text-sm font-medium">{'<Empty>'}</span>
  </div>
);

export default PatientLifeFamilyCard;
