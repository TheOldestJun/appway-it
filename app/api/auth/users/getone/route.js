import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
