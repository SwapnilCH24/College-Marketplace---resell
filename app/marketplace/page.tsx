import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function MarketplacePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">Marketplace</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-4">
              <div className="aspect-video w-full bg-black/20 rounded-lg overflow-hidden">
                <img 
                  src={product.images && product.images.length > 0 ? product.images : "/placeholder.jpg"} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-grow gap-2">
                <h3 className="text-xl font-bold text-white">{product.title}</h3>
                <p className="text-indigo-400 font-bold text-lg">₹{product.price}</p>
                <p className="text-white/60 text-sm line-clamp-2">{product.description}</p>
              </div>

              {/* CRITICAL: Must be /products/ */}
              <Link 
                href={`/products/${product.id}`} 
                className="w-full text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}