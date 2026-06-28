import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="max-w-4xl text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-6 tracking-wide uppercase">
            Exclusively for ICFAI
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            The Campus Marketplace.
          </h1>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            A secure, verified platform for students to trade books, electronics, and essentials. Built for trust.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/marketplace">
  <div className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition">
    Explore Listings
  </div>
</Link>
            <Link href="/sell" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-all">
              List an Item
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid - The "Bento" Style */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Verified Users" 
            desc="Only students from our university can buy and sell. No external spam."
          />
          <FeatureCard 
            title="Secure Payments" 
            desc="Our system ensures both parties are protected during the transaction."
          />
          <FeatureCard 
            title="Instant Contact" 
            desc="Chat directly with the seller to negotiate the best price."
          />
        </div>
      </section>
    </main>
  );
}

// Reusable component to keep the code clean
function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}