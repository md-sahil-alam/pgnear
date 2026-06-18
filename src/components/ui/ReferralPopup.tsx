"use client";

import { useEffect, useState } from "react";

const STORAGE_KEYS = {
  neverShow: "pgnear_referral_popup_never_show",
  snoozeUntil: "pgnear_referral_popup_snooze_until",
};

type ReferralPopupProps = {
  rewardLink?: string;
  delayMs?: number;
  snoozeDays?: number;
};

export default function ReferralPopup({
  rewardLink = "/rewards",
  delayMs = 15000,
  snoozeDays = 7,
}: ReferralPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const neverShow = window.localStorage.getItem(STORAGE_KEYS.neverShow);
    if (neverShow === "true") return;

    const snoozeUntil = window.localStorage.getItem(STORAGE_KEYS.snoozeUntil);
    if (snoozeUntil) {
      const snoozeUntilTime = Number(snoozeUntil);
      if (!Number.isNaN(snoozeUntilTime) && Date.now() < snoozeUntilTime) {
        return;
      }
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);

      window.gtag?.("event", "referral_popup_shown");
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs]);

  const closePopup = () => {
    const snoozeUntil = Date.now() + 2 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(STORAGE_KEYS.snoozeUntil, String(snoozeUntil));
    setIsOpen(false);
  };

  const handleMaybeLater = () => {
    window.gtag?.("event", "referral_popup_maybe_later");
    const snoozeUntil = Date.now() + snoozeDays * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(STORAGE_KEYS.snoozeUntil, String(snoozeUntil));
    setIsOpen(false);
  };

  const handleReferNow = () => {
    const snoozeUntil = Date.now() + 10 * 24 * 60 * 60 * 1000;

    window.localStorage.setItem(STORAGE_KEYS.snoozeUntil, String(snoozeUntil));

    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    window.gtag?.("event", "referral_popup_never_show");
    window.localStorage.setItem(STORAGE_KEYS.neverShow, "true");
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-3 pb-3 sm:items-center sm:px-4 sm:pb-0">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
        <div className="relative px-5 pt-5 pb-4 sm:px-6 ">
          <button
            type="button"
            onClick={closePopup}
            aria-label="Close referral popup"
            className="absolute right-3 top-3 rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Referral program
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Earn rewards by referring friends
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Share PG Near with your friends. When they book through us, you can
            earn a referral reward.
          </p>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">How it works</p>
            <div className="mt-3 space-y-2 text-sm text-zinc-700">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                <span>Tell your friend about PG Near</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                <span>They book a PG through PG Near</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                <span>You get rewarded after a successful booking</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <a
              href={rewardLink}
              onClick={handleReferNow}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99]">
              Refer Now
            </a>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleMaybeLater}
                className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 active:scale-[0.99]">
                Maybe Later
              </button>
              <button
                type="button"
                onClick={handleDontShowAgain}
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.99]">
                Don't show again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
