"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import toast from 'react-hot-toast';

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";  
import {login} from "@/store/reducers/authSlice";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function ClientPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await axios.post('/api/auth/login', {
                email: email,
                password: password
            })
            localStorage.setItem('token', result.data.token);
            dispatch(login({token: result.data.token}));
            toast.success("Ласкаво просимо!");
            const user = jwt.decode(result.data.token);
            router.push(`/${user.role.code}`);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    return (
        <div className='flex justify-center align-middle py-40 sm:px-6 lg:px-8'>
            <div className="w-full max-w-lg px-4 border border-gray-400 bg-white rounded-lg">
                <div className="text-2xl text-center font-bold my-2">Введіть дані для входу</div>
                <Separator className="my-2"/>   
                <Label htmlFor="email">Електронна пошта</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Label htmlFor="password">Пароль</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Separator className="my-4"/>   
                <Button type="submit" className="w-full mb-4" onClick={handleLogin}>Вхід</Button>
                <div className="text-right mb-4">
                    <a href="/request-reset" className="text-sky-600">Скинути пароль</a>
                </div>
            </div>
        </div>
    );
}