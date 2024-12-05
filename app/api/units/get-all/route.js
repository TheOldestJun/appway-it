import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const units = await prisma.unit.findMany();
        return NextResponse.json(units, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}