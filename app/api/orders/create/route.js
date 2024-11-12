import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";


export async function POST(request) {
    //const {data, creatorId} = await request.json();
    const body = await request.json();
    const {data, creatorId} = body
    console.log(body)
    const orderList = data.map((order) => ({...order, creatorId, status: OrderStatus.CREATED}))
    try {
        const order = await prisma.order.createMany({
            data: orderList
        })
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}