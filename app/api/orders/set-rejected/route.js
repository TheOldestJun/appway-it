import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PUT(request) {
    const body = await request.json();
    const { id, rejectedById, rejectedReason } = body;
    console.log(body);
    try {
        const result = await prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: OrderStatus.REJECTED,
                rejectedReason,
                rejectedById,
                rejectedDate: new Date()
            }
        })
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500})
    }
}