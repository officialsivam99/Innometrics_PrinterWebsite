import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePhone } from "./authUtils";
import vrImage from "../assets/register_image.png";

const countryCodes = ["+91", "+971", "+1", "+44", "+61"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [errors, setErrors] = useState({ phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPhoneValid(validatePhone(phone));
    if (validatePhone(phone)) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  }, [phone]);

  useEffect(() => {
    setEmailValid(validateEmail(email));
    if (validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  }, [email]);

  const validateForm = () => {
    const newErrors = { phone: "", email: "" };
    let valid = true;

    if (!validatePhone(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const getFullPhone = () => `${countryCode}${phone}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (!validateForm()) return;

    setLoading(true);
    setErrors({ phone: "", email: "", server: "" });   // clear previous errors

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          mobileNumber: getFullPhone(),      // send with country code
        }),
      });

      if (!res.ok) {
        // backend might send JSON with { message }
        const { message = "Signup failed, try again" } = await res
          .json()
          .catch(() => ({}));
        throw new Error(message);
      }

      // ✅ backend ne OTP bhej diya:
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: err.message }));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-figtree bg-white overflow-hidden">
      {/* Left Image Section */}
      <div className="w-full h-[395px] md:h-screen md:w-1/2">
        <img
          src={vrImage}
          alt="Register Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-[352px] space-y-6">
          <h2 className="text-center text-black font-bold text-[30px] leading-[28px] tracking-[0.03em]">
            Register
          </h2>

          {/* Phone Field */}
          <div className="relative">
            <label className="block mb-2 text-[#1A1A1A] font-medium text-[16.43px]">
              Enter your mobile number
            </label>
            <div className={`relative flex items-center rounded-[17.6px] border h-[56px] px-4 gap-2 transition-all duration-300 ${errors.phone
                ? "border-red-500 shadow-[0_0_0_2px_rgba(220,38,38,0.2)]"
                : "border-[#D1D1D1]"
              }`}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent outline-none text-gray-700 pr-2 text-sm"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 text-[16px] bg-transparent outline-none"
              />
              {phoneValid && (
                <div className="absolute right-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="block mb-2 text-[#1A1A1A] font-medium text-[16.43px]">
              Enter your email
            </label>
            <div className={`relative flex items-center rounded-[17.6px] border h-[56px] px-4 transition-all duration-300 ${errors.email
                ? "border-red-500 shadow-[0_0_0_2px_rgba(220,38,38,0.2)]"
                : "border-[#D1D1D1]"
              }`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-[16px] bg-transparent outline-none"
              />
              {emailValid && (
                <div className="absolute right-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !phoneValid || !emailValid}
            className="w-full h-[56px] rounded-[17.6px] bg-sky-500 text-white font-semibold text-lg hover:bg-sky-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {errors.server && (
            <p className="text-red-600 text-center text-sm">{errors.server}</p>
          )}

          {/* Sign In & Guest Links */}
          <p className="text-center text-gray-500 text-[16.43px] leading-[25.81px]">
            Already have an account? <Link to="/login" className="text-black font-bold hover:text-indigo-500">Sign In</Link>
          </p>

          <div className="text-sm text-center text-gray-500 mt-6 mb-2">
            <div className="mb-1 font-bold text-[16.43px] leading-[25.81px] w-4 h-5 mx-auto">or</div>
            <Link to="/guest" className="underline font-bold text-[16.43px]">Continue as Guest</Link>
          </div>
        </form>
      </div>
    </div>
  );
}