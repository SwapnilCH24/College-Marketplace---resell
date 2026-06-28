'use client';
import { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      const docRef = doc(db, "products", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <main className="pt-24 px-6 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* DEBUGGING SECTION: This will show you exactly what fields exist */}
        <div className="bg-yellow-900/20 p-4 mb-6 border border-yellow-700 rounded-lg">
          <h2 className="text-yellow-500 font-bold">Debug Info (Delete this later):</h2>
          <pre className="text-xs">{JSON.stringify(product, null, 2)}</pre>
        </div>

        {/* Real Content */}
        <h1 className="text-4xl font-bold">{product.title || product.name || "No Title Found"}</h1>
        <img 
            src={product.imageUrl || product.image || "/placeholder.png"} 
            className="w-full h-80 object-cover mt-4 rounded-xl"
        />
        <p className="mt-4 text-xl">₹{product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </main>
  );
}