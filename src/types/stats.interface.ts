import { BaseCountResponse } from './shared.interface';

export interface IDoctorCountResponse extends BaseCountResponse {
  pending: number;
  active: number;
  activeInc: number;
  pendingInc: number;
}
