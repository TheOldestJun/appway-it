import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function GET(request) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: {
                    not: OrderStatus.REJECTED
                }
            },
            orderBy: {
                createdDate: "asc"
            },
            select: {
                id: true,
                status: true,
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
            }
        });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}