import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PUT(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    try {
        const result = await prisma.order.update({
            where: {
                id: id,
            },
            data: {
                closedDate: new Date(),
                status: OrderStatus.CLOSED
            },
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}