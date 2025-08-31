// ✅ Validates a 10-digit phone number (numbers only)
export const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

// ✅ Validates basic email format (e.g., abc@xyz.com)
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ Validates a single OTP digit (0–9 or empty string)
export const validateOtpInput = (value) => {
  return /^\d?$/.test(value);
};

// ✅ Validates that OTP string is exactly 6 digits
export const isOtpComplete = (otpString) => {
  return /^\d{6}$/.test(otpString);
};
