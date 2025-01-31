'use client';
import { CardPayment, MobileMoney } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MODE } from '@/constants/constants';
import { toast } from '@/hooks/use-toast';
import { selectUserId } from '@/lib/features/auth/authSelector';
import { addPaymentsDetails, getPaymentDetails } from '@/lib/features/payments/payments.thunk';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { showErrorToast } from '@/lib/utils';
import { cardNumberSchema, nameSchema, phoneNumberSchema } from '@/schemas/zod.schemas';
import { CardProps, PaymentDetails } from '@/types/payment.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const PaymentInfo = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [userPaymentDetails, setUserPaymentDetails] = useState<PaymentDetails[]>([]);

  useEffect(() => {
    const paymentDetails = async (): Promise<void> => {
      const { payload } = await dispatch(getPaymentDetails(userId!));
      if (payload && showErrorToast(payload)) {
        toast(payload);
        return;
      }
      setUserPaymentDetails(payload as PaymentDetails[]);
    };
    void paymentDetails();
  }, [isModalOpen]);

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {userPaymentDetails.map(({ reference, accountNumber, type }) => (
          <Card name={reference} number={accountNumber} type={type} key={accountNumber} />
        ))}

        <div
          className="flex h-[139px] w-[139px] cursor-pointer items-center justify-center rounded-[7.32px] border border-dashed text-gray-500"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
        </div>
      </div>
      <Modal
        open={isModalOpen}
        content={<PaymentMethod key={'paymentMethod'} />}
        showClose={true}
        setState={setIsModalOpen}
      />
    </>
  );
};

export default PaymentInfo;

const Card = ({ number, name, type }: CardProps): JSX.Element => (
  <div className="flex h-[139px] w-[139px] flex-col items-start justify-center rounded-[7.32px] border pl-4">
    <Image src={type === 'bank' ? CardPayment : MobileMoney} alt={type} />
    <p className="mt-4 w-28 truncate font-bold"> {name}</p>
    <p className="truncate text-[12px] font-bold text-gray-400"> {number}</p>
  </div>
);

const mobileMoneySchema = z.object({
  reference: nameSchema,
  accountNumber: phoneNumberSchema,
});

const creditCardSchema = z.object({
  reference: nameSchema,
  accountNumber: cardNumberSchema,
});

const PaymentMethod = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = usePaymentForm(creditCardSchema);

  const {
    register: registerMobileMoney,
    handleSubmit: submitDetails,
    formState: { errors: mobileMoneyFormErrors, isValid: isMobileMoneyCredentialsValid },
  } = usePaymentForm(mobileMoneySchema);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function handleFormSubmit(
    formData: PaymentDetails,
    type: 'bank' | 'mobile_money',
  ): Promise<void> {
    setIsLoading(true);
    const { payload } = await dispatch(addPaymentsDetails({ ...formData, type }));

    if (payload) {
      toast(payload);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <p className="text-2xl font-bold"> Add Method</p>
      <hr className="my-6" />
      <Tabs defaultValue="card" className="">
        <TabsList>
          <TabsTrigger value="card" className="rounded-2xl">
            Add card
          </TabsTrigger>
          <TabsTrigger value="mobileMoney" className="rounded-2xl">
            Add mobile wallet
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6" value="card">
          <form
            onSubmit={handleSubmit((formFiledValues) => handleFormSubmit(formFiledValues, 'bank'))}
          >
            <div className="mb-8">
              <Input
                labelName="Card Holder"
                wrapperClassName="max-w-none"
                error={errors.reference?.message || ''}
                {...register('reference')}
              />
            </div>
            <Input
              labelName="Card Number"
              wrapperClassName="max-w-none"
              type="number"
              {...register('accountNumber')}
              error={errors.accountNumber?.message || ''}
            />
            <div className="mt-5 flex justify-end">
              <Button child="Save" disabled={!isValid} isLoading={isLoading} />
            </div>
          </form>
        </TabsContent>

        <TabsContent className="mt-6" value="mobileMoney">
          <form
            onSubmit={submitDetails((formFiledValues) =>
              handleFormSubmit(formFiledValues, 'mobile_money'),
            )}
          >
            <Input
              labelName="Name"
              wrapperClassName="max-w-none"
              {...registerMobileMoney('reference')}
              error={mobileMoneyFormErrors.reference?.message || ''}
            />
            <div className="my-8">
              <Input
                labelName="Number"
                wrapperClassName="max-w-none"
                error={mobileMoneyFormErrors.accountNumber?.message || ''}
                {...registerMobileMoney('accountNumber')}
              />
            </div>
            <div className="mt-5 flex justify-end">
              <Button
                child="Save"
                disabled={!isMobileMoneyCredentialsValid}
                isLoading={isLoading}
              />
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const usePaymentForm = (
  schema: typeof mobileMoneySchema | typeof phoneNumberSchema,
): UseFormReturn<PaymentDetails, undefined> =>
  useForm<PaymentDetails>({
    resolver: zodResolver(schema),
    mode: MODE.ON_TOUCH,
  });
