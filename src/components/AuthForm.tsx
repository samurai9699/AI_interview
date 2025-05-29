import React, { useState } from 'react';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup, resetPassword } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = isLogin ? await login(email, password) : await signup(email, password);

    if (result.error) {
      if (result.error.includes('already exists')) {
        setError('User already exists! Please log in.');
      } else {
        setError(result.error);
      }
    } else {
      setSuccess(isLogin ? 'Login successful!' : 'Signup successful! Check your email to verify your account.');
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }

    const result = await resetPassword(email);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(result.data);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-center mb-8">
        <User className="h-12 w-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 rounded-md text-green-700 text-sm">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={handleResetPassword} className="text-gray-600 hover:text-gray-800 text-sm">
          Forgot Password?
        </button>
      </div>
      <div className="mt-6 text-center">
        <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} className="text-indigo-600 hover:text-indigo-800">
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
};
