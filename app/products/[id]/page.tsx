import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

// This must be a default export function that returns JSX
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Fetch the product from the database
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: { seller: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 px-6 text-white">
      <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
        <p className="text-2xl text-indigo-400 mb-6">₹{product.price}</p>
        <p className="text-gray-300">{product.description}</p>
        <p className="mt-4 text-gray-500">Category: {product.category}</p>
        <p className="text-gray-500">Condition: {product.condition}</p>
      </div>
    </main>
  );
}