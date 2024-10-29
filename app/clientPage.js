"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";  
import {login} from "@/store/reducers/authSlice";

export default function ClientPage() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await axios.post('/api/auth/login', {
                email: email,
                password: password
            })
            console.log(result.data);
            localStorage.setItem('token', result.data.token);
            dispatch(login({user: result.data.user, token: result.data.token}));
        } catch (error) {

        }
    }
    return (
        <div className='flex justify-center align-middle py-12 sm:px-6 lg:px-8'>
            <div className="w-full max-w-lg px-4 border border-gray-400 bg-white rounded-sm">
                <div className="text-2xl text-center font-bold mt-2">Введіть дані для входу</div>
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

                <Button type="submit" className="w-full my-8" onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}