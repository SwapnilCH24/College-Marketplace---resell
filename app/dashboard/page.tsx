'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function DashboardPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(
        collection(db, 'products')
      );

      const mine = snap.docs.filter(
        d =>
          d.data().sellerEmail ===
          auth.currentUser?.email
      );

      setCount(mine.length);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen pt-28 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg mb-2">
              Your Listings
            </h2>
            <p className="text-4xl font-bold">
              {count}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}