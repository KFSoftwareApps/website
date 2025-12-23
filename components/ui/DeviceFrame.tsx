"use client";

import Image from "next/image";
import { cn } from "@/components/ui/Button";

interface DeviceFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function DeviceFrame({ src, alt, className, priority = false }: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] shadow-xl",
        className
      )}
    >
      {/* Camera Notch */}
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20" />

      {/* Side Buttons (Volume/Power) - purely cosmetic */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg" />

      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative z-10">
        <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
      </div>
    </div>
  );
}
