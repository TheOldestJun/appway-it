import prisma from "@/prisma";
import { NextResponse } from "next/server";


export async function POST(request) {

    const {title} = await request.json();
    try {
        const result = await prisma.product.create({
            data: {
                title
            }
        })
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}