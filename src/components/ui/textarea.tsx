import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

export interface TextProps extends React.ComponentProps<'textarea'> {
  labelClassName?: string;
  labelName?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextProps>(
  ({ className, labelName, name, labelClassName, error, onChange, ...props }, ref) => (
    <>
      {labelName && (
        <Label htmlFor={name} className={labelClassName}>
          {labelName}
        </Label>
      )}
      <textarea
        id="text"
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
          'focus:border-2 focus:border-primary focus:shadow-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          { 'border-red-500': error, 'focus:border-red-500': error },
        )}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <small className="text-red-500">{error}</small>
    </>
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
