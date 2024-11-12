import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const orders = await prisma.order.findMany();
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}