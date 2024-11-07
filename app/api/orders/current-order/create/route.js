import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { productId, unitId, description=null, quantity } = await request.json();
    try {
        const order = await prisma.currentOrder.create({
            data: {
                productId,
                unitId,
                description,
                quantity: parseFloat(quantity),
            },
        });
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}