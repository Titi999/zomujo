import { z } from 'zod';

export const passwordSchema = z
  .string()
  .nonempty('Field is required')
  .min(8, 'Password is too short')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  .max(20, 'Password is too long');

export const emailSchema = (isRequired = true) =>
  requiredStringSchema(isRequired).email('Invalid email format').min(5, 'Email is too short');

export const requiredStringSchema = (isRequired = true) => {
  const schema = z.string();
  return isRequired ? schema.nonempty('Field is required') : schema;
};
