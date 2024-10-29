import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    try {
        const result = await prisma.user.create({
            data: {
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                firstName: body.firstName,
                lastName: body.lastName,
                roleId: body.roleId
            }
        })
        return NextResponse.json({
            message: "User created",
            result: result
        })
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}