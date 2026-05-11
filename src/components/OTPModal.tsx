"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  onSubmitOTP: (otp: string) => Promise<void>;
  onChangeNumber: () => void;
  loading?: boolean;
  error?: string;
  resendTimer?: number;
}

export default function OTPModal({
  isOpen,
  onClose,
  phoneNumber,
  onSubmitOTP,
  onChangeNumber,
  loading = false,
  error = "",
  resendTimer = 0,
}: OTPModalProps) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOtp("");
      setOtpError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }
    try {
      await onSubmitOTP(otp);
    } catch (err: any) {
      setOtpError(err.message || "Invalid OTP");
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow digits
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
    if (otpError) setOtpError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Phone Number Display */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">We've sent a 6-digit OTP to</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">
            +91 {phoneNumber}
          </p>
          <button
            onClick={onChangeNumber}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            disabled={loading}>
            Change Number
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* OTP Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono disabled:bg-gray-100"
              disabled={loading}
              autoFocus
            />
            {otpError && (
              <p className="text-red-600 text-sm mt-2">{otpError}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Resend Timer */}
          {resendTimer > 0 && (
            <p className="text-center text-gray-600 text-sm mb-4">
              Resend OTP in {resendTimer}s
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
            {loading && <Loader2 size={20} className="animate-spin" />}
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
}
