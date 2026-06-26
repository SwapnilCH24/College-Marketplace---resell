import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, addDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const body = await request.json();
  const productId = body.productId;

  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);
  
  if (!productSnap.exists() || productSnap.data().status !== 'AVAILABLE') {
    return NextResponse.json({ error: 'Unavailable' }, { status: 400 });
  }

  const productData = productSnap.data();

  // Find User ID in Firebase
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", session.user.email), limit(1));
  const userSnap = await getDocs(q);
  const buyerId = userSnap.empty ? "unknown" : userSnap.docs.id;

  // Add Transaction to Firebase
  await addDoc(collection(db, "transactions"), {
    productId: productId,
    buyerId: buyerId,
    sellerId: productData.sellerId,
    amount: productData.price,
    createdAt: new Date()
  });

  // Update Product status in Firebase
  await updateDoc(productRef, { status: 'PENDING' });

  return NextResponse.json({ url: '/dashboard?success=true' });
}