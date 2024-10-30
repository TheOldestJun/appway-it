import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(request) {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
