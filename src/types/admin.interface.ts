import { IExtraBase } from '@/types/shared.interface';
import { IBaseUser } from '@/types/auth.interface';
import { IHospital } from '@/types/hospital.interface';

export interface IAdmin extends IExtraBase {
  org: IHospital;
}

export type IInviteAdmin = IBaseUser & Pick<IExtraBase, 'orgId'>;
