import { Gender, Role, Status } from '@/types/shared.enum';

export interface IPersonalDetails {
  MDCRegistration: string;
  dob: Date;
  contact: string;
  gender: Gender;
}

export interface IDoctorPhotoUpload {
  profilePicture: File;
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
  extra: unknown; // we will replace this with the appropriate types based on roles
}

export interface ISignUp {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  location: string;
  firstName: string;
  lastName: string;
  role: Role;
  lat: number;
  long: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
