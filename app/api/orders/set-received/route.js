import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PUT(request) {
        const { orderId, quantity, receiverId } = await request.json();
    try {
        let result = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            select: {
                quantityOrdered: true,
                quantityReceived: true,
            },
        })
        const isEnough = result.quantityOrdered <= result.quantityReceived + parseFloat(quantity)
        } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}