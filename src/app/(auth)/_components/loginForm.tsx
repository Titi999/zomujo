'use client';
import Image from 'next/image';
import Link from 'next/link';
import Text from '@/components/text/text';
import { Logo } from '@/assets/images';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/schemas/zod.schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export interface ILogin {
  email: string;
  password: string;
}

const LoginSchema = z.object({
  email: emailSchema(),
  password: passwordSchema,
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({ resolver: zodResolver(LoginSchema), mode: 'onTouched' });

  const onSubmit = async (loginCredentials: ILogin) => {
    console.log('SUCCESS', loginCredentials); // TODO: Implement login logic
  };
  return (
    <form className="flex w-full flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
      <Image src={Logo} width={44} height={44} alt="Zyptyk-logo" />
      <div className="mt-5 flex w-full flex-col items-center space-y-3 2xl:space-y-3.5">
        <div className="flex flex-col items-center">
          <Text variantStyle="h4" variant="h4">
            Welcome to Zyptyk
          </Text>
          <Text variantStyle="body-small" className="text-grayscale-500">
            Login to your account to get started
          </Text>
        </div>
        <div className="flex w-full flex-col items-center gap-8">
          <Input
            labelName="Email"
            type="email"
            error={errors.email?.message || ''}
            placeholder="Enter your email"
            {...register('email')}
          />
          <Input
            labelName="Password"
            type="password"
            placeholder="Enter your password"
            enablePasswordToggle={true}
            error={errors.password?.message || ''}
            {...register('password')}
          />
          <Button disabled={!isValid} className="w-full max-w-sm">
            Login
          </Button>
          <div className="flex w-full max-w-sm justify-between">
            <Checkbox labelClassName="font-normal leading-none text-base" labelName="Remember me" />

            <Link href="/" className="text-primary">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export { LoginForm };
