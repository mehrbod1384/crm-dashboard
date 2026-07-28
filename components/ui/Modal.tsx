"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidthClassName?: string;
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  maxWidthClassName = "max-w-2xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur px-3 py-3 sm:items-center sm:px-4 sm:py-6"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthClassName} max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:rounded-[28px] sm:p-6 dark:bg-zinc-950`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {description && (
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {description}
                </p>
              )}
              {title && (
                <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-zinc-100">
                  {title}
                </h3>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
