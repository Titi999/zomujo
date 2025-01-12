import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type StatsCardProps = {
  title: string | number;
  value: string | number;
  percentage: string | number;
  trend: 'up' | 'down';
};

const StatsCard = ({ title, value, percentage, trend }: StatsCardProps) => (
  <Card className="w-[380px] flex-grow rounded-2xl">
    <div className="flex flex-row justify-between p-5">
      <CardTitle className="text-base text-grayscale-500">{title}</CardTitle>
      <div>
        <CardTitle
          className={cn('text-sm', {
            'text-success-500': trend === 'up',
            'text-error-500': trend === 'down',
          })}
        >
          {percentage}%
        </CardTitle>
        <CardDescription className="text-xs text-grayscale-500">vs last week</CardDescription>
      </div>
    </div>
    <CardContent>
      <span className="text-3xl font-bold">{value}</span>
    </CardContent>
  </Card>
);

export { StatsCard };
