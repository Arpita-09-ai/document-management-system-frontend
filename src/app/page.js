'use client';
import { Eye, EyeOff } from 'lucide-react';
import {
  useState,
  useEffect,
} from 'react';
import api from '../services/api';
export default function Home() {
  const [showPassword, setShowPassword] =
  useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaImage,
  setCaptchaImage] =
  useState('');

const [captchaId,
  setCaptchaId] =
  useState('');

const [captcha,
  setCaptcha] =
  useState('');
  const fetchCaptcha =
  async () => {
    try {
      const response =
        await api.get('/captcha');

      setCaptchaImage(
        response.data.image
      );

      setCaptchaId(
        response.data.captchaId
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  fetchCaptcha();
}, []);
  const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await api.post('/login', {
  email,
  password,
  captcha,
  captchaId,
});

    alert(response.data.message);

    localStorage.setItem(
  'token',
  response.data.token
);
localStorage.setItem(
  'userId',
  response.data.user.id
);

localStorage.setItem(
  'role',
  response.data.user.role
);
window.location.href =
  '/dashboard';
  }  catch (error) {
  fetchCaptcha();
  setCaptcha('');

  alert(
    error.response?.data?.message ||
    'Something went wrong'
  );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            IndianOil Document Management System
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[85vh]">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
            Welcome
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Employee Login
          </p>

          <input
            type="text"
            placeholder="Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black placeholder-gray-600"
          />

          <div className="relative mb-6">
  <input
    type={
      showPassword
        ? 'text'
        : 'password'
    }
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
    className="w-full border-2 border-gray-400 rounded-lg p-3 text-black placeholder-gray-600"
  />

  <button
    type="button"
    className="absolute right-3 top-3 text-gray-600"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
    
  </button>
</div>
<div className="mb-4">
  <div
    className="border rounded-lg p-3 bg-white mb-2 flex justify-center"
    dangerouslySetInnerHTML={{
      __html: captchaImage,
    }}
  />

  <button
    type="button"
    onClick={fetchCaptcha}
    className="text-blue-700 text-sm mb-3"
  >
    Refresh CAPTCHA
  </button>

  <input
    value={captcha}
    onChange={(e) =>
      setCaptcha(e.target.value)
    }
    placeholder="Enter CAPTCHA"
    className="w-full border-2 border-gray-400 rounded-lg p-3 mb-4 text-black"
  />
</div>
          <button
  onClick={handleLogin}
  disabled={
  loading ||
  !email ||
  !password ||
  !captcha
}
  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white p-3 rounded-lg font-semibold"
>
  {loading ? 'Logging in...' : 'Login'}
</button>
<p className="text-center mt-4 text-sm text-gray-800">
  Don't have an account?{' '}
  <a
    href="/register"
    className="text-blue-700 font-semibold"
  >
    Register
  </a>
</p>
        </div>
      </div>
    </div>
  );
}