"use client";

import { Monitor, Moon, Sun, Check } from "lucide-react";

import { useTheme } from "next-themes";

const themes = [
  {
    value: "light",
    title: "Light",
    description: "Clean and bright interface",
    icon: Sun,
  },
  {
    value: "dark",
    title: "Dark",
    description: "Comfortable for low-light",
    icon: Moon,
  },
  {
    value: "system",
    title: "System",
    description: "Match your device",
    icon: Monitor,
  },
] as const;

export default function AppearanceCard() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Appearance
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
          Customize how the application looks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {themes.map((item) => {
          const Icon = item.icon;

          const active = theme === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setTheme(item.value)}
              className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                p-5
                text-left
                transition-all
                duration-200

                ${
                  active
                    ? "border-slate-900 bg-slate-50 shadow-md dark:border-white dark:bg-zinc-900"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
                }
              `}
            >
              {active && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black">
                  <Check size={14} />
                </div>
              )}

              <div
                className={`
                  mb-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl

                  ${
                    active
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                      : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }
                `}
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
