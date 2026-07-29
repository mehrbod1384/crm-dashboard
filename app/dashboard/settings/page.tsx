"use client";

import ProfileCard from "@/features/settings/components/ProfileCard";
import AppearanceCard from "@/features/settings/components/AppearanceCard";
import AccountCard from "@/features/settings/components/AccountCard";

export default function SettingsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="grid gap-6">
        <ProfileCard />

        <AppearanceCard />

        <AccountCard />
      </div>
    </section>
  );
}
