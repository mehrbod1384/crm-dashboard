"use client";

import { useEffect } from "react";
import { User, Mail, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

type FormValues = {
  name: string;
  email: string;
};

export default function ProfileCard() {
  const { data, isLoading } = useProfile();

  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
      });
    }
  }, [data, reset]);

  const onSubmit = (values: FormValues) => {
    updateProfile.mutate(values);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Profile
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
          Update your personal information.
        </p>
      </div>

      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                placeholder="John Doe"
              />
            </div>

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                {...register("email", {
                  required: "Email is required",
                })}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                placeholder="john@example.com"
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!isDirty || updateProfile.isPending}
              className="inline-flex h-11 text-white items-center gap-2 rounded-2xl bg-indigo-600 px-5 text-sm font-medium transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50  "
            >
              <Save size={18} />

              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="mb-2 h-4 w-24 rounded bg-slate-200 dark:bg-zinc-800" />

        <div className="h-12 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
      </div>

      <div>
        <div className="mb-2 h-4 w-20 rounded bg-slate-200 dark:bg-zinc-800" />

        <div className="h-12 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
      </div>

      <div className="flex justify-end">
        <div className="h-11 w-36 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
