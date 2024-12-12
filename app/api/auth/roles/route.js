import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET() {
  try {
    const result = await prisma.role.findMany();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
