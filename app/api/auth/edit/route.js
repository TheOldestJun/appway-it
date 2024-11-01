import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const body = await request.json();
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.roleId) {
        return NextResponse.json({
            error: "Всі поля повинні бути заповнені",
        }, {
            status: 400
        })
    }
    try {
        //check if password changed
        const user = await prisma.user.findUnique({
            where: {
                id: body.id
            },
            select:{
                password: true
            }
        })
        if(user.password !== body.password){
            body.password = await bcrypt.hash(body.password, 10);
        }
        await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                email: body.email,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
                roleId: body.roleId
            }
        })
        return NextResponse.json({
            message: "Користувача оновлено",
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        })
    }
}