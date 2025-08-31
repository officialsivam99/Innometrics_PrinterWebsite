import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bagImage from "../assets/bag_otp.png";
import backgroundImage from "../assets/background_otp.png";
import { validateOtpInput, isOtpComplete } from "./authUtils";

export default function LoginOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "example@email.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(12);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const inputRefs = useRef([]);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (!validateOtpInput(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    setStatus("idle");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  //Katyayani  line 43 to 84 maine likha hai. 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullOtp = otp.join("");

   if (!isOtpComplete(fullOtp)) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");
    setStatus("idle");

    try {

      const res = await fetch(`${API_BASE_URL}/auth/loginotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,      // LoginPage → navigate ()
          otp: fullOtp,
        }),
      });

      if (!res.ok) {
        const { message = "Invalid or expired OTP." } = await res
          .json()
          .catch(() => ({}));
        throw new Error(message);
      }


      setStatus("success");
      setTimeout(() => navigate("/", { replace: true }), 1000);
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };
  
   const handleResendOtp = async () => {
    if (resendTimer > 0 || resendLoading) return;

    setResendLoading(true);
    setError("");
    setStatus("idle");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/resendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // LoginPage → navigate ()
      });

      if (!res.ok) {
        const { message = "Failed to resend OTP." } = await res.json().catch(() => ({}));
        throw new Error(message);
      }

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setResendTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-figtree overflow-hidden">
      {/* Left Background + Bag Image */}
      <div
        className="relative w-full h-[400px] md:w-1/2 md:h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={bagImage}
          alt="Bag and Shoe"
          className="absolute object-contain z-10"
          style={{
            width: "428px",
            height: "400px",
            margin: "auto",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            position: "absolute",
          }}
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:p-16 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-[352px] space-y-8">

          {/* Headings + Email + Info */}
          <div className="text-center space-y-14">
            {/* Heading: Verify */}
            <h2
              className="font-bold text-black"
              style={{ fontSize: "30px", lineHeight: "28px", letterSpacing: "3%" }}
            >
              Verify
            </h2>

            {/* Subheading, info and email */}
            <div className="space-y-3">
              <h3
                className="font-bold text-black"
                style={{ fontSize: "26.32px", lineHeight: "100%", letterSpacing: "1%" }}
              >
                Enter OTP
              </h3>
              <p
                className="text-gray-500"
                style={{ fontSize: "15.35px", lineHeight: "22px", letterSpacing: "1%" }}
              >
                A 6-digit OTP has been sent to
              </p>
              <p
                className="font-bold text-black"
                style={{ fontSize: "16.43px", lineHeight: "16.43px", letterSpacing: "1%" }}
              >
                {email}
              </p>
            </div>

            {/* OTP Inputs */}
            <div
              className="flex justify-center gap-[12px] space-y-0"
              style={{ width: "346px", height: "47.96px" }}
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData.getData("text").trim();
                if (/^\d{6}$/.test(pasted)) {
                  setOtp(pasted.split(""));
                  inputRefs.current[5]?.focus();
                }
              }}
            >
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  placeholder="0"
                  className={`w-[48px] h-[48px] border text-center rounded-xl text-[16px] text-[#1A1A1A] placeholder-[#6B7280] bg-transparent focus:ring-2 focus:outline-none transition-all
                    ${status === "success" ? "border-green-500 ring-green-300" : ""}
                    ${status === "error" ? "border-red-500 ring-red-300" : ""}
                    ${status === "idle" ? "border-[#D1D1D1] focus:ring-[#515DEF]" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-[#DC2626] text-[14px] text-center -mt-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[56px] bg-sky-500 text-white text-lg font-bold rounded-xl flex items-center justify-center hover:bg-sky-600 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {/* Resend OTP */}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading || resendTimer > 0}
            className="mx-auto block text-sky-600 font-bold disabled:text-gray-400"
            style={{ fontSize: "16.43px", letterSpacing: "2%" }}
          >
            Resend OTP{" "}
            {resendTimer > 0 && (
              <span className="text-gray-400">
                (00:{resendTimer.toString().padStart(2, "0")})
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
