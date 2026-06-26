import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const product = await prisma.product.findUnique({ where: { id: body.productId } });
  if (!product || product.status !== 'AVAILABLE') return NextResponse.json({ error: 'Unavailable' }, { status: 400 });

  const buyer = await prisma.user.findUnique({ where: { email: session.user.email } });
  await prisma.transaction.create({ data: { productId: product.id, buyerId: buyer!.id, sellerId: product.sellerId, amount: product.price } });
  await prisma.product.update({ where: { id: product.id }, data: { status: 'PENDING' } });
  return NextResponse.json({ url: '/dashboard?success=true' });
}