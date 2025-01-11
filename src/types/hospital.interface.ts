import { Status } from '@/types/shared.enum';

export interface IHospital {
  id: string;
  name: string;
  location: string;
  email: string;
  status: Status;
}
