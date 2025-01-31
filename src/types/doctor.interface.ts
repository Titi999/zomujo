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
  experience: number;
  education: {
    school: string;
    degree: string;
  };
  bio: string;
  languages: string[];
  awards: string[];
  IDs: {
    front: string;
    back: string;
  };
  rate: {
    lengthOfSession: number;
    amount: number;
  };
  balance: number | null;
  signaturePath: string;
  status: AcceptDeclineStatus;
}

export type IInviteDoctor = Pick<ISignUp, 'email' | 'lastName' | 'firstName'>;

export interface IInviteDoctors extends Pick<IExtraBase, 'orgId'> {
  users: IInviteDoctor[];
}
