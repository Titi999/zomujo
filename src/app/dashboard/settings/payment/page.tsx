import React from 'react';
import PaymentInfo from '../_components/transactions/paymentInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Wallet from '../_components/transactions/wallet';
import Pricing from '../_components/transactions/pricing';

const Payment = () => (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Security</h2>
        <p className="text-gray-500"> Change your profile</p>
        <hr className="my-7 gap-4" />
      </div>
      <Tabs defaultValue="paymentInfo" className="">
        <TabsList>
          <TabsTrigger value="paymentInfo" className="rounded-2xl">
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="wallet" className="rounded-2xl">
            Wallet
          </TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-2xl">
            Pricing
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6" value="paymentInfo">
          <PaymentInfo />
        </TabsContent>
        <TabsContent className="mt-6" value="wallet">
          <Wallet />
        </TabsContent>
        <TabsContent className="mt-6" value="pricing">
          <Pricing />
        </TabsContent>
      </Tabs>
    </div>
  );

export default Payment;
