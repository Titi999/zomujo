'use client';
import { CardPayment, MobileMoney } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { JSX, useState } from 'react';

type CardProps = {
  type: 'card' | 'mobileMoney';
  name: string;
  number: string;
};

const PaymentInfo = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex gap-6 flex-wrap">
        <Card name="Lapopo" number="11111111111" type="card" />
        <Card name="King" number="44411111" type="mobileMoney" />
        <div
          className="flex h-[139px] w-[139px] cursor-pointer items-center justify-center rounded-[7.32px] border border-dashed text-gray-500"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
        </div>
      </div>
      <Modal
        open={isModalOpen}
        content={<PaymentMethod />}
        showClose={true}
        setState={setIsModalOpen}
      />
    </>
  );
};

export default PaymentInfo;

const Card = ({ number, name, type }: CardProps): JSX.Element => (
  <div className="flex h-[139px] w-[139px] flex-col items-start justify-center rounded-[7.32px] border pl-4">
    <Image src={type === 'card' ? CardPayment : MobileMoney} alt={type} />
    <p className="mt-4 truncate font-bold"> {name}</p>
    <p className="truncate text-[12px] font-bold text-gray-400"> {number}</p>
  </div>
);

const PaymentMethod = (): JSX.Element => (
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
        <Input labelName="Card Number" className="mb-8" wrapperClassName="max-w-none" />
        <Input labelName="Card holder" wrapperClassName="max-w-none" />
        <div className="mt-8 flex gap-[10px]">
          <Input labelName="Date of Birth" />
          <Input labelName="CVC" />
        </div>
      </TabsContent>

      <TabsContent className="mt-6" value="mobileMoney">
        <Input labelName="Name" className="mb-8" wrapperClassName="max-w-none" />
        <Input labelName="Number" className="mb-8" wrapperClassName="max-w-none" />
      </TabsContent>
    </Tabs>
    <div className="mt-5 flex justify-end">
      <Button child="Save" />
    </div>
  </div>
);
