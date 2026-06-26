import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// 1. GET: Fetches all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }, // Shows newest items first
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// 2. POST: Creates a new product
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, price, description, category, condition } = body;

    if (!title || !price || !description || !category || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        title,
        price: parseFloat(price),
        description,
        category,
        condition,
        seller: { connect: { email: session.user.email } },
        images: [],
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}