'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';
import { Eye, EyeClosed } from 'lucide-react';
import { Button } from './button';

export interface InputProps extends React.ComponentProps<'input'> {
  labelClassName?: string;
  labelName?: string;
  enablePasswordToggle?: boolean;
  error: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      name,
      labelName,
      labelClassName,
      value,
      enablePasswordToggle = false,
      error,
      ...props
    },
    ref,
  ) => {
    const [icon, setIcon] = useState(false);

    type = icon ? 'text' : type;

    return (
      <div className="relative grid w-full max-w-sm items-center gap-2">
        {labelName && (
          <Label htmlFor={name} className={labelClassName}>
            {labelName}
          </Label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-2 focus:border-primary focus:shadow-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            { 'border-red-500': error, 'focus:border-red-500': error },
            className,
          )}
          name={name}
          value={value}
          ref={ref}
          {...props}
        />
        {error && <small className="-mt-1 text-xs font-medium text-red-500">{error}</small>}
        {enablePasswordToggle && (
          <Button
            variant="ghost"
            className={cn('absolute -right-2 h-2 hover:bg-transparent', { 'top-8': labelName })}
            type="button"
            onClick={() => setIcon(!icon)}
          >
            {icon ? <Eye /> : <EyeClosed />}
          </Button>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
