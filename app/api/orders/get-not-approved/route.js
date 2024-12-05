import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { productsApi } from "@/store/services/products";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: OrderStatus.CREATED,
            },
            orderBy: {
                createdDate: "asc"
            },
            select:{
                id: true,
                product:{
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
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}