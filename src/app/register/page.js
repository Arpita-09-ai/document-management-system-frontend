'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
export default function RegisterPage() {
  const [otp, setOtp] = useState('');
const [otpSent, setOtpSent] =
  useState(false);
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState('');
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [region, setRegion] = useState('');
const [location, setLocation] = useState('');
const [department, setDepartment] = useState('');
  const [showPassword, setShowPassword] =
    useState(false);
    const handleSendOtp = async () => {
  try {
    const response = await api.post(
      '/register/send-otp',
      {
        employeeId,
        name,
        email,
        password,
        region,
        location,
        department,
      }
    );

    alert(response.data.message);
    setOtpSent(true);
  } catch (error) {
  const message =
    error.response?.data?.message;

  if (
    message === 'Email already exists' ||
    message === 'Employee ID already exists'
  ) {
    alert(
      'Account already exists. Redirecting to login.'
    );

    router.push('/');

    return;
  }

  alert(
    message || 'Failed to send OTP'
  );
}
};
const handleVerifyOtp = async () => {
  try {
    await api.post(
      '/register/verify-otp',
      {
        email,
        otp,
      }
    );

    alert(
      'Registration successful. Please login.'
    );

    router.push('/');
  } catch (error) {
    alert(
      error.response?.data?.message ||
      'OTP verification failed'
    );
  }
};
    
  return (
    <div className="min-h-screen bg-gray-100">
  <div className="bg-blue-900 text-white p-4 shadow-lg">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">
        IndianOil Document Management System
      </h1>
    </div>
  </div>

  <div className="flex items-center justify-center min-h-[85vh]">
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">

      <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
        Employee Registration
      </h2>

      <p className="text-center text-gray-700 mb-6">
        Create your account
      </p>

      <input
  disabled={otpSent}
  value={employeeId}
  onChange={(e) =>
    setEmployeeId(e.target.value)
  }
  placeholder="Employee ID"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>

      <input
  disabled={otpSent}
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  placeholder="Employee Name"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>

      <input
  disabled={otpSent}
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  placeholder="Employee Email"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>

      <div className="relative mb-4">
<input
  disabled={otpSent}
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  type={
    showPassword
      ? 'text'
      : 'password'
  }
  placeholder="Password"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>
        <button
  disabled={otpSent}
  type="button"
  className="absolute right-3 top-3 text-gray-600"
  onClick={() =>
    setShowPassword(!showPassword)
  }
>
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      <input
  disabled={otpSent}
  value={region}
  onChange={(e) =>
    setRegion(e.target.value)
  }
  placeholder="Region (e.g. Eastern)"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>

      <input
  disabled={otpSent}
  value={location}
  onChange={(e) =>
    setLocation(e.target.value)
  }
  placeholder="Location (e.g. Kolkata)"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>

      <input
  disabled={otpSent}
  value={department}
  onChange={(e) =>
    setDepartment(e.target.value)
  }
  placeholder="Department (e.g. IT)"
  className={`w-full border-2 border-gray-400 rounded-lg p-3 mb-6 text-black ${
    otpSent
      ? 'bg-gray-100 cursor-not-allowed'
      : ''
  }`}
/>

      <div className="mt-2">
  {!otpSent ? (
    <button
  disabled={
    !employeeId ||
    !name ||
    !email ||
    !password ||
    !region ||
    !location ||
    !department
  }
  onClick={handleSendOtp}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold disabled:bg-gray-400"
>
  Send OTP
</button>
  ) : (
    <>
    <p className="text-sm text-green-700 mb-4">
  OTP sent to {email}
</p>
      <input
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
        placeholder="Enter OTP"
        className="w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black"
      />

      <button
        onClick={handleVerifyOtp}
        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold"
      >
        Verify OTP
      </button>
    </>
  )}
</div>
      <p className="text-center mt-4 text-sm text-gray-800">
  Already have an account?{' '}
  <a
    href="/"
    className="text-blue-700 font-semibold"
  >
    Login
  </a>
</p>
    </div>
  </div>
</div>
  );
}
