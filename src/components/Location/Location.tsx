'use client';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Label } from '../ui/label';
import { Option } from 'react-google-places-autocomplete/build/types';

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
}: LocationProps) => {
  const existingClass = 'w-[100%]';

  return (
    <div>
      <div className={existingClass + classStyle}>
        <Label>Location</Label>
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          selectProps={{
            onChange: (place) => place && handleLocationValue(place),
            placeholder: placeHolder,
            onBlur: () => onBlur && onBlur(),

            styles: {
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? 'green' : error ? 'red' : 'none',
                '&:hover': {
                  borderColor: 'none',
                },
                boxShadow: state.isFocused ? '0 0 0 1px green' : 'none',
                fontSize: '14px',
              }),
            },
          }}
        />
        <small className="-mt-1 text-xs font-medium text-red-500">{error}</small>
      </div>
    </div>
  );
};

export default Location;
