import Navbar from "@/components/shared/Navbar";
import "./globals.css";
export const metadata = { title: "Campus Premium Marketplace", description: "Trusted Escrow Ecosystem." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-black text-white antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
