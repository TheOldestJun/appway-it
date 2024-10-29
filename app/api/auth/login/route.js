import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                role: true
            }
        })
        if (!user) {
            return NextResponse.json(
                {error: "User not found"}, 
                {status: 404}
            )
        }
        if (!await bcrypt.compare(password, user.password)) {
            return NextResponse.json(
                {error: "Invalid password"}, 
                {status: 400}
            )
        }
        return NextResponse.json(
            {
                token: jwt.sign(
                    {
                        id: user.id,
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        role: user.role
                    }, 
                    process.env.JWT_SECRET, 
                    {expiresIn: "30d"}
                )
            }, 
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: error}, 
            {status: 500}
        )
    }
}