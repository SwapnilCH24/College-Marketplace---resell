import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const chatWith = searchParams.get('chatWith');
  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!chatWith) return NextResponse.json([]);

  const messages = await prisma.message.findMany({
    where: { OR: [ { senderId: currentUser!.id, receiverId: chatWith }, { senderId: chatWith, receiverId: currentUser!.id } ] },
    orderBy: { createdAt: 'asc' }
  });
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const { receiverId, content } = await request.json();
  const msg = await prisma.message.create({ data: { content, senderId: currentUser!.id, receiverId } });
  return NextResponse.json(msg);
}