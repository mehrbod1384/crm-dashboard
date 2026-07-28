"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-11 w-11 rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
    );
  }

  return (
    <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Button active={theme === "light"} onClick={() => setTheme("light")}>
        <Sun className="h-4 w-4" />
      </Button>

      <Button active={theme === "dark"} onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />
      </Button>

      <Button active={theme === "system"} onClick={() => setTheme("system")}>
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}

function Button({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
      flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200

      ${
        active
          ? "bg-zinc-950 text-white dark:bg-white dark:text-black"
          : "text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      }
      `}
    >
      {children}
    </button>
  );
}
