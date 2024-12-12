import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    const result = await prisma.order.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
