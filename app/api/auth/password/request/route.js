import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function POST(request) {
    const { email } = await request.json();

    // Проверка существования пользователя (эмуляция)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: 'Користувача не знайдено' }, { status: 404 });
    }

    // Создайте JWT токен для ссылки на сброс пароля
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `https://${process.env.VERCEL_URL}/reset-password?token=${token}`;
    console.log(resetLink);
    // Настройка Nodemailer с Mailjet
    const transporter = nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        auth: {
            user: process.env.MAILJET_API_KEY,
            pass: process.env.MAILJET_SECRET_KEY,
        },
    });

    const mailOptions = {
        from: 'admin@appway.pp.ua', // Укажите свой email
        to: email,
        subject: 'Запит на скидання паролю',
        text: `Вітаємо, ${user.firstName}!\nДля скидання паролю, будь ласка, перейдіть за посиланням: ${resetLink}`,
    };
    console.log(mailOptions);
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        return NextResponse.json({ message: 'Лист надіслано' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
