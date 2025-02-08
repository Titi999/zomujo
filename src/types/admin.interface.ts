import { IExtraBase } from '@/types/shared.interface';
import { IBaseUser } from '@/types/auth.interface';

export interface IOrganization {
  id: string;
  name: string;
}
export interface IAdmin extends IExtraBase {
  org: IOrganization;
}

export type IInviteAdmin = IBaseUser & Pick<IExtraBase, 'orgId'>;
