'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  console.log("SESSION:", session);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-white">
          ICFAI Marketplace
        </Link>

        <div className="flex items-center gap-6 text-white">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/sell">Sell</Link>

          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <span className="text-sm text-white/60">
                {session.user?.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
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