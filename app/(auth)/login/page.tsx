'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl text-center">
        <h2 className="text-2xl font-bold mb-6">Campus Login</h2>
        <p className="text-white/50 mb-8">Please use your official university email to log in.</p>
        
        <button 
          onClick={() => signIn('google', { callbackUrl: '/marketplace' })}
          className="w-full bg-white text-black font-semibold rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-gray-200 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}