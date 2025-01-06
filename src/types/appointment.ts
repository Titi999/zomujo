import { AppointmentStatus, VisitType } from './shared.enum';

export interface IAppointmentRequest {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  slotId: string;
  type: VisitType;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
  reason: string;
  notes: string;
  status: AppointmentStatus;
  option?: 'Accept' | 'Decline';
}

export type ModalProps = Pick<IAppointmentRequest, 'patient' | 'option'> & {
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
};
