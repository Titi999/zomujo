import { AvatarComp } from '@/components/ui/avatar';
import { getGreeting } from '@/lib/date';
import Text from '@/components/text/text';
import { useAppSelector } from '@/lib/hooks';
import { selectUserFirstName, selectUserName } from '@/lib/features/auth/authSelector';

export const AvatarGreetings = () => {
  const firstName = useAppSelector(selectUserFirstName);
  const userName = useAppSelector(selectUserName);

  return (
    <div className="mt-[14px] flex items-center justify-items-center gap-3 py-6">
      <AvatarComp imageSrc="https://github.com/shadcn.png" name={userName} imageAlt={userName} />
      <div className="flex flex-col">
        <span className="text-[18px] text-grayscale-500">
          {getGreeting()}, {firstName} 👋
        </span>
        <Text variant="span" boldness="bold" variantStyle="h2">
          How you doing today?
        </Text>
      </div>
    </div>
  );
};
