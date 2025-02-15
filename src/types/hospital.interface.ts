import { ApproveDeclineStatus } from '@/types/shared.enum';

export interface IHospital extends IHospitalProfile {
  id: string;
  location: string;
  email: string;
  status: ApproveDeclineStatus;
  distance: number;
  gpsLink: string;
  image: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface IHospitalProfile {
  supportedInsurance: string[];
  specialties?: string[];
  name: string;
  regularFee: number;
  image: string | null | File;
}

export interface INearByQueryParams {
  lat: number;
  long: number;
  radius: number;
}
