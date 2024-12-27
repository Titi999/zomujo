import { Gender, Role, Status } from '@/types/shared.enum';

export interface IPersonalDetails {
  mdcRegistrationNumber: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: Gender;
}

export interface IDoctorPhotoUpload {
  passportPhoto: File;
}

export interface IDoctorIdentification {
  front: File;
  back: File;
}

export type DoctorOnboarding = IPersonalDetails & IDoctorPhotoUpload & IDoctorIdentification;

export interface ILoginResponse {
  user: IUser;
  extra: unknown;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: Status;
  isActive: boolean;
  role: Role;
  createdAt: Date;
}
