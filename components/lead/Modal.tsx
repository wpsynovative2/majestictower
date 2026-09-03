"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "@/components/ui/Icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy: string;
  /** Wider shell for the long-form privacy policy. */
  size?: "md" | "lg";
  closeLabel?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog shell: backdrop blur, escape to close, focus trapped inside
 * and returned to whatever opened it.
 */
export default function Modal({
  open,
  onClose,
  children,
  labelledBy,
  size = "md",
  closeLabel = "Close dialog",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-forest-950/70 backdrop-blur-sm"
      />
      {/* A dark chip with a light glyph keeps the close button legible whether
          the panel behind it is the forest header or the cream body. */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative z-10 flex max-h-[calc(100dvh-2rem)] w-full animate-pop-in flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-[0_40px_120px_-20px_rgba(8,23,15,0.7)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-4xl ${
          size === "lg" ? "max-w-3xl" : "max-w-lg"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-forest-950/45 text-cream-50 ring-1 ring-cream-100/25 backdrop-blur-sm transition-all duration-200 hover:rotate-90 hover:bg-clay-500 hover:ring-clay-500"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
