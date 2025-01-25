'use client';
import { MapPin, Navigation, ExternalLink, Building2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { JSX, useState } from 'react';
import { Button } from '@/components/ui/button';

const HospitalCard = ({
  hospital,
}: {
  hospital: {
    id: string;
    name: string;
    location: string;
    specialities: string[];
    distance: number;
    googleMapsUrl: string;
    imageUrl?: string;
  };
}): JSX.Element => {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);

  const handleOpenMap = (url: string): Window | null => window.open(url, '_blank');

  return (
    <>
      {showPreview && hospital.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 shadow-lg"
            >
              <X size={20} />
            </button>
            <Image
              src={hospital.imageUrl}
              alt={hospital.name}
              width={800}
              height={600}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      <div className="flex w-full max-w-[360px] shrink-0 flex-col rounded-[14px] border border-gray-200 bg-white">
        {hospital.imageUrl ? (
          <div className="relative h-48 w-full cursor-pointer" onClick={() => setShowPreview(true)}>
            <Image
              src={hospital.imageUrl}
              alt={hospital.name}
              fill
              className="rounded-t-[14px] object-cover transition-opacity duration-200 hover:opacity-90"
            />
          </div>
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-t-[14px] border border-gray-100 bg-primary/10">
            <Building2 size={48} className="text-primary" />
          </div>
        )}
        <div className="flex flex-col gap-2 p-6">
          <div className="flex flex-col">
            <div className="mb-4 flex w-full flex-col gap-2">
              <p className="text-lg font-bold">{hospital.name}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-400">
                <MapPin size={14} />
                {hospital.location}
              </div>
              <hr className="mt-2 w-full" />
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <div className="shadow-2xs flex h-fit w-fit flex-row items-center gap-1 rounded-full border border-gray-100 px-2 py-1">
                <Navigation size={14} className="text-primary" />
                <p className="text-sm font-medium leading-3">
                  {hospital.distance.toFixed(1)} km away
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {hospital.specialities.slice(0, 2).map((specialty, index) => (
                  <div key={index} className="flex flex-row items-center gap-1.5">
                    <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
                    <p className="text-sm leading-[14px]">{specialty}</p>
                  </div>
                ))}
                {hospital.specialities.length > 2 && (
                  <p className="text-sm text-gray-400">
                    +{hospital.specialities.length - 2} more specialities
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => router.push(`/hospitals/${hospital.id}`)}
              child="View Details"
            />
            <Button
              onClick={() => handleOpenMap(hospital.googleMapsUrl)}
              child={
                <>
                  <ExternalLink size={14} />
                  Open in Maps
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalCard;
