import { Gender } from '@/types/shared.enum';
import { Badge } from '@/components/ui/badge';
import React, { JSX } from 'react';

type GenderBadgeProps = {
  gender: Gender;
};

const GenderBadge = ({ gender }: GenderBadgeProps): JSX.Element => {
  const genderProperties = (
    gender: string,
  ): { title: string; variant: 'brown' | 'blue' | 'destructive' } => {
    switch (gender) {
      case Gender.Male:
        return { title: 'Male', variant: 'brown' };
      case Gender.Female:
        return { title: 'Female', variant: 'blue' };
      default:
        return { title: 'Other', variant: 'destructive' };
    }
  };

  const { title, variant } = genderProperties(gender);
  return (
    <div>
      <Badge variant={variant}>{title}</Badge>
    </div>
  );
};

export default GenderBadge;
