"use client";

import { AccountSettings } from "@/components/dashboard/account/account-settings";
import { PaymentHistory } from "@/components/dashboard/account/payment-history";

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Account & Payments</h1>
        <p className="text-gray-500">Manage your account settings and view payment history</p>
      </div>
      <div className="grid gap-8">
        <AccountSettings />
        <PaymentHistory />
      </div>
    </div>
  );
}