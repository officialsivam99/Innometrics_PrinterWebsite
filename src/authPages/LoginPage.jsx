import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shoeImage from "../assets/login_shoe.png";
import { validateEmail } from "./authUtils";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (validateEmail(email)) {
      setEmailValid(true);
      setError("");
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setError("Enter a valid email address");
    return;
  }

  setLoading(true);
  setError("");

  try {
    /* 🔗  POST /auth/login  – OTP भेजो  */
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      // backend { message } भेजता है (404 = not-registered, वगैरह)
      const { message = "Login failed, try again." } = await res
        .json()
        .catch(() => ({}));
      throw new Error(message);
    }

    /* ✅  OTP sent successfully → verify पेज पर जाओ */
    navigate("/login-otp", { state: { email, next: "/dashboard" } });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-figtree bg-white overflow-hidden">
      {/* Left Image Section */}
      <div className="w-full h-[300px] md:w-1/2 md:h-screen">
        <img
          src={shoeImage}
          alt="Nike Shoe"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full"
          style={{ maxWidth: "352px" }}
        >
          {/* Heading */}
          <h2
            className="text-center text-black font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "28px",
              letterSpacing: "0.03em",
              fontFamily: "Figtree",
            }}
          >
            Login
          </h2>

          {/* Email Field */}
          <div className="mt-8 space-y-2">
            <label
              htmlFor="email"
              className="text-gray-700 block"
              style={{
                fontFamily: "Figtree",
                fontWeight: 400,
                fontSize: "16.43px",
                lineHeight: "25.81px",
                letterSpacing: "0.05em",
              }}
            >
              Enter your email
            </label>
            <div
              className={`relative flex items-center rounded-[17.6px] border h-[56px] px-4 transition ${
                error
                  ? "border-red-500 shadow-[0_0_0_2px_rgba(220,38,38,0.2)]"
                  : "border-[#D1D1D1]"
              }`}
            >
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[16px] bg-transparent outline-none placeholder-gray-400"
              />
              {emailValid && !error && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </span>
              )}
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !emailValid}
            className="w-full h-[56px] mt-8 bg-sky-500 text-white font-semibold text-lg rounded-[17.6px] hover:bg-sky-600 transition disabled:opacity-50"
          >
            {loading ? "Sending OTP…" : "Login"}
          </button>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          {/* Divider */}
          <div className="flex justify-center mt-6 mb-2">
            <span
              className="text-gray-600 text-center"
              style={{
                fontFamily: "Figtree",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
              }}
            >
              or
            </span>
          </div>

          {/* Guest Login */}
          <div className="text-center">
            <a
              href="#"
              className="text-[#696969] underline hover:text-[#515DEF]"
              style={{
                fontFamily: "Figtree",
                fontWeight: 700,
                fontSize: "16.43px",
                lineHeight: "25.81px",
                letterSpacing: "0.01em",
              }}
            >
              Continue as Guest
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
