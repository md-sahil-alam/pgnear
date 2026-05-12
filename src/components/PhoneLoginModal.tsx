"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import OTPModal from "./OTPModal";
import { Button } from "./ui/Button";

interface PhoneLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { uid: string; phoneNumber: string; name: string }) => void;
}

export default function PhoneLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: PhoneLoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          },
        );

        recaptchaVerifierRef.current.render();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // const setupRecaptcha = () => {
  //   if (typeof window === "undefined") return;

  //   if (recaptchaVerifierRef.current) {
  //     recaptchaVerifierRef.current.clear();
  //   }

  //   recaptchaVerifierRef.current = new RecaptchaVerifier(
  //     auth,
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     },
  //   );
  // };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim() || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (!userName.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);

    try {
      // setupRecaptcha();

      // await recaptchaVerifierRef.current!.render();

      const formattedPhone = `+91${phoneNumber}`;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current!,
      );
      setConfirmationResult(result);
      setShowOTP(true);
      setResendTimer(60);

      // Start timer
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      console.log("Error sending OTP:", err);
      recaptchaVerifierRef.current?.clear();
      recaptchaVerifierRef.current = null;
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!confirmationResult) return;

    setLoading(true);
    setOtpError("");

    try {
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;

      // Save user to MongoDB
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: firebaseUser.uid,
          phoneNumber: phoneNumber,
          name: userName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      const userData = await response.json();

      onSuccess({
        uid: firebaseUser.uid,
        phoneNumber: phoneNumber,
        name: userName,
      });

      resetForm();
      onClose();
    } catch (err: any) {
      setOtpError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPhoneNumber("");
    setUserName("");
    setError("");
    setShowOTP(false);
    setConfirmationResult(null);
    setOtpError("");
    setResendTimer(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {showOTP ? "Verify Phone" : "Sign In"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close">
              <X size={24} />
            </button>
          </div>

          {!showOTP ? (
            // Phone Login Form
            <form onSubmit={handleSendOTP}>
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                  disabled={loading}
                  autoFocus
                />
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phoneNumber}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setPhoneNumber(digits);
                      if (error) setError("");
                    }}
                    placeholder="10-digit number"
                    maxLength={10}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {/* reCAPTCHA Container */}
              <div id="recaptcha-container" className="mb-4"></div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !phoneNumber || !userName}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? "Sending..." : "Send OTP"}
              </Button>

              <p className="text-center text-gray-500 text-xs mt-4">
                We'll send you a one-time password
              </p>
            </form>
          ) : // OTP Verification is handled by OTPModal
          null}
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTP}
        onClose={() => {
          setShowOTP(false);
          setOtpError("");
        }}
        phoneNumber={phoneNumber}
        onSubmitOTP={handleVerifyOTP}
        onChangeNumber={() => {
          setShowOTP(false);
          setOtpError("");
          setConfirmationResult(null);
        }}
        loading={loading}
        error={otpError}
        resendTimer={resendTimer}
      />
    </>
  );
}
