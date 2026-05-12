import React from 'react';
import { cn } from '@/src/lib/utils';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto lg:scale-100 md:scale-90 sm:scale-75 scale-[0.65] transition-transform duration-500 origin-top md:origin-center", className)}>
      {/* Phone Frame */}
      <div className="relative mx-auto border-zinc-900 bg-zinc-900 border-[10px] rounded-[3.2rem] h-[800px] w-[380px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden ring-1 ring-white/5">
        {/* Dynamic Island */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 h-8 w-32 bg-[#0a0a0a] rounded-full z-50 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full ml-12"></div>
        </div>

        {/* Screen Content */}
        <div className="h-full w-full bg-black relative overflow-hidden rounded-[1.8rem]">
          {children}
        </div>

        {/* Glossy overlay effect */}
        <div className="absolute inset-0 pointer-events-none rounded-[1.8rem] ring-1 ring-white/10 ring-inset"></div>
      </div>

      {/* Side Buttons (Abstracted) */}
      <div className="absolute -left-[10px] top-[140px] w-[3px] h-[40px] bg-zinc-700/50 rounded-r-sm"></div>
      <div className="absolute -left-[10px] top-[190px] w-[3px] h-[60px] bg-zinc-700/50 rounded-r-sm"></div>
      <div className="absolute -left-[10px] top-[260px] w-[3px] h-[60px] bg-zinc-700/50 rounded-r-sm"></div>
      <div className="absolute -right-[10px] top-[180px] w-[3px] h-[100px] bg-zinc-700/50 rounded-l-sm"></div>
    </div>
  );
}
