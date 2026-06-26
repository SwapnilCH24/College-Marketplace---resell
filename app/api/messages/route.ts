import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, orderBy, or, and, serverTimestamp, limit } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function getUserId(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : snap.docs.id;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { searchParams } = new URL(request.url);
  const chatWith = searchParams.get('chatWith');
  if (!chatWith) return NextResponse.json([]);

  const currentUserId = await getUserId(session.user.email);
  if (!currentUserId) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const q = query(
    collection(db, "messages"),
    or(
      and(where("senderId", "==", currentUserId), where("receiverId", "==", chatWith)),
      and(where("senderId", "==", chatWith), where("receiverId", "==", currentUserId))
    ),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);
  const messages = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const currentUserId = await getUserId(session.user.email);
  const { receiverId, content } = await request.json();

  const msgRef = await addDoc(collection(db, "messages"), {
    content,
    senderId: currentUserId,
    receiverId,
    createdAt: serverTimestamp()
  });

  return NextResponse.json({ id: msgRef.id, content });
}