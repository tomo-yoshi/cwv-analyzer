'use client';
import { useFormState } from 'react-dom';
import { login } from '../actions';
import Link from 'next/link';

export default function SignInForm() {
  const [state, formAction] = useFormState(login, { message: [] });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome to CWV Analyzer
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              formAction={formAction}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-colors"
            >
              Sign in
            </button>
          </div>

          {state.message.map((msg) => (
            <p key={msg} className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md">
              {msg}
            </p>
          ))}
        </form>

        <div className="text-center">
          <Link
            href="/auth/signup"
            className="text-primary-600 hover:text-primary-500 text-sm font-medium"
          >
            Need an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}