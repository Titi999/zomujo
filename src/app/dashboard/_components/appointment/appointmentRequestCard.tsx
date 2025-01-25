'use client';
import { Button } from '@/components/ui/button';
import React, { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import { IAppointmentRequest, ModalProps } from '@/types/appointment';

export type AppointmentCardProps = {
  request: IAppointmentRequest;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPatient: React.Dispatch<React.SetStateAction<ModalProps | undefined>>;
};
const AppointmentRequestCard = ({
  request: {
    date,
    endTime,
    notes,
    patient: { firstName, lastName, id, profilePicture },
    reason,
    startTime,
  },
  setShowModal,
  setSelectedPatient,
}: AppointmentCardProps): JSX.Element => (
  <div className="mx-auto mt-6 flex max-w-[249px] flex-col gap-4 rounded-2xl bg-gray-50 px-2.5 py-[18px]">
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-row items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-gray-600"></div>
        <div className="flex h-full flex-col justify-between">
          <p className="max-w-[130px] truncate text-left text-sm font-medium">
            {firstName} {lastName}
          </p>
          <Badge variant={'brown'}>
            <p className="max-w-[110px] truncate">{reason}</p>
          </Badge>
        </div>
      </div>
      <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-md bg-white">
        <p className="w-9 text-center text-xs text-gray-500">{moment(date).format('Do MMM')}</p>
      </div>
    </div>
    <div className="flex flex-row justify-between text-xs font-medium">
      <p>
        {startTime} - {endTime}
      </p>
      <p>{moment(date).fromNow()}</p>
    </div>
    <hr className="border-gray-200" />

    {notes && (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold">Notes</p>
        <p className="text-xs leading-5 text-gray-500">{notes}</p>
      </div>
    )}
    <div className="flex flex-row gap-3">
      <Button
        type="button"
        onClick={() => {
          setShowModal(true);
          setSelectedPatient({
            patient: { firstName, lastName, id, profilePicture },
            option: 'Accept',
          });
        }}
        className="border-primary bg-primaryLightBase h-8 w-[145px] border-[1.5px] text-sm"
        child="Accept"
      />

      <Button
        type="button"
        onClick={() => {
          setShowModal(true);
          setSelectedPatient({
            patient: { firstName, lastName, id, profilePicture },
            option: 'Decline',
          });
        }}
        className="h-8 w-[68px] border-[1.5px] bg-transparent text-sm text-black"
        child="Decline"
      />
    </div>
  </div>
);

export default AppointmentRequestCard;
