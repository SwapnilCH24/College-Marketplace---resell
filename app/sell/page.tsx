'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      price: formData.get('price'),
      description: formData.get('description'),
      category: formData.get('category'),
      condition: formData.get('condition'),
    };

    console.log("Submitting data:", data); // Check your F12 console if this fails

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Item listed successfully!");
        router.push('/marketplace');
      } else {
        alert("API Error: " + (result.error || "Failed to save"));
      }
    } catch (err) {
      alert("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="glass-card">
          <h1 className="text-3xl font-bold mb-2 text-white">List an Item</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Item Name</label>
              <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500" placeholder="e.g. MacBook Pro" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Price (₹)</label>
              <input name="price" type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500" placeholder="0" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Category</label>
              <input name="category" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500" placeholder="e.g. Electronics" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Condition</label>
              <select name="condition" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500">
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Description</label>
              <textarea name="description" required className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500" placeholder="Describe the condition..." />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50">
              {loading ? "Posting..." : "Post Listing"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}