import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";


export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            where: {
                OR: [{ status: OrderStatus.APPROVED }, { status: OrderStatus.ORDER_PENDING } ],
            },
            orderBy: {
                createdDate: "asc"
            },
            select: {
                id: true,
                product: {
                    select: {
                        title: true
                    }
                },
                description: true,
                unit: {
                    select: {
                        title: true
                    }
                },
                quantityCreated: true,
                createdBy: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                createdDate: true,
                status: true
            }
        });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}