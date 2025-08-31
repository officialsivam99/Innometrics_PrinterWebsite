import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background_otp.png";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace this with real backend auth/session check
    // Example:
    // fetch("/api/check-session")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.loggedIn) navigate("/dashboard");
    //     else navigate("/register");
    //   })
    //   .catch(() => navigate("/register"));

    // Temporary splash delay
    const timer = setTimeout(() => {
      navigate("/register");
    }, 30000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center overflow-hidden px-4 font-figtree"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="text-center text-black max-w-[90%]">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide leading-tight">
          IMMERSIVE SOUQ
        </h1>
        <p className="mt-3 text-base md:text-xl font-normal tracking-wide">
          The Next is Neo-Shop
        </p>
      </div>
    </div>
  );
}
