'use client';
import React, { useState } from 'react';
import AppointmentRequestCard from './appointmentRequestCard';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModalProps } from '@/types/appointment';
import { AppointmentStatus, VisitType } from '@/types/shared.enum';

const AppointmentRequestPanel = () => {
  const [openModal, setModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<ModalProps | undefined>();
  return (
    <>
      <Modal
        open={openModal}
        content={
          selectedPatient && (
            <ModalContent
              option={selectedPatient?.option}
              patient={selectedPatient.patient}
              setModal={setModal}
            />
          )
        }
        showClose={true}
        setState={setModal}
      />
      <div className="x h-[calc(100vh-203px)] w-full overflow-y-scroll rounded-2xl border bg-white pt-6">
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-xl font-bold">Appointment Requests</p>
          <Badge variant={'brown'}>5</Badge>
        </div>
        <hr className="mx-6 mt-6 border border-gray-200" />

        <AppointmentRequestCard
          request={{
            id: 1,
            date: '2025-01-2',
            startTime: '10:00 AM',
            endTime: '12:00 PM',
            slotId: '12345',
            type: VisitType.Virtual,
            patient: {
              id: 'P001',
              firstName: 'John',
              lastName: 'Doe',
              profilePicture: null,
            },
            reason: 'Blood pressure',
            notes: 'Patient is on medication for hypertension.',
            status: AppointmentStatus.Declined,
          }}
          setShowModal={setModal}
          setSelectedPatient={setSelectedPatient}
        />
        <AppointmentRequestCard
          request={{
            id: 2,
            date: '2025-01-10',
            startTime: '12:00 pM',
            endTime: '2:00 PM',
            slotId: '12345',
            type: VisitType.Virtual,
            patient: {
              id: 'P001',
              firstName: 'killer',
              lastName: 'lapopo',
              profilePicture: null,
            },
            reason: 'Cold',
            notes: 'Patient is on medication for hypertension.',
            status: AppointmentStatus.Declined,
          }}
          setShowModal={setModal}
          setSelectedPatient={setSelectedPatient}
        />
        <AppointmentRequestCard
          request={{
            id: 3,
            date: '2025-01-20',
            startTime: '12:00 pM',
            endTime: '2:00 PM',
            slotId: '12345',
            type: VisitType.Virtual,
            patient: {
              id: 'P001',
              firstName: 'killer',
              lastName: 'lapopo',
              profilePicture: null,
            },
            reason: 'Cold',
            notes: 'Patient is on medication for hypertension.',
            status: AppointmentStatus.Declined,
          }}
          setShowModal={setModal}
          setSelectedPatient={setSelectedPatient}
        />
      </div>
    </>
  );
};

export default AppointmentRequestPanel;

const ModalContent = ({ option, patient: { firstName, lastName }, setModal }: ModalProps) => (
  <div>
    <p>
      Are you sure you want to
      <span className={cn('px-1', option == 'Accept' ? 'text-primary' : 'text-error-400')}>
        {option}
      </span>
      <span className={'pr-1 font-semibold'}>
        {firstName} {lastName}
      </span>
      request?
    </p>
    <div className="flex justify-end gap-4 pt-4">
      <Button child="Yes, Accept" />
      <Button
        child="No, Decline"
        variant={'destructive'}
        onClick={() => setModal && setModal(false)}
      />
    </div>
  </div>
);
