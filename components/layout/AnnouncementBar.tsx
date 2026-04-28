"use client";

export function AnnouncementBar({
  show,
  onDismiss,
}: {
  show: boolean;
  onDismiss: () => void;
}) {
  if (!show) return null;

  return (
    <div className="relative border-b border-line bg-charcoal py-2.5 text-center text-[11px] font-medium tracking-wide text-ivory">
      <span className="opacity-50">✦</span>
      <span className="mx-2">Free shipping on subscriptions — pause or cancel anytime</span>
      <span className="opacity-50">✦</span>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm px-1 text-lg leading-none text-ivory/40 transition hover:text-ivory focus-visible:outline-none"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
}
