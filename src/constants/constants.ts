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
export const METERS_TO_KM_FACTOR = 1000;
export const MAX_RADIUS_IN_KM = 30;

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

export const reassuringMessages = [
  'This is tough, but we’ll get there!',
  'This is difficult, but not impossible!',
  "Let's try again and see what we find.",
  'Still searching... something great might come up!',
  "Don't lose hope, the right result is out there!",
  'Every search brings us closer to success!',
  "Not giving up yet—let's refine our search.",
  'Keep going! The answer might be just a step away.',
  'Searching can be tricky, but we’re on the right track!',
  'Hang in there! Good things take time.',
  'A little persistence goes a long way!',
  'If at first we don’t succeed, we try again!',
  'We’re learning as we go—let’s keep at it!',
  'Almost there, let’s keep searching!',
  'The perfect result might be just around the corner!',
];

export const specialties = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'gynecology', label: 'Gynecology' },
  { value: 'urology', label: 'Urology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'otolaryngology', label: 'Otolaryngology (ENT)' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'pulmonology', label: 'Pulmonology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'rheumatology', label: 'Rheumatology' },
  { value: 'nephrology', label: 'Nephrology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'hematology', label: 'Hematology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'emergency-medicine', label: 'Emergency Medicine' },
  { value: 'anesthesiology', label: 'Anesthesiology' },
  { value: 'infectious-disease', label: 'Infectious Disease' },
];

export const healthInsurances = [
  { value: 'nhis', label: 'National Health Insurance Scheme (NHIS)' },
  { value: 'acacia', label: 'Acacia Health Insurance Limited' },
  { value: 'ace', label: 'Ace Medical Insurance' },
  { value: 'apex', label: 'Apex Health Insurance Limited' },
  { value: 'cosmopolitan', label: 'Cosmopolitan Health Insurance Limited' },
  { value: 'Dosh', label: 'Dosh Health Insurance Company Ltd' },
  { value: 'equity', label: 'Equity Health Insurance Limited' },
  { value: 'glico', label: 'GLICO Healthcare Limited' },
  { value: 'health insure', label: 'Health Insure Africa Limited' },
  { value: 'metropolitan', label: 'Metropolitan Health Insurance Ghana Limited' },
  { value: 'NMH', label: 'NMH Nationwide Medical Health Insurance Scheme Limited' },
  { value: 'phoenix', label: 'Phoenix Health Insurance' },
  { value: 'premier', label: 'Premier Health Insurance Company Limited' },
  { value: 'vitality', label: 'Vitality Health Insurance Limited' },
  { value: 'spectra', label: 'Spectra Health Mutual Insurance' },
];
