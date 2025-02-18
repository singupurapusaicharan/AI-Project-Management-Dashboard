"use client";

import { Button } from "@/components/ui/button";

interface StatusButtonsProps {
  status: 'approved' | 'rejected' | 'pending';
}

export function StatusButtons({ status }: StatusButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className={
          status === 'approved'
            ? 'bg-green-600 hover:bg-green-600 text-white border-green-600'
            : status === 'pending'
            ? 'border-green-600 text-green-600 hover:bg-transparent'
            : 'text-gray-500 hover:bg-transparent'
        }
        disabled
      >
        Approved
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={
          status === 'rejected'
            ? 'bg-red-600 hover:bg-red-600 text-white border-red-600'
            : status === 'pending'
            ? 'border-red-600 text-red-600 hover:bg-transparent'
            : 'text-gray-500 hover:bg-transparent'
        }
        disabled
      >
        Rejected
      </Button>
    </div>
  );
}