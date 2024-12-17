import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { getCurrentYear } from '@/lib/date';
import Text from '@/components/text/text';

type AuthenticationFrameProps = {
  children: ReactNode;
  imageSlide: StaticImageData;
  imagePosition?: 'right' | 'left';
};
export default function AuthenticationFrame({
  children,
  imageSlide,
  imagePosition = 'right',
}: AuthenticationFrameProps) {
  const flexDirection = imagePosition === 'right' ? 'flex-row' : 'flex-row-reverse';
  return (
    <main className={`flex h-screen w-full ${flexDirection} p-5`}>
      <div className="relative hidden h-full w-1/2 flex-col justify-end overflow-clip rounded-[22px] bg-gray-400 lg:flex">
        <Image
          src={imageSlide}
          className="absolute z-0 h-full w-full object-cover object-center"
          alt={'login slide'}
        />
        <div className="bg-transparentPrimaryGradient z-10 w-full space-y-4 px-7 py-20 text-white 2xl:px-10 2xl:py-24">
          <Text variant="h3" variantStyle="h3">
            Elevate patient care with seamless access to their health data.
          </Text>
          <Text variantStyle="body-small" variant="p">
            Effortlessly manage patient data, appointments, and communications online, giving you
            control and convenience.
          </Text>
          <p></p>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
        <div className="mt-5 flex flex-col justify-center px-4 text-center text-sm sm:flex-row sm:gap-6">
          <p className="text-sm">© {getCurrentYear()} Zyptyk. All rights reserved.</p>

          <div className="text-primaryDark space-x-1">
            <Link href="/">Terms & Conditions</Link>
            <span className="text-black">|</span>
            <Link href="/">Privacy & Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
