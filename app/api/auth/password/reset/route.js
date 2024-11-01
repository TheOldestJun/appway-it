import prisma from '@/prisma'
import {NextResponse} from 'next/server'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    const { token, password } = await request.json();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: {
                id: decoded.userId
            },
            data: {
                password: hashedPassword
            }
        });
        return NextResponse.json({ message: "Пароль успішно змінено" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}