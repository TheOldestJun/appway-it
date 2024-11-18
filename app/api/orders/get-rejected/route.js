import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function GET(request) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: OrderStatus.REJECTED,
            },
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}