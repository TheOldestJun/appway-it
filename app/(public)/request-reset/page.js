"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast';

export default function Page() {
    const [email, setEmail] = useState('')
    const handleSubmit = async () => {
        try {
            const result = await axios.post('/api/auth/password/request', {
                email: email
            })
            if(result.status == 200) {
                toast.success("Лист для відновлення паролю надіслано")
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    return (
        <div className='flex justify-center align-middle py-40 sm:px-6 lg:px-8'>
            <div className="w-full max-w-lg px-4 border border-gray-400 bg-white rounded-lg">
                <div className="text-2xl text-center font-bold my-2">Введіть вашу електронну пошту</div>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4"
                />
                <Button type="submit" className="w-full mb-4" onClick={handleSubmit}>Надіслати листа для відновлення паролю</Button>
            </div>
        </div>
    )
}