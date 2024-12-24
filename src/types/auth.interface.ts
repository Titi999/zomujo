import { Gender } from '@/types/shared.enum';

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
