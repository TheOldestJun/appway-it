import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.roleId) {
        return NextResponse.json({
            error: "Всі поля повинні бути заповнені"
        }, {status: 400})
    }
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
            message: "Користувача створено",
            result: result
        },{status: 201})
    
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
}