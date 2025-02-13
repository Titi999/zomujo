import { ApproveDeclineStatus } from '@/types/shared.enum';

export interface IHospital {
  id: string;
  name: string;
  location: string;
  email: string;
  status: ApproveDeclineStatus;
  specialties?: string[];
  distance: number;
  gpslink: string;
  supportedInsurance: string[];
  regularFee: string;
  image: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface INearByQueryParams {
  lat: number;
  long: number;
  radius: number;
}
