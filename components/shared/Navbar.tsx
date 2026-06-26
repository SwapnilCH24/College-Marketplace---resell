import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="flex items-center justify-between p-6 border-b border-white/10">
      <Link href="/" className="text-xl font-bold tracking-tighter">
        ICFAI Marketplace
      </Link>
      
      <div className="flex gap-6 items-center">
        <Link href="/marketplace" className="hover:text-blue-400 transition-colors">Explore</Link>
        <Link href="/sell" className="hover:text-blue-400 transition-colors">Sell</Link>
        <Link href="/team" className="hover:text-blue-400 transition-colors">Team</Link>
        
        {/* User Account / Profile Logic */}
        {session ? (
          <Link href="/dashboard" className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all">
            Dashboard
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="bg-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-500 transition-all">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}