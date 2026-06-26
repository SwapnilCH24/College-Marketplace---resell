'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        router.push('/marketplace');
        router.refresh(); // Forces a refresh of the page list
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 rounded-full font-semibold transition-all"
    >
      Delete Listing
    </button>
  );
}