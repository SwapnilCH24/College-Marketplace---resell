import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-10">Please login to view dashboard.</div>;
  }

  // Fetch the user's products
  const products = await prisma.product.findMany({
    where: { seller: { email: session.user?.email || "" } }
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p className="mb-8">Welcome back, {session.user?.name}</p>
      
      <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 && <p>You haven't listed any items yet.</p>}
        {products.map((p) => (
          <div key={p.id} className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold">{p.title}</h3>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}