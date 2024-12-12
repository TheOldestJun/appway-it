import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const body = await request.json();
  const { id, title, unitId } = body;
  try {
    const result = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
