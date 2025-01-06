import { Gender } from './shared.enum';

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
  createdAt: Date;
  updatedAt: Date;
  signaturePath: string;
  hospitalId: string;
}
