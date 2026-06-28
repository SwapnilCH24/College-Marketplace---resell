'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-white">
          ICFAI Marketplace
        </Link>

        <div className="flex items-center gap-6 text-white">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/sell">Sell</Link>

          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <span className="text-sm text-white/60">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}