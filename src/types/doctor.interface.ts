import { AcceptDeclineStatus, Gender } from './shared.enum';
import { ISignUp } from '@/types/auth.interface';
import { IExtraBase } from '@/types/shared.interface';

export interface IDoctor extends IExtraBase {
  email: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  MDCRegistration: string;
  dob: Date;
  gender: Gender;
  contact: string;
  address: string;
  city: string;
  qualifications: string[];
  specializations: string[];
  schoolsAttended: string[];
  experience: number;
  education: {
    school: string;
    degree: string;
  };
  notifications: {
    email: boolean;
    appointments: boolean;
    messages: boolean;
    fileRecordRequest: boolean;
  };
  bio: string;
  languages: string[];
  awards: string[];
  IDs: {
    front: string;
    back: string;
  };
  rate: {
    lengthOfSession: string;
    amount: number;
  };
  balance: number | null;
  signaturePath: string;
  status: AcceptDeclineStatus;
}

export type DoctorPersonalInfo = Pick<
  IDoctor,
  | 'firstName'
  | 'lastName'
  | 'contact'
  | 'experience'
  | 'languages'
  | 'awards'
  | 'specializations'
  | 'bio'
  | 'schoolsAttended'
>;

export type NotificationInfo = Pick<IDoctor, 'notifications'>;
export type IInviteDoctor = Pick<ISignUp, 'email' | 'lastName' | 'firstName'>;

export interface IInviteDoctors extends Pick<IExtraBase, 'orgId'> {
  users: IInviteDoctor[];
}
