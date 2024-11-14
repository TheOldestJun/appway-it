import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    try {
        const result = await prisma.order.update({
            where: {
                id: id
            },
            data: {
                deleted: true
            }
        })
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}