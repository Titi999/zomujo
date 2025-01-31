import { AcceptDeclineStatus, Gender } from './shared.enum';

export interface IDoctor {
  id: string;
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
    front: File;
    back: File;
  };
  rate: {
    lengthOfSession: string;
    amount: number;
  };
  balance: number | null;
  createdAt: Date;
  updatedAt: Date;
  signaturePath: string;
  hospitalId: string;
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
