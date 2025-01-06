import { Gender } from './shared.enum';

export type ManagedClientProps = {
  id: string;
  patient: string;
  gender: Gender;
  clinic: string;
  consult: string;
};
