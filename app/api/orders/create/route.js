import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";


export async function POST(request) {
    const {productId, description=null, unitId, quantity, creatorId} = await request.json();
    try {
        const order = await prisma.order.create({
            data: {
                product: {
                    connect: {
                        id: productId
                    }
                },
                description: description,
                unit: {
                    connect: {
                        id: unitId
                    }
                },
                quantityCreated: quantity,
                createdBy: {
                    connect: {
                        id: creatorId
                    }
                },
                status: OrderStatus.CREATED
            }
        });
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}