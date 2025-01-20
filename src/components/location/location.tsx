'use client';
import React, { JSX } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Label } from '../ui/label';
import { Option } from 'react-google-places-autocomplete/build/types';
import { cn } from '@/lib/utils';

interface LocationProps {
  placeHolder: string;
  classStyle?: string;
  error: string;
  handleLocationValue: (data: Option) => void;
  onBlur?: () => void;
}

const Location = ({
  placeHolder,
  classStyle,
  error,
  handleLocationValue,
  onBlur,
}: LocationProps): JSX.Element => (
  <div>
    <div className={cn('w-[100%]', classStyle)}>
      <Label>Location</Label>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          onChange: (place) => place && handleLocationValue(place),
          placeholder: placeHolder,
          onBlur: () => onBlur && onBlur(),
          styles: {
            control: (provided, { isFocused }) => ({
              ...provided,
              borderColor: isFocused ? 'green' : error ? 'red' : 'none',
              '&:hover': {
                borderColor: 'none',
              },
              boxShadow: isFocused ? '0 0 0 1px green' : 'none',
              fontSize: '14px',
            }),
          },
        }}
      />
      <small className="-mt-1 text-xs font-medium text-red-500">{error}</small>
    </div>
  </div>
);

export default Location;
