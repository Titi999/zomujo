import { SelectOption } from '@/components/ui/select';
import { AcceptDeclineStatus, Gender } from '@/types/shared.enum';
import { ISelected } from '@/components/ui/dropdown-menu';

export const MODE = {
  ON_TOUCH: 'onTouched',
} as const;

export const DAYS_IN_WEEK = 7;
export const MINUTES_IN_HOUR = 60;
export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const PIXELS_PER_HOUR = 60;
export const TWELVE_HOUR_SYSTEM = 12;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
export const unMatchingPasswords = 'Passwords do not match';

export const genderOptions: SelectOption[] = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
  { label: 'Other', value: Gender.Other },
];

export const statusFilterOptions: ISelected[] = [
  {
    value: '',
    label: 'All',
  },
  {
    value: AcceptDeclineStatus.Accepted,
    label: 'Approved',
  },
  {
    value: AcceptDeclineStatus.Deactivated,
    label: 'Deactivated',
  },
];
