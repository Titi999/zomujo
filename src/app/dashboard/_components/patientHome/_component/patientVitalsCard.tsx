'use client';
import { interpolate } from 'framer-motion';
import React from 'react';
import { interpolateRange } from '@/lib/utils';
import HalfCircleProgress from '@/components/ui/halfCircleProgress';
import { Badge } from '@/components/ui/badge';

const PatientVitalsCard = ({
  patient,
}: {
  patient?: { weight: number; heartRate: number; bloodSugarLevel: number; temperature: number };
}) => {
  const vitalsColor = interpolate(
    [0, 0.25, 0.75, 1],
    ['#F59E0B', '#16A34A', '#16A34A', '#DC2626'],
    {
      clamp: true,
    },
  );
  return (
    <div className="flex w-full max-w-sm flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Vitals</p>
      </div>
      <hr className="my-4" />
      <div className="flex h-28 items-center justify-center">
        <HalfCircleProgress
          progress={vitalsRange()}
          size={224}
          stroke={32}
          color={vitalsColor(vitalsRange())}
          bottomComponent={
            <div className="absolute bottom-0 flex w-full flex-col items-center gap-1">
              <p className="text-xs text-gray-500">Blood Pressure</p>
              <p className="font-bold">120/80 mmHg</p>
            </div>
          }
        />
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Weight</p>
          {patient?.weight ? <p className="font-bold">{patient?.weight ?? '70'} kg</p> : '<Empty>'}
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Heart Rate</p>
          {patient?.heartRate ? (
            <Badge className="bg-error-50 text-error-600">{`${Number(patient?.heartRate)} bpm`}</Badge>
          ) : (
            '<Empty>'
          )}
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Blood Sugar Level</p>
          {patient?.bloodSugarLevel ? (
            <Badge className="bg-warning-75 text-warning-600">{`${Number(patient?.bloodSugarLevel)} mg/dL`}</Badge>
          ) : (
            '<Empty>'
          )}
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Temperature</p>
          <p className="font-bold">
            {patient?.temperature ? `${patient?.temperature} ˚C` : '<Empty>'}
          </p>
        </div>
      </div>
    </div>
  );
};

const vitalsRange = (data?: { systolic: number; diastolic: number }) => {
  const { systolic, diastolic } = data ?? {
    systolic: 120,
    diastolic: 80,
  };
  const percSystolic = interpolateRange(systolic, 80, 200, 0, 1);
  const percDiastolic = interpolateRange(diastolic, 60, 140, 0, 1);

  return (percSystolic + percDiastolic) / 2;
};

export default PatientVitalsCard;
