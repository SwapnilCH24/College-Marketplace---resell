"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";

export default function MarketplacePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen p-10 text-white">
      <h1 className="text-4xl font-bold mb-10">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white/5 border p-4 rounded-xl">
            {p.imageUrl && <img src={p.imageUrl} className="w-full h-40 object-cover rounded mb-4" />}
            <h2 className="text-xl font-bold">{p.tile}</h2>
            <p className="text-indigo-400">₹{p.price}</p>
            <Link href={`/products/${p.id}`} className="block mt-4 bg-white/10 py-2 text-center rounded">View</Link>
          </div>
        ))}
      </div>
    </main>
  );
}