import Navbar from '@/components/shared/Navbar';
import './globals.css'; // This line is the only thing that matters for your CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}