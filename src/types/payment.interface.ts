type PaymentOption = 'mobile_money' | 'bank';

export interface CardProps {
  type: PaymentOption;
  name: string;
  number: number;
}

export interface PaymentDetails {
  reference: string;
  accountNumber: number;
  type: PaymentOption;
}

export interface IRate {
  amount: number;
  lengthOfSession: string;
}
