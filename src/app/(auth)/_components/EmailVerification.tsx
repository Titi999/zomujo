'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams, useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import { verifyEmail } from '@/lib/features/auth/authThunk';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ErrorIllustration, SuccessIllustration } from '@/assets/images';
import { selectThunkState } from '@/lib/features/auth/authSelector';
import { Button } from '@/components/ui/button';

const EmailVerification = (): JSX.Element => {
  const [successMessage, setMessage] = useState('');
  const [countdown, setCountdown] = useState(7);
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage } = useAppSelector(selectThunkState);
  const router = useRouter();

  useEffect(() => {
    const submitVerification = async () => {
      const { payload } = await dispatch(verifyEmail(token));
      if (payload) {
        setMessage(String(payload));
        const interval = setInterval(() => {
          if (countdown > 0) {
            setCountdown((prev) => prev - 1);
          }
        }, 1000);

        const timeout = setTimeout(() => {
          router.push('/dashboard');
        }, 7000);

        return (): void => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
    };
    void submitVerification();
  }, [token]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      {errorMessage && (
        <>
          <Image width={200} src={ErrorIllustration} alt="Verification failed" />
          <h2 className="mt-4 font-semibold text-red-500">{errorMessage}</h2>
          <Button
            child="Login"
            variant="secondary"
            className="mt-5 w-full max-w-xs"
            onClick={() => router.push('/login')}
          />
        </>
      )}
      {isLoading && (
        <>
          <Loader2 strokeWidth={1} className="animate-spin" size={64} />
          <h1>Verifying Email...</h1>
        </>
      )}
      {successMessage && (
        <>
          <Image width={200} src={SuccessIllustration} alt="Verifcation Success" />
          <h2 className="mt-4 font-semibold text-primary">{successMessage}</h2>
          <h1>Redirecting in {countdown} seconds...</h1>
          <Button
            child="Redirect Now"
            className="mt-5 w-full max-w-xs"
            onClick={() => router.push('/dashboard')}
          />
        </>
      )}
    </div>
  );
};
export default EmailVerification;
