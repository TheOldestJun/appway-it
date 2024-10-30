import { useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import UserSkeleton from "./userSkeleton";


export default function EditTab() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [roleId, setRoleId] = useState('')

    const handleSubmit = async () => {

    }
    return (
        <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-12 gap-5">
                <Input
                    id="email"
                    type="email"
                    placeholder="Пошта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    id="firstName"
                    type="text"
                    placeholder="Ім'я"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    id="lastName"
                    type="text"
                    placeholder="Прізвище"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="col-span-6"
                />
                <Select onValueChange={setRoleId}>
                    <SelectTrigger className="col-span-6">
                        <SelectValue placeholder="Обрати email..." />
                    </SelectTrigger>
                    <SelectContent>

                    </SelectContent>
                </Select>
                <Button className="col-span-12" onClick={handleSubmit}>Створити</Button>
            </div>
        </div>
    )
}