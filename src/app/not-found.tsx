'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center justify-center">
        <p className="text-ceruba-500 text-6xl font-bold">404</p>
        <p className="text-5xl font-semibold">Page not found</p>
        <p className="pt-4 font-medium">Sorry, we couldn’t find the page you’re looking for.</p>
      </div>
      <div className="flex flex-row items-center gap-12">
        <Button onClick={() => router.replace('/')}>Go back home</Button>
        <Button className="bg-ceruba-100 shrink-0 text-lg font-medium" variant="link">
          Contact Support
        </Button>
      </div>
    </main>
  );
}
